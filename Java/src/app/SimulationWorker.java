package app;

import javax.swing.*;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import com.google.protobuf.InvalidProtocolBufferException;
import com.kitware.pulse.cdm.actions.SEAction;
import com.kitware.pulse.cdm.actions.SEAdvanceTime;
import com.kitware.pulse.cdm.bind.Enums.eSwitch;
import com.kitware.pulse.cdm.bind.MechanicalVentilatorActions.MechanicalVentilatorPressureControlData;
import com.kitware.pulse.cdm.bind.MechanicalVentilatorActions.MechanicalVentilatorVolumeControlData;
import com.kitware.pulse.cdm.bind.Patient.PatientData.eSex;
import com.kitware.pulse.cdm.conditions.SECondition;
import com.kitware.pulse.cdm.engine.SEDataRequestManager;
import com.kitware.pulse.cdm.patient.SEPatient;
import com.kitware.pulse.cdm.patient.actions.SEMechanicalVentilation;
import com.kitware.pulse.cdm.engine.SEPatientConfiguration;
import com.kitware.pulse.cdm.properties.CommonUnits.ElectricPotentialUnit;
import com.kitware.pulse.cdm.properties.CommonUnits.FrequencyUnit;
import com.kitware.pulse.cdm.properties.CommonUnits.LengthUnit;
import com.kitware.pulse.cdm.properties.CommonUnits.MassUnit;
import com.kitware.pulse.cdm.properties.CommonUnits.PowerUnit;
import com.kitware.pulse.cdm.properties.CommonUnits.PressureUnit;
import com.kitware.pulse.cdm.properties.CommonUnits.TimeUnit;
import com.kitware.pulse.cdm.properties.CommonUnits.VolumePerTimeUnit;
import com.kitware.pulse.cdm.properties.CommonUnits.VolumeUnit;
import com.kitware.pulse.cdm.scenario.SEScenario;
import com.kitware.pulse.cdm.system.equipment.mechanical_ventilator.actions.SEMechanicalVentilatorContinuousPositiveAirwayPressure;
import com.kitware.pulse.cdm.system.equipment.mechanical_ventilator.actions.SEMechanicalVentilatorPressureControl;
import com.kitware.pulse.cdm.system.equipment.mechanical_ventilator.actions.SEMechanicalVentilatorVolumeControl;
import com.kitware.pulse.cdm.properties.SEScalarTime;
import com.kitware.pulse.engine.PulseEngine;
import com.kitware.pulse.utilities.Log;

import panels.MiniLogPanel;
import utils.MyListener;
import zeroMQ.ZeroServer;


public class SimulationWorker extends SwingWorker<Void, String> {

	/*
	 * Class with the pulseEngine that controls the simulation
	 */
	
    private final App app;
    public static PulseEngine pe;
    private String[] requestList;
    private SEDataRequestManager dataRequests;
    private static volatile boolean stopRequested = false;
    public static volatile boolean ventilationStartRequest = false;
    public static volatile boolean ventilationDisconnectRequest = false;
    public static volatile boolean started = false; 
    public static volatile boolean engineStabilized = false; 
    
    private static ZeroServer zmqServer;  
    private static boolean ext_running = false;
    private boolean firstConnection = true;
    private enum extMode { VOLUME, PRESSURE }
    private extMode currentEXTMode;
    
    SEScalarTime stime;

    SEMechanicalVentilatorPressureControl pc;
    SEMechanicalVentilatorContinuousPositiveAirwayPressure cpap;
    SEMechanicalVentilatorVolumeControl vc;
    SEMechanicalVentilation ext;
    
    public SimulationWorker(App appTest) {
        this.app = appTest;
    }
    
    public static void requestStop() {
        stopRequested = true;
        if(!engineStabilized) {
        	started = false;
        }
        if(ext_running)
			try {
				zmqServer.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
    }

    @Override
    protected Void doInBackground() throws Exception {
    	
        stopRequested = false;
        started = true;
        
        // Initialize JNIBridge and PulseEngine
        pe = new PulseEngine();
        pe.setLogListener(new MyListener());
        stime = new SEScalarTime(0, TimeUnit.s);
        
        // Creation of Data Request
        dataRequests = new SEDataRequestManager();
        setDataRequests(dataRequests);


        //Patient data depending on PatientPanel config
		String patientFilePath = app.patient.getSelectedPatientFilePath();
		String scenarioFilePath = app.patient.getSelectedScenarioFilePath();
		 
		if ((patientFilePath == null || patientFilePath.isEmpty()) && (scenarioFilePath == null || scenarioFilePath.isEmpty())) {
			MiniLogPanel.append("Loading...");
			SEPatientConfiguration patient_configuration = new SEPatientConfiguration();
			SEPatient patient = patient_configuration.getPatient();
			setPatientParameter(patient);

	        for(SECondition any : app.condition.getActiveConditions())
	        {
	          patient_configuration.getConditions().add(any);
	        }
			
			pe.initializeEngine(patient_configuration, dataRequests);
			exportInitialPatient();
		}
		else if ((scenarioFilePath == null || scenarioFilePath.isEmpty())){
			MiniLogPanel.append("Starting from file...");
			if(app.condition.getNumActiveCondition() != 0)
				MiniLogPanel.append("Resetting condition...");
			pe.serializeFromFile(patientFilePath, dataRequests);
			SEPatient initialPatient = new SEPatient();
			pe.getInitialPatient(initialPatient);
			
	        pe.getConditions(app.condition.getActiveConditions());
	        app.condition.setInitialConditionsTo0();
	        for(SECondition any : app.condition.getActiveConditions())
	        {
	        	app.condition.setInitialConditions(any);
	        }
		}
		else if(!(scenarioFilePath == null || scenarioFilePath.isEmpty())){ 
			MiniLogPanel.append("Starting from scenario...");
			if(app.condition.getNumActiveCondition() != 0)
				MiniLogPanel.append("Resetting condition...");
			
			run_scenario(patientFilePath,scenarioFilePath);
			simulation(true);
			return null;
		}
		else {
			MiniLogPanel.append("\n!!!Error!!!");
			return null;
		}
        simulation(false);
        return null;
    }

	private void simulation(boolean scenario) {
    	if(!scenario) {
	    	//Ventilators
	        pc = new SEMechanicalVentilatorPressureControl();
	        cpap = new SEMechanicalVentilatorContinuousPositiveAirwayPressure();
	        vc = new SEMechanicalVentilatorVolumeControl();
	        ext = new SEMechanicalVentilation();
	    	
	        //Start Simulation
	        engineStabilized = true;
	        MiniLogPanel.append("Simulation started");
	        app.patient.enableExportButton();
	        app.patient.enableStopButton();
	        publish("Started\n");
	        stime.setValue(0, TimeUnit.s);
    	}
        while (!stopRequested) {
        	
            if (!pe.advanceTime(stime)) {
                publish("\nSomething bad happened");
                MiniLogPanel.append("\n!!!Error, simulation stopped!!!");
                return;
            }
            
            handilngVentilator(ext,pc,cpap,vc);

            //Log and data printing
            if(ext_running)
            	zmqServer.setSimulationData(dataPrint());
            else
            	dataPrint();

            stime.setValue(0.02, TimeUnit.s);
            Log.info("Advancing "+stime+"...");
        }
        
        // Final Cleaning
	    started = false;
        pe.clear();
        pe.cleanUp();
        publish("Simulation Complete\n");
        MiniLogPanel.append("\nSimulation stopped");
        
        engineStabilized = false;
        return;
    }
    
    
    private void run_scenario(String patientFilePath, String scenarioFilePath) {
    	
    	//Load scenario
    	SEScenario sce = new SEScenario();
		try {
			sce.readFile(scenarioFilePath);
		} catch (InvalidProtocolBufferException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(sce.hasEngineState()) {
			if(!pe.serializeFromFile(patientFilePath, dataRequests));
		} else if(sce.hasPatientConfiguration()) {
			if(!pe.initializeEngine(sce.getPatientConfiguration(), dataRequests));
		}
		
		SEPatient initialPatient = new SEPatient();
		pe.getInitialPatient(initialPatient);
		
		//update conditions
		pe.getConditions(app.condition.getActiveConditions());
		for(SECondition any : app.condition.getActiveConditions())
        {
        	app.condition.setInitialConditions(any);
        }
		
		//initialize ventilators
		pc = new SEMechanicalVentilatorPressureControl();
        cpap = new SEMechanicalVentilatorContinuousPositiveAirwayPressure();
        vc = new SEMechanicalVentilatorVolumeControl();
        ext = new SEMechanicalVentilation();
        
        engineStabilized = true;
        MiniLogPanel.append("\nSimulation started");
        app.patient.enableStopButton();
        app.patient.enableExportButton();
        
		for (SEAction a : sce.getActions()) {
		    if (a instanceof SEAdvanceTime) {
		        
		        for(int i = 0; i<50; i++){		  
		            if (!pe.advanceTime(stime)) {
		                publish("\nSomething bad happened\n");
		                MiniLogPanel.append("\n!!!Error, simulation stopped!!!");
		                return;
		            }
		            
		            handilngVentilator(ext,pc,cpap,vc);

		            //Log and data printing
		            if(ext_running)
		            	zmqServer.setSimulationData(dataPrint());
		            else
		            	dataPrint();

		            stime.setValue(0.02, TimeUnit.s);
		            Log.info("Advancing "+stime+"...");  	
		        }

		    } else {
		        pe.processAction(a);
		        MiniLogPanel.append("\nApplying \n" + a.toString()+"");
		    }
		    if(stopRequested)
		    	return;
		}
	}
    
    
	@Override
    protected void process(List<String> chunks) {
        for (String chunk : chunks) {
            app.log.getResultArea().append(chunk);
        }
    }
    

    @Override
    protected void done() {
        app.log.getResultArea().append("Simulation stopped.\n");
    }
    
    private void setDataRequests(SEDataRequestManager dataRequests) {
    	//list of data requests.
    	//SimTime is mandatory, since it is always retrieved
    	//order is important
    	String[] requestList = {"SimTime",
				"HeartRate",
				"TotalLungVolume",
				"RespirationRate",
				"Lead3ElectricPotential",
				"CarbonDioxide",
				"ArterialPressure"
				};
    	
    	this.requestList = requestList;
    	
    	//create the requests
    	dataRequests.createPhysiologyDataRequest(requestList[1], FrequencyUnit.Per_min);
        dataRequests.createPhysiologyDataRequest(requestList[2], VolumeUnit.mL);
        dataRequests.createPhysiologyDataRequest(requestList[3], FrequencyUnit.Per_min);
        dataRequests.createECGDataRequest(requestList[4], ElectricPotentialUnit.mV);
        dataRequests.createGasCompartmentDataRequest("Carina", "CarbonDioxide", "PartialPressure", PressureUnit.mmHg);
        dataRequests.createPhysiologyDataRequest(requestList[6], PressureUnit.mmHg);
    }
    
    private void setPatientParameter(SEPatient patient) {
    	
    	//retrieved patient field and set them (not from file)
		patient.setName(app.patient.getName_PATIENT());
		patient.getAge().setValue(Double.parseDouble(app.patient.getAge_PATIENT()), TimeUnit.yr);
		patient.getBodyFatFraction().setValue(Double.parseDouble(app.patient.getBodyFatFraction_PATIENT()));
		patient.getHeartRateBaseline().setValue(Double.parseDouble(app.patient.getHeartRate_PATIENT()), FrequencyUnit.Per_min);
		patient.getDiastolicArterialPressureBaseline().setValue(Double.parseDouble(app.patient.getDiastolicPressure_PATIENT()), PressureUnit.mmHg);
		patient.getSystolicArterialPressureBaseline().setValue(Double.parseDouble(app.patient.getSystolicPressure_PATIENT()), PressureUnit.mmHg);
		patient.getRespirationRateBaseline().setValue(Double.parseDouble(app.patient.getRespirationRate_PATIENT()), FrequencyUnit.Per_min);
		patient.getBasalMetabolicRate().setValue(Double.parseDouble(app.patient.getBasalMetabolicRate_PATIENT()), PowerUnit.kcal_Per_day);
		if (app.patient.getSex_PATIENT().equals("Male")) {
		    patient.setSex(eSex.Male);
		} else {
		    patient.setSex(eSex.Female);
		}

		//Weight
		String weightUnit = app.patient.getWeightUnit_PATIENT();
    	if(weightUnit.equals("kg"))
    		patient.getWeight().setValue(Double.parseDouble(app.patient.getWeight_PATIENT()), MassUnit.kg);
    	else
    		patient.getWeight().setValue(Double.parseDouble(app.patient.getWeight_PATIENT()), MassUnit.lb);
    	
    	//Height
    	String heightUnit = app.patient.getHeightUnit_PATIENT();
    	if(heightUnit.equals("inches"))
    		patient.getHeight().setValue(Double.parseDouble(app.patient.getHeight_PATIENT()), LengthUnit.in);
    	else if(heightUnit.equals("m"))
    		patient.getHeight().setValue(Double.parseDouble(app.patient.getHeight_PATIENT()), LengthUnit.m);
    	else if(heightUnit.equals("cm"))
    		patient.getHeight().setValue(Double.parseDouble(app.patient.getHeight_PATIENT()), LengthUnit.cm);
    	else 
    		patient.getHeight().setValue(Double.parseDouble(app.patient.getHeight_PATIENT()), LengthUnit.ft);
		
    }
    
    public void exportInitialPatient() {
        String basePath = "./states/";
        String baseFileName = app.patient.getName_PATIENT() + "@0s.json";
        String filePath = basePath + baseFileName;

        int counter = 1;
        while (new File(filePath).exists()) {
            filePath = basePath + app.patient.getName_PATIENT() + counter + "@0s.json";
            counter++;
        }
        pe.serializeToFile(filePath);
        app.scenario.updatePatientFiles();
    }
    
  //Handling Ventilators
    private void handilngVentilator(SEMechanicalVentilation ext, SEMechanicalVentilatorPressureControl pc, SEMechanicalVentilatorContinuousPositiveAirwayPressure cpap, SEMechanicalVentilatorVolumeControl vc) {
    	if(ventilationDisconnectRequest) {
        	ventilationDisconnectRequest = false;
        	if(app.ventilator.isPCConnected()){ 
            	stop_pc(pc);
            }
            else if(app.ventilator.isCPAPConnected()){
    	        stop_cpap(cpap);
    	    }
            else if(app.ventilator.isVCConnected()){
    	        stop_vc(vc);
    	    }
            else if(app.ventilator.isEXTConnected()){
            	ext_running = false;
    	        stop_ext(ext);
    	    }
        	app.ventilator.setNullRunningVentilationMode();
        }
        else if(ventilationStartRequest) {
        	ventilationStartRequest = false;
        	
            if(app.ventilator.isPCConnected()){ 
            	start_pc(pc);
            }
            else if(app.ventilator.isCPAPConnected()){
    	        start_cpap(cpap);
    	    }
            else if(app.ventilator.isVCConnected()){
    	        start_vc(vc);
    	    }
            else if(app.ventilator.isEXTConnected()){
            	try {
					start_ext();
	    	        manage_ext(ext);
	    	        ext_running = true;
	    	        return;
				} catch (Exception e) {
					e.printStackTrace();
				}
    	    }
        } else {
        	if(app.ventilator.isPCConnected()){ 
            	manage_pc(pc);
            }
            else if(app.ventilator.isCPAPConnected()){
    	        manage_cpap(cpap);
    	    }
            else if(app.ventilator.isVCConnected()){
    	        manage_vc(vc);
    	    }
        }
    	
    	if(ext_running)
			try {
				manage_ext(ext);
			} catch (Exception e) {
				e.printStackTrace();
			}
    }
    

	//Set and Starts of Ventilators
    
    private void start_pc(SEMechanicalVentilatorPressureControl pc) {
    	manage_pc(pc);
        pc.setConnection(eSwitch.On);
        pe.processAction(pc);
        MiniLogPanel.append("\nPC ventilator connected");
    }
    
    private void manage_pc(SEMechanicalVentilatorPressureControl pc) {
    	if (app.ventilator.getAssistedMode_PC().equals("AC")) {
    		pc.setMode(MechanicalVentilatorPressureControlData.eMode.AssistedControl);
		} else {
			pc.setMode(MechanicalVentilatorPressureControlData.eMode.ContinuousMandatoryVentilation);
		}
        pc.setMode(MechanicalVentilatorPressureControlData.eMode.AssistedControl);
        pc.getInspiratoryPeriod().setValue(app.ventilator.getInspiratoryPeriodValue_PC(),TimeUnit.s);
        pc.getFractionInspiredOxygen().setValue(app.ventilator.getFractionInspOxygenValue_PC());
        pc.getInspiratoryPressure().setValue(app.ventilator.getInspiratoryPressureValue_PC(), PressureUnit.cmH2O);
        pc.getPositiveEndExpiratoryPressure().setValue(app.ventilator.getPositiveEndExpPresValue_PC(), PressureUnit.cmH2O);
        pc.getRespirationRate().setValue(app.ventilator.getRespirationRateValue_PC(), FrequencyUnit.Per_min);
        pc.getSlope().setValue(app.ventilator.getSlopeValue_PC(), TimeUnit.s);
        if(!pe.processAction(pc)) {
        	MiniLogPanel.append("\n!!!Ventilator pc error, simulation stopped!!!");
        }
    }
    
    private void stop_pc(SEMechanicalVentilatorPressureControl pc) {
        pc.setConnection(eSwitch.Off);
        pe.processAction(pc);
    }
    
    private void start_cpap(SEMechanicalVentilatorContinuousPositiveAirwayPressure cpap) {
        manage_cpap(cpap);
        cpap.setConnection(eSwitch.On);
        pe.processAction(cpap);
        MiniLogPanel.append("\nCPAP ventilator connected");
    }
    
    private void manage_cpap(SEMechanicalVentilatorContinuousPositiveAirwayPressure cpap) {
    	cpap.getFractionInspiredOxygen().setValue(app.ventilator.getFractionInspOxygenValue_CPAP());
        cpap.getDeltaPressureSupport().setValue(app.ventilator.getDeltaPressureSupValue_CPAP(), PressureUnit.cmH2O);
        cpap.getPositiveEndExpiratoryPressure().setValue(app.ventilator.getPositiveEndExpPresValue_CPAP(), PressureUnit.cmH2O);
        cpap.getSlope().setValue(app.ventilator.getSlopeValue_CPAP(), TimeUnit.s);
        if(!pe.processAction(cpap)) {
        	MiniLogPanel.append("\n!!!Ventilator cpap error, simulation stopped!!!");
        }
    }
    
    private void stop_cpap(SEMechanicalVentilatorContinuousPositiveAirwayPressure cpap) {
        cpap.setConnection(eSwitch.Off);
        pe.processAction(cpap);
    }
    
    private void start_vc(SEMechanicalVentilatorVolumeControl vc) {
    	manage_vc(vc);
        vc.setConnection(eSwitch.On);
        pe.processAction(vc);
        MiniLogPanel.append("\nVC ventilator connected");
    }
   
    private void manage_vc(SEMechanicalVentilatorVolumeControl vc) {
    	if (app.ventilator.getAssistedMode_PC().equals("AC")) {
    		vc.setMode(MechanicalVentilatorVolumeControlData.eMode.AssistedControl);
		} else {
			vc.setMode(MechanicalVentilatorVolumeControlData.eMode.ContinuousMandatoryVentilation);
		}
    	vc.setMode(MechanicalVentilatorVolumeControlData.eMode.AssistedControl);
        vc.getFlow().setValue(app.ventilator.getFlow_VC(), VolumePerTimeUnit.L_Per_min);
        vc.getFractionInspiredOxygen().setValue(app.ventilator.getFractionInspOxygenValue_VC());
        vc.getInspiratoryPeriod().setValue(app.ventilator.getInspiratoryPeriod_VC(), TimeUnit.s);
        vc.getPositiveEndExpiratoryPressure().setValue(app.ventilator.getPositiveEndExpPres_VC(), PressureUnit.cmH2O);
        vc.getRespirationRate().setValue(app.ventilator.getRespirationRate_VC(), FrequencyUnit.Per_min);
        vc.getTidalVolume().setValue(app.ventilator.getTidalVol_VC(), VolumeUnit.mL);
        if(!pe.processAction(vc)) {
        	MiniLogPanel.append("\n!!!Ventilator vc error, simulation stopped!!!");
        }
    }
    
    private void stop_vc(SEMechanicalVentilatorVolumeControl vc) {
        vc.setConnection(eSwitch.Off);
        pe.processAction(vc);
    }
    

    // method to set the volume/pressure from external ventilator
    private void start_ext() throws Exception {
    	zmqServer = new ZeroServer();
    	zmqServer.connect();
		zmqServer.startReceiving();
		MiniLogPanel.append("\nSearching for EXTERNAL ventilator");
    }
    
	private void manage_ext(SEMechanicalVentilation ext){
		if(zmqServer.isConnectionStable()) {
			if(firstConnection) {
				MiniLogPanel.append("\nEXTERNAL ventilator connected");
				firstConnection = false;
			}
			setEXTMode(zmqServer.getSelectedMode());
			//here change to add ZeroMQ call	
			if (currentEXTMode == extMode.VOLUME) {
	            setVolume(ext);
	        } else if (currentEXTMode == extMode.PRESSURE) {
	            setPressure(ext);
	        }
	        ext.setState(eSwitch.On);
	        if(!pe.processAction(ext)) {
	        	MiniLogPanel.append("\n!!!Ventilator ext error, simulation stopped!!!");
	        }
		}
		else if(!firstConnection){
			disconnectEXTClient(ext);
		}
			
    }
	
	private void setVolume(SEMechanicalVentilation ext) {
		double volume = zmqServer.getVolume();
		ext.getFlow().setValue(volume, VolumePerTimeUnit.mL_Per_s);
    	app.ventilator.setVolumeLabel_EXT(volume);
	}
	
	private void setPressure(SEMechanicalVentilation ext) {
		double pressure = zmqServer.getPressure();
		ext.getPressure().setValue(pressure,PressureUnit.mmHg);
    	app.ventilator.setPressureLabel_EXT(pressure);
	}
	
    public void setEXTMode(String mode) {
        if (mode.equalsIgnoreCase("VOLUME")) {
        	currentEXTMode = extMode.VOLUME;
        } else {
        	currentEXTMode = extMode.PRESSURE;
        }
    }
    
    public void disconnectEXTClient(SEMechanicalVentilation ext) {
    	ext.setState(eSwitch.Off);
        pe.processAction(ext);
        app.ventilator.setPressureLabel_EXT(Double.NaN);
        app.ventilator.setVolumeLabel_EXT(Double.NaN);
        //NEW press button when client disconnects
        if(zmqServer.isDisconnecting()) {
        	zmqServer.setDisconnecting();
            app.ventilator.disconnectButton.doClick();
            MiniLogPanel.append("\nEXTERNAL ventilator disconnected");
        }
        firstConnection = true;
        
    }
    
    private void stop_ext(SEMechanicalVentilation ext) {
    	ext.setState(eSwitch.Off);
    	pe.processAction(ext);
    	zmqServer.close();
    	MiniLogPanel.append("\nEXTERNAL ventilator server closed");
    }
    
    //Print data in console and log Panel and Charts
    private ArrayList<String> dataPrint() {
    	ArrayList<String> data = new ArrayList<String>();
    	
    	//print conditions
        pe.getConditions(app.condition.getActiveConditions());
        for(SECondition any : app.condition.getActiveConditions())
        {
            Log.info(any.toString());
            publish(any.toString()+ "\n");
            data.add(any.toString());
        }
        
        //print requested data
    	List<Double> dataValues = pe.pullData();
        dataRequests.writeData(dataValues);
        publish("---------------------------\n");
        for(int i = 0; i < (dataValues.size()); i++ ) {
            publish(requestList[i] + ": " + dataValues.get(i) + "\n");
            data.add(requestList[i] + ": " + dataValues.get(i));
        }
        
        //print actions
        List<SEAction> actions = new ArrayList<SEAction>();
        pe.getActiveActions(actions);
        for(SEAction any : actions)
        {
        	Log.info(any.toString());
        	publish(any.toString()+ "\n");
          
          //Ext ventilator doesn't need the data actions
          //data.add(any.toString());
        }

        //send data to graphs to be printed
        double x = dataValues.get(0);
        double y = 0;
        for (int i = 1; i < (dataValues.size()); i++) {
        	y = dataValues.get(i);
            app.charts.addValueToItemDisplay(requestList[i],x, y);
        }
        
        return data;
    }
}

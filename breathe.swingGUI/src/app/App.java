package app;

import java.awt.BorderLayout;
import java.awt.Color;
import java.util.ArrayList;
import java.util.List;

import javax.swing.*;

import panels.*;
import utils.Pair;
import data.Action;
import data.Condition;
import data.Patient;
import data.Ventilator;
import interfaces.GuiCallback;

public class App extends JFrame implements GuiCallback {
	
	/*
	 * Main Panel containing all the other Panels
	 */
    private static final long serialVersionUID = 1L;
    
    //All panels
    public ControlPanel controlPanel = new ControlPanel(this);
    public ActionsPanel actionsPanel = new ActionsPanel(this);
    public VentilatorsPanel ventilatorsPanel = new VentilatorsPanel(this);
    public OutputButtonPanel outputButtonPanel = new OutputButtonPanel(this);
    public OutputPanel outputPanel = new OutputPanel(this);
    public LogPanel logPanel = new LogPanel(this);
    public ScenarioPanel scenarioPanel = new ScenarioPanel(this);
    public MinilogPanel minilogPanel = new MinilogPanel(this);
    public PatientConditionsPanel patientConditionsPanel = new PatientConditionsPanel(this);
    
    //Left and Right Panel
    public JTabbedPane leftTabbedPane;
    public JTabbedPane rightTabbedPane; 

    //create a simulationWorker
    private SimulationWorker sim;
   
    public App() {
    	
    	Initializer.initilizeJNI();
		sim = new SimulationWorker(this);
    	
    	//Main Panel Style
        setTitle("Breathe Simulation");
        setSize(1100, 700);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setResizable(false);
        setLayout(new BorderLayout());
        getContentPane().setBackground(Color.LIGHT_GRAY);

        /*
         * Left side of the main panel
         */
        leftTabbedPane = new JTabbedPane();
        leftTabbedPane.addTab("Patient", patientConditionsPanel);
        leftTabbedPane.addTab("Actions", actionsPanel);
        leftTabbedPane.addTab("Ventilators", ventilatorsPanel);
        leftTabbedPane.addTab("Output Settings", outputButtonPanel);
        
        JPanel leftPanel = new JPanel();
        leftPanel.setLayout(new BorderLayout());
        leftPanel.add(leftTabbedPane, BorderLayout.CENTER);        
        
        /*
         * Right side of the main panel
         */
        rightTabbedPane = new JTabbedPane();
        rightTabbedPane.addTab("Output", outputPanel);
        rightTabbedPane.addTab("Scenario", scenarioPanel);
        rightTabbedPane.addTab("Log", logPanel);
        
        JPanel rightPanel = new JPanel();
        rightPanel.setLayout(new BorderLayout());
        rightPanel.add(rightTabbedPane, BorderLayout.CENTER);

        /*
         * Splitting View
         */     
        JPanel leftView = new JPanel();
        leftView.setLayout(new BoxLayout(leftView, BoxLayout.Y_AXIS));
        leftView.add(leftPanel);
        leftView.add(Box.createVerticalGlue());  
        leftView.add(controlPanel);
        leftView.add(minilogPanel);
        
        JSplitPane splitPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT, leftView, rightPanel);
        splitPane.setDividerLocation(550); 
        splitPane.setDividerSize(5);

        add(splitPane, BorderLayout.CENTER);
        add(rightPanel, BorderLayout.EAST); 
        
    }
    /*
     * GUI TO GUI
     */
	public void addOutputButton(String outputName) {
		outputButtonPanel.addOutputButton(outputName);
	}
    
	public void updateOutputDisplay(List<JToggleButton> buttons) {
		outputPanel.updateItemDisplay(buttons);
	}
	
    public void addActiontoScenario(Action action, int seconds) {
    	scenarioPanel.addAction(action, seconds);
    }
    
	public void applyCondition(Condition condition) {
		patientConditionsPanel.getConditionsPanel().addCondition(condition);
	}
	
	public void removeCondition(String title) {
		patientConditionsPanel.getConditionsPanel().removeCondition(title);
	}
	
	public List<Condition> getActiveConditions() {
		return patientConditionsPanel.getConditionsPanel().getActiveConditions();
	}
    public boolean loadPatientData(String selectedPatientFilePath) {
    	return patientConditionsPanel.getPatientPanel().loadPatientData(selectedPatientFilePath);
    }
    
	public void clearOutputDisplay() {
		outputPanel.clearOutputDisplay();
	}
	
	public void resetVentilatorsButton() {
		ventilatorsPanel.resetButton();
	}
	
	public String getPatientName() {
		return patientConditionsPanel.getPatientPanel().getPatientName();
	}
	

    
    /*
     * GUI TO SIMULATIONWORKER
     */
    public boolean startSimulation() {
    	Patient new_patient = patientConditionsPanel.getPatientPanel().generateInitialPatient(getActiveConditions());
    	if(new_patient != null) {
    		sim = new SimulationWorker(this);
    		sim.simulation(new_patient);	
    		patientConditionsPanel.getConditionsPanel().enableButtons(false);
    		ventilatorsPanel.setEnableConnectButton(true);
    		patientConditionsPanel.getPatientPanel().enableComponents(false);
    		return true;
    	}
    	return false;
    }
    
    public boolean startFromFileSimulation(String file) {
    	if(file != null) {
    		sim = new SimulationWorker(this);
    		sim.simulationFromFile(file);	
    		patientConditionsPanel.getConditionsPanel().enableButtons(false);
    		ventilatorsPanel.setEnableConnectButton(true);
    		patientConditionsPanel.getPatientPanel().enableComponents(false);
    		return true;
    	}else {
    		return false;
    	}
    }
    
    public boolean startFromScenarioSimulation(String scenarioFile) {
    	if(scenarioFile != null) {
    		sim = new SimulationWorker(this);
    		sim.simulationFromScenario(scenarioFile);	
    		ventilatorsPanel.setEnableConnectButton(true);
    		patientConditionsPanel.getPatientPanel().enableComponents(false);
    		return true;
    	}else {
    		return false;
    	}
    }
    
    public void stopSimulation() {
    	sim.stopSimulation();	
    	patientConditionsPanel.getConditionsPanel().enableButtons(true);
    	patientConditionsPanel.getPatientPanel().enableComponents(true);
    	actionsPanel.enableButtons(false);
    	ventilatorsPanel.resetButton();
    }
    
    public void exportSimulation(String exportFilePath) {
		sim.exportSimulation(exportFilePath);
	}
    
    public void applyAction(Action action) {
		sim.applyAction(action);
	}
    
	public void createScenario(String patientFile, String scenarioName, ArrayList<Pair<Action, Integer>> actions) {
		sim.createScenario(patientFile, scenarioName, actions);
	}
    
    public void connectVentilator() {
    	Ventilator v = ventilatorsPanel.getCurrentVentilator();
    	if(v != null)
    		sim.connectVentilator(v);	
    }
    
    public void disconnectVentilator() {
    	Ventilator v = ventilatorsPanel.getCurrentVentilator();
    	if(v != null)
    		sim.disconnectVentilator(v);
    }
    
    
    /*
     * SIMULATIONWORKER TO GUI
     */
	@Override
	public void stabilizationComplete(boolean enable) {
		controlPanel.enableControlStartButton(!enable);
		controlPanel.showControlStartButton(!enable);
		actionsPanel.enableButtons(enable);
		patientConditionsPanel.getConditionsPanel().enableButtons(!enable);
	}
    
	@Override
	public void logStringData(String data) {
		logPanel.append(data);
	}
	
	public void minilogStringData(String data){
		minilogPanel.append(data);
	}
	
	@Override
	public void logItemDisplayData(String data, double x, double y) {
		outputPanel.addValueToItemDisplay(data, x, y);
	}

	@Override
	public void logPressureExternalVentilatorData(double pressure) {
		ventilatorsPanel.setEXTPressureLabel(pressure);
	}

	@Override
	public void logVolumeExternalVentilatorData(double volume) {
		ventilatorsPanel.setEXTVolumeLabel(volume);
	}
	
	@Override
	public void setInitialCondition(List<Condition> list) {	
		patientConditionsPanel.getConditionsPanel().setInitialCondition(list);
	}

}
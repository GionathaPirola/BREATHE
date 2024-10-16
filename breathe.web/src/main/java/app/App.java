package app;

import java.util.List;

import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Menu;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

import data.Action;
import data.Condition;
import data.Ventilator;
import data.Patient;
import interfaces.GuiCallback;
import panels.*;

@PageTitle("Breathe")
@Menu(icon = "line-awesome/svg/pencil-ruler-solid.svg", order = 0)
@Route("")
public class App extends Composite<VerticalLayout> implements GuiCallback {
	private static final long serialVersionUID = 1L;

    // Contenuti per il primo gruppo di tabs
    private final PatientConditionPanel patientConditionPanel = new PatientConditionPanel(this);  // Usa la classe PatientPanel
    private final ActionsPanel actionsPanel = new ActionsPanel(this); 
    private final VentilatorsPanel ventilatorsPanel = new VentilatorsPanel(this);

    // Contenuti per il secondo gruppo di tabs
    private final OutputPanel outputPanel = new OutputPanel(this);
    private final ScenarioPanel scenarioPanel = new ScenarioPanel(this);
    private final LogPanel logPanel = new LogPanel(this);
    private final ControlPanel controlPanel = new ControlPanel(this);
    
    private SimulationWorker sim;
    
    public App() {
    	
    	Initializer.initilizeJNI();
		sim = new SimulationWorker(this);
		
        VerticalLayout mainLayout = getContent();
        mainLayout.setWidthFull();
        mainLayout.setHeightFull();
        mainLayout.setFlexGrow(1);
        
        // Control Panel
        mainLayout.add(controlPanel);

        // Prima colonna
        VerticalLayout leftColumn = createColumn();
        Tabs leftTabs = createLeftTabs();
        VerticalLayout leftContentLayout = new VerticalLayout();
        leftTabs.addSelectedChangeListener(event -> updateContent(event.getSelectedTab(), leftContentLayout));

        // Aggiungi componenti alla colonna sinistra
        leftColumn.add(leftTabs);
        leftColumn.add(leftContentLayout);

        // Seconda colonna
        VerticalLayout rightColumn = createColumn();
        Tabs rightTabs = createRightTabs();
        VerticalLayout rightContentLayout = new VerticalLayout();
        rightTabs.addSelectedChangeListener(event -> updateContent(event.getSelectedTab(), rightContentLayout));

        // Aggiungi componenti alla colonna destra
        rightColumn.add(rightTabs);
        rightColumn.add(rightContentLayout);

        // Layout principale con due colonne
        HorizontalLayout mainRow = new HorizontalLayout(leftColumn, rightColumn);
        mainRow.setWidthFull();
        mainRow.setHeightFull();
        mainRow.setFlexGrow(1, leftColumn, rightColumn);

        mainLayout.add(mainRow);

        updateContent(leftTabs.getSelectedTab(), leftContentLayout);
        updateContent(rightTabs.getSelectedTab(), rightContentLayout);
    }

    // Metodo per creare un layout colonna
    private VerticalLayout createColumn() {
        VerticalLayout column = new VerticalLayout();
        column.setWidthFull();
        column.setHeightFull();
        column.setFlexGrow(1);
        return column;
    }

    // Metodo per creare un insieme di tabs con dati di esempio
    private Tabs createLeftTabs() {
        Tabs tabs = new Tabs();
        tabs.setWidthFull();
        tabs.add(new Tab("Patient"), new Tab("Actions"), new Tab("Ventilators"));
        return tabs;
    }

    // Metodo per creare un insieme di tabs con dati di esempio
    private Tabs createRightTabs() {
        Tabs tabs = new Tabs();
        tabs.setWidthFull();
        tabs.add(new Tab("Output"), new Tab("Scenario"), new Tab("Log"));
        return tabs;
    }

    // Metodo per aggiornare il contenuto del layout in base al tab selezionato
    private void updateContent(Tab selectedTab, VerticalLayout contentLayout) {
        contentLayout.removeAll();  // Rimuovi tutto il contenuto esistente
        String tabLabel = selectedTab.getLabel();
        switch (tabLabel) {
            case "Patient":
                contentLayout.add(patientConditionPanel);  // Aggiungi il pannello del paziente
                break;
            case "Actions":
                //actionsPanel.setText("This is Actions content");
                contentLayout.add(actionsPanel);
                break;
            case "Ventilators":
                //ventilatorsPanel.setText("This is Ventilators content");
                contentLayout.add(ventilatorsPanel);
                break;
            case "Output":
            	//outputPanel.setText("This is Output content");
                contentLayout.add(outputPanel);
                break;
            case "Scenario":
            	//scenarioPanel.setText("This is Scenario content");
                contentLayout.add(scenarioPanel);
                break;
            case "Log":
            	//logPanel.setText("This is Log content");
                contentLayout.add(logPanel);
                break;
        }
    }
    
    
    /*
     * GUI TO GUI
     */
    
	public void applyCondition(Condition condition) {
		patientConditionPanel.getConditionsPanel().addCondition(condition);
		Notification.show("Added");
	}
	
	public void removeCondition(String title) {
		patientConditionPanel.getConditionsPanel().removeCondition(title);
		Notification.show("Removed");
	}
	
	public List<Condition> getActiveConditions() {
		return patientConditionPanel.getConditionsPanel().getActiveConditions();
	}
	
	public void addActiontoScenario(Action action, int totalSeconds) {
		scenarioPanel.addAction(action, totalSeconds);	
	}
    
	public String getPatientName() {
		return patientConditionPanel.getPatientPanel().getPatientName();
	}
	
	public void clearOutputDisplay() {
		outputPanel.clearOutputDisplay();
	}
	
    /*
     * GUI TO SIMULATION WORKER
     */
	
	public boolean startSimulation() {
    	Patient new_patient = patientConditionPanel.getPatientPanel().generateInitialPatient(getActiveConditions());
    	if(new_patient != null) {
    		sim = new SimulationWorker(this);
    		sim.simulation(new_patient);	
        	patientConditionPanel.getConditionsPanel().enableButtons(false);
        	patientConditionPanel.getPatientPanel().enableComponents(false);
    		return true;
    	}
    	return false;
	}
    
    public boolean startFromFileSimulation(String file) {
    	if(file != null) {
    		sim = new SimulationWorker(this);
    		sim.simulationFromFile(file);
    		return true;
    	}else 
    		return false;
    }
    
    public void stopSimulation() {
    	sim.stopSimulation();	
		actionsPanel.enableButtons(false);
	  	patientConditionPanel.getConditionsPanel().enableButtons(true);
		patientConditionPanel.getPatientPanel().enableComponents(true);
		ventilatorsPanel.resetButton();
	}
    
    public void exportSimulation(String exportFilePath) {
		sim.exportSimulation(exportFilePath);
	}
    
	public void connectVentilator() {
		Ventilator v = ventilatorsPanel.getCurrentVentilator();
    	if(v != null) {
    		sim.connectVentilator(v);	
    	}
	}
	
	public void disconnectVentilator() {
    	Ventilator v = ventilatorsPanel.getCurrentVentilator();
    	if(v != null)
    		sim.disconnectVentilator(v);
    }
	
	
	
	
    /*
     * SIMULATION WORKER TO GUI
     */
    
	@Override
	public void stabilizationComplete(boolean enable) {
		 getUI().ifPresent(ui -> ui.access(() -> {
			controlPanel.enableControlStartButton(!enable);
			actionsPanel.enableButtons(enable);
			ventilatorsPanel.setEnableConnectButton(true);
         }));
	}

	@Override
	public void logStringData(String data) {
		getUI().ifPresent(ui -> ui.access(() -> {
			logPanel.append(data);
         }));
		
	}

	@Override
	public void minilogStringData(String data) {
		getUI().ifPresent(ui -> ui.access(() -> {
			Notification.show(data);
		}));
	}

	@Override
	public void logItemDisplayData(String data, double x, double y) {
		getUI().ifPresent(ui -> ui.access(() -> {
			 outputPanel.addValueToItemDisplay(data, x, y);
         }));
	}

	@Override
	public void logPressureExternalVentilatorData(double pressure) {

	}

	@Override
	public void logVolumeExternalVentilatorData(double volume) {

	}

	@Override
	public void setInitialCondition(List<Condition> list) {

	}

	public void applyAction(Action action) {
		sim.applyAction(action);
	}

	

}

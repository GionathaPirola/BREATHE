package panels;

import java.awt.Color;
import java.awt.Dimension;
import java.io.File;
import java.io.IOException;

import javax.swing.JButton;
import javax.swing.JPanel;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.swing.JFileChooser;
import javax.swing.JOptionPane;
import javax.swing.Box;
import app.App;

public class ControlPanel {

    private JPanel mainPanel = new JPanel(); 
    JButton startFromFileButton,startFromScenarioButton,startButton,stopButton,exportButton;
    
    App app;

    public ControlPanel(App app) {
    	this.app = app;

    	//set up main panel
        mainPanel.setBackground(Color.LIGHT_GRAY);
        mainPanel.setPreferredSize(new Dimension(550, 100));

        Dimension buttonSize = new Dimension(150, 40); 

        //START FROM FILE BUTTON
        startFromFileButton = new JButton("Start From File");
        startFromFileButton.setToolTipText("Start Simulation from Patient File");
        startFromFileButton.setPreferredSize(buttonSize);
        startFromFileButton.setMaximumSize(buttonSize);
        startFromFileButton.setAlignmentX(JButton.CENTER_ALIGNMENT);
        startFromFileButton.setBackground(new Color(0, 122, 255));
        startFromFileButton.setForeground(Color.WHITE);
        startFromFileButton.setFocusPainted(false);
        
        startFromFileButton.addActionListener(e -> {
        	startingFileSimulation();
        });

        //START FROM SCENARIO BUTTON
        startFromScenarioButton = new JButton("Start From Scenario");
        startFromScenarioButton.setToolTipText("Start a Scenario");
        startFromScenarioButton.setPreferredSize(buttonSize);
        startFromScenarioButton.setMaximumSize(buttonSize);
        startFromScenarioButton.setAlignmentX(JButton.CENTER_ALIGNMENT); 
        startFromScenarioButton.setBackground(new Color(0, 122, 255));
        startFromScenarioButton.setForeground(Color.WHITE);
        startFromScenarioButton.setFocusPainted(false);
        
        startFromScenarioButton.addActionListener(e -> {
        	startingScenarioSimulation();
        });

        //START SIMULATION BUTTON
        startButton = new JButton("Start Simulation");
        startButton.setToolTipText("Start new Simulation");
        startButton.setPreferredSize(buttonSize);
        startButton.setMaximumSize(buttonSize);
        startButton.setAlignmentX(JButton.CENTER_ALIGNMENT); 
        startButton.setBackground(new Color(0, 122, 255));
        startButton.setForeground(Color.WHITE);
        startButton.setFocusPainted(false);
        
        startButton.addActionListener(e -> {
        	startingStandardSimulation();
        	enableControlStartButton(false);
        });
        
        //STOP SIMULATION BUTTON
        stopButton = new JButton("Stop Simulation");
        stopButton.setToolTipText("Stop Simulation");
        stopButton.setPreferredSize(buttonSize);
        stopButton.setMaximumSize(buttonSize);
        stopButton.setAlignmentX(JButton.CENTER_ALIGNMENT); 
        stopButton.setEnabled(false);
        stopButton.setBackground(new Color(255, 59, 48));
        stopButton.setForeground(Color.WHITE);
        stopButton.setVisible(false);
        stopButton.setFocusPainted(false);
        
        stopButton.addActionListener(e -> {
        	app.stopSimulation();
        	enableControlStartButton(true);
        	showControlStartButton(true);
        	resetVentilatorsButton();
        });

        //EXPORT BUTTON
        exportButton = new JButton("Export Simulation");
        exportButton.setToolTipText("Export current patient state");
        exportButton.setPreferredSize(buttonSize);
        exportButton.setMaximumSize(buttonSize);
        exportButton.setAlignmentX(JButton.CENTER_ALIGNMENT); 
        exportButton.setEnabled(false);
        exportButton.setBackground(new Color(0, 128, 0));
        exportButton.setForeground(Color.WHITE);
        exportButton.setVisible(false);
        exportButton.setFocusPainted(false);
        
        exportButton.addActionListener(e -> {
            String defaultFileName = "./states/exported/" + app.getPatientName() + ".json";
            JFileChooser fileChooser = new JFileChooser("./states/exported/");
            fileChooser.setDialogTitle("Export simulation");
            fileChooser.setSelectedFile(new File(defaultFileName)); // Pre-set default filename
            fileChooser.setApproveButtonText("Export");
            fileChooser.setFileSelectionMode(JFileChooser.FILES_ONLY);
            
            boolean validFileName = false; // Flag to track valid filename

            while (!validFileName) {
                int userSelection = fileChooser.showSaveDialog(null);
                
                if (userSelection == JFileChooser.APPROVE_OPTION) {
                    File fileToSave = fileChooser.getSelectedFile();
                    String fileName = fileToSave.getAbsolutePath();
                    
                    // Ensure the file ends with .json
                    if (!fileName.endsWith(".json")) {
                        fileName += ".json";
                    }
                    
                    File file = new File(fileName);
                    
                    // Check if file exists and ask for overwrite confirmation
                    if (file.exists()) {
                        int response = JOptionPane.showConfirmDialog(null, 
                            "File already exists. Do you want to overwrite it?", 
                            "Overwrite Confirmation", 
                            JOptionPane.YES_NO_OPTION, 
                            JOptionPane.WARNING_MESSAGE);
                        
                        if (response == JOptionPane.YES_OPTION) {
                            app.exportSimulation(fileName);
                            validFileName = true; // Exit loop
                        }
                    } else {
                    	app.exportSimulation(fileName);
                        validFileName = true; 
                    }
                    
                } else {
                    // User cancelled the operation
                    validFileName = true; 
                }
            }
        });
        
        //Add buttons to buttonPanel
        mainPanel.add(startFromScenarioButton);
        mainPanel.add(stopButton);
        mainPanel.add(Box.createRigidArea(new Dimension(10, 0)));  
        mainPanel.add(startFromFileButton);
        mainPanel.add(Box.createRigidArea(new Dimension(10, 0)));
        mainPanel.add(startButton);
        mainPanel.add(Box.createRigidArea(new Dimension(10, 0)));
        mainPanel.add(exportButton);
    }
    

	//start simulation
    private void startingStandardSimulation() {
    	if(app.startSimulation()) {
        	clearOutputDisplay();
    	}
	}

    //start from file
    private void startingFileSimulation() {
    	JFileChooser fileChooser = new JFileChooser("./states/");
        int returnValue = fileChooser.showOpenDialog(null); // pick a file
        if (returnValue == JFileChooser.APPROVE_OPTION) {
            String patientFilePath = fileChooser.getSelectedFile().getAbsolutePath();   
            
            enableControlStartButton(false);

            if(app.loadPatientData(patientFilePath)) {
            	
            	if(app.startFromFileSimulation(patientFilePath)) {
                	clearOutputDisplay();
            	}
            }
        }
    }   


	//start from scenario simulation
    private void startingScenarioSimulation() {
    	JFileChooser fileChooser = new JFileChooser("./scenario/");
        int returnValue = fileChooser.showOpenDialog(null); // pick a file
        if (returnValue == JFileChooser.APPROVE_OPTION) {
            String scenarioFilePath = fileChooser.getSelectedFile().getAbsolutePath();
            
            try {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode rootNode_scenario = mapper.readTree(new File(scenarioFilePath));
                String PatientFilePath = rootNode_scenario.path("EngineStateFile").asText();

                enableControlStartButton(false);
                if(app.loadPatientData(PatientFilePath)) {
                	
                	if(app.startFromScenarioSimulation(scenarioFilePath)) {
                    	clearOutputDisplay();
                	}
                }
            } catch (IOException ex) {
                ex.printStackTrace();
                JOptionPane.showMessageDialog(null, "Error loading scenario JSON file.", "Error", JOptionPane.ERROR_MESSAGE);
            }
        }
	}
    
	//method to return panel
    public JPanel getMainPanel() {
        return mainPanel;
    }
    
    public void enableControlStartButton(boolean enable) {
        startButton.setEnabled(enable); 
        startFromFileButton.setEnabled(enable); 
        startFromScenarioButton.setEnabled(enable);
        stopButton.setEnabled(!enable);
        exportButton.setEnabled(!enable);
    }
    
    public void showControlStartButton(boolean enable) {
        startButton.setVisible(enable); 
        startFromFileButton.setVisible(enable); 
        startFromScenarioButton.setVisible(enable);
        stopButton.setVisible(!enable);
        exportButton.setVisible(!enable);
    }
    

	private void clearOutputDisplay() {
		app.clearOutputDisplay();
	}
	
    private void resetVentilatorsButton() {
		app.resetVentilatorsButton();
	}
   
}

package ventilators;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.util.HashMap;
import java.util.Map;

import javax.swing.JPanel;
import javax.swing.JSpinner;
import javax.swing.SpinnerNumberModel;

import javax.swing.JComboBox;
import javax.swing.JComponent;
import javax.swing.JLabel;

public class pcVentilatorPanel{
	private JPanel mainPanel = new JPanel(new GridBagLayout());
	
	private JSpinner fractionInspOxygen, inspiratoryPeriod, inspiratoryPressure, positiveEndExpPres, respirationRate, slope;
    private JComboBox<String> AM = new JComboBox<>(new String[]{"AC", "CMV"});
    
    
    // MechanicalVentilatorContinuousPositiveAirwayPressure (PC)
	public pcVentilatorPanel() {
        mainPanel.setBackground(Color.LIGHT_GRAY);
        
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.gridx = 0;
        gbc.gridy = 0;
        
        
        addLabelAndField("Fraction Inspired Oxygen - FiO2", fractionInspOxygen = new JSpinner(new SpinnerNumberModel(0.21, 0, 1, 0.01)), mainPanel, gbc);
        addLabelAndField("Inspiratory Period - Ti", inspiratoryPeriod = new JSpinner(new SpinnerNumberModel(1, 0, 10, 0.1)), mainPanel, gbc);
        addLabelAndField("Inspiratory Pressure - Pinsp", inspiratoryPressure = new JSpinner(new SpinnerNumberModel(19, 0, 100, 1)), mainPanel, gbc);
        addLabelAndField("Positive End Expiratory Pressure - PEEP", positiveEndExpPres = new JSpinner(new SpinnerNumberModel(5, 0, 20, 1)), mainPanel, gbc);
        addLabelAndField("Respiration Rate - RR", respirationRate = new JSpinner(new SpinnerNumberModel(12, 0, 60, 1)), mainPanel, gbc);
        addLabelAndField("Slope", slope = new JSpinner(new SpinnerNumberModel(0.2, 0, 2, 0.1)), mainPanel, gbc);
        addLabelAndField("Assisted Mode", AM, mainPanel, gbc);
        
	}
	
    //method to add visual to panel
    private void addLabelAndField(String labelText, JComponent component, JPanel panel, GridBagConstraints gbc) {
    	component.setPreferredSize(new Dimension(65, 25));
        gbc.gridx = 0;
        gbc.gridwidth = 1;
        panel.add(new JLabel(labelText), gbc);
        gbc.gridx = 1;
        panel.add(component, gbc);
        gbc.gridy++;
    }
    
    //method to return panel
    public JPanel getMainPanel() {
    	return mainPanel;
    }
    
    // Method to get all ventilator data in a Map (The name has to be equal to that of the engine)
    public Map<String, Number> getData() {
        Map<String, Number> dataMap = new HashMap<>();
        dataMap.put("FractionInspiredOxygen", (double) fractionInspOxygen.getValue());
        dataMap.put("InspiratoryPeriod", (double) inspiratoryPeriod.getValue());
        dataMap.put("InspiratoryPressure", (int) inspiratoryPressure.getValue());
        dataMap.put("PositiveEndExpiratoryPressure", (int) positiveEndExpPres.getValue());
        dataMap.put("RespirationRate", (int) respirationRate.getValue());
        dataMap.put("Slope", (double) slope.getValue());
        // Include the Assisted Mode as a String value
        if(AM.getSelectedItem().toString().equals("AC"))
        	dataMap.put("AssistedMode", 0); 
        else
        	dataMap.put("AssistedMode", 1); 
        return dataMap;
    }
    
}

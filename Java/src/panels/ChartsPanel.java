package panels;

import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.BoxLayout;
import javax.swing.JPanel;
import javax.swing.JScrollPane;

import com.kitware.pulse.cdm.properties.CommonUnits.ElectricPotentialUnit;
import com.kitware.pulse.cdm.properties.CommonUnits.FrequencyUnit;
import com.kitware.pulse.cdm.properties.CommonUnits.PressureUnit;
import com.kitware.pulse.cdm.properties.CommonUnits.Unit;
import com.kitware.pulse.cdm.properties.CommonUnits.VolumeUnit;

import utils.LineChart;

import javax.swing.JCheckBox;

public class ChartsPanel {
	
	/*
	 * Panel to manage graphs visualization
	 */
	
	public LineChart[] chartPanels;
    public JPanel chartsPanel = new JPanel();
    JScrollPane scrollChartPane;
    JPanel selectionPanel;
    private JCheckBox[] chartCheckboxes;
    
    public ChartsPanel() {
    	
    	//Names for the charts, order is important
    	//this is important when setting the dimension on LineChart
        String[] chartNames = {
        		"Heart Rate", 
        		"Total Lung Volume", 
        		"Respiratory Rate", 
        		"ECG",
        		"CO2",
        		"Pleth"};
        
        //Units for the charts, order must match the names
        Unit[] chartUnits = {
        		FrequencyUnit.Per_min, 
        		VolumeUnit.mL, 
        		FrequencyUnit.Per_min, 
        		ElectricPotentialUnit.mV,
        		PressureUnit.mmHg,
        		PressureUnit.mmHg};
        
        chartPanels = new LineChart[chartNames.length];
        chartCheckboxes = new JCheckBox[chartNames.length];
        
        selectionPanel = new JPanel();
        selectionPanel.setBackground(Color.BLACK);
        
        chartsPanel.setLayout(new BoxLayout(chartsPanel, BoxLayout.Y_AXIS));
        chartsPanel.setBackground(Color.BLACK);

        // Add selection boxes
        for (int i = 0; i < chartNames.length; i++) {
            chartPanels[i] = new LineChart(chartNames[i], chartUnits[i]); 
            chartCheckboxes[i] = new JCheckBox(chartNames[i]);
            
            // Pick starting graphs
            if (i == 1 || i == 3 || i==5) {
                chartCheckboxes[i].setSelected(true);
            } else {
                chartCheckboxes[i].setSelected(false);
            }
            
            chartCheckboxes[i].setBackground(Color.BLACK);
            chartCheckboxes[i].setForeground(Color.WHITE);
            chartCheckboxes[i].addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    updateChartsPanel();
                }
            });
            selectionPanel.add(chartCheckboxes[i]);
            
            // Add only selected graphs
            if (chartCheckboxes[i].isSelected()) {
                chartsPanel.add(chartPanels[i]);
            }
        }
        
        scrollChartPane = new JScrollPane(chartsPanel);
        scrollChartPane.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);
        scrollChartPane.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_NEVER);
        scrollChartPane.setBorder(null);
    }

    // method to return list of charts
    public LineChart[] getChartsPanel() {
        return chartPanels;
    }
    
    // method to return the panel
    public JPanel getChartPanel() {
        JPanel mainPanel = new JPanel();
        mainPanel.setLayout(new BoxLayout(mainPanel, BoxLayout.Y_AXIS));
        mainPanel.add(selectionPanel);
        mainPanel.add(scrollChartPane);
        mainPanel.setBackground(Color.BLACK);
        return mainPanel;
    }
    
    // update view depending on selected panels
    private void updateChartsPanel() {
        chartsPanel.removeAll();
        for (int i = 0; i < chartCheckboxes.length; i++) {
            if (chartCheckboxes[i].isSelected()) {
                chartsPanel.add(chartPanels[i]);
            }
        }
        chartsPanel.revalidate();
        chartsPanel.repaint();
    }
}

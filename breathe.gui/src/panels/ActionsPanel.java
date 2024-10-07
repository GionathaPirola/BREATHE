package panels;

import java.awt.Color;
import java.awt.Dimension;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

import javax.swing.JComponent;
import javax.swing.JPanel;
import javax.swing.Box;
import javax.swing.BoxLayout;
import javax.swing.JScrollPane;
import javax.swing.JSpinner;
import javax.swing.SpinnerNumberModel;

import app.App_temp;
import inputItems.ActionBox;

public class ActionsPanel {

    private JPanel mainPanel = new JPanel();
    private List<ActionBox> boxes = new ArrayList<>();

    public ActionsPanel(App_temp app) {
    	 
        mainPanel.setBackground(Color.LIGHT_GRAY);
        mainPanel.setPreferredSize(new Dimension(550, 650));
        mainPanel.setLayout(new BoxLayout(mainPanel, BoxLayout.Y_AXIS)); 
        
        // Crea un pannello per le condition box e lo metti dentro lo scroll pane
        JPanel actionsContainer = new JPanel();
        actionsContainer.setLayout(new BoxLayout(actionsContainer, BoxLayout.Y_AXIS)); 
        actionsContainer.setBorder(null);
        
        JScrollPane scrollablePanel = new JScrollPane(actionsContainer);  // Avvolgi il pannello
        scrollablePanel.setPreferredSize(new Dimension(550, 650)); 
        scrollablePanel.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);
        scrollablePanel.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_NEVER);
        scrollablePanel.setBorder(null);
        
        Map<String, JComponent> ardsComponents = new HashMap<>();
        ardsComponents.put("LeftLungSeverity", new JSpinner(new SpinnerNumberModel(0, 0, 1, 0.01)));
        ardsComponents.put("RightLungSeverity", new JSpinner(new SpinnerNumberModel(0, 0, 1, 0.01)));
        ActionBox ardsBox = new ActionBox(app, "ARDS Exacerbation", ardsComponents);
        boxes.add(ardsBox);

        Map<String, JComponent> acuteStressComponents = new HashMap<>();
        acuteStressComponents.put("Severity", new JSpinner(new SpinnerNumberModel(0, 0, 1, 0.01)));
        ActionBox acuteStressBox = new ActionBox(app, "AcuteStress", acuteStressComponents);
        boxes.add(acuteStressBox);

        Map<String, JComponent> airwayObstructionComponents = new HashMap<>();
        airwayObstructionComponents.put("Severity", new JSpinner(new SpinnerNumberModel(0, 0, 1, 0.01)));
        ActionBox airwayObstructionBox = new ActionBox(app, "AirwayObstruction", airwayObstructionComponents);
        boxes.add(airwayObstructionBox);

        Map<String, JComponent> asthmaAttackComponents = new HashMap<>();
        asthmaAttackComponents.put("Severity", new JSpinner(new SpinnerNumberModel(0, 0, 1, 0.01)));
        ActionBox asthmaAttackBox = new ActionBox(app, "AsthmaAttack", asthmaAttackComponents);
        boxes.add(asthmaAttackBox);

        Map<String, JComponent> brainInjuryComponents = new HashMap<>();
        brainInjuryComponents.put("Severity", new JSpinner(new SpinnerNumberModel(0, 0, 1, 0.01)));
        ActionBox brainInjuryBox = new ActionBox(app, "BrainInjury", brainInjuryComponents);
        boxes.add(brainInjuryBox);

        Map<String, JComponent> bronchoconstrictionComponents = new HashMap<>();
        bronchoconstrictionComponents.put("Severity", new JSpinner(new SpinnerNumberModel(0, 0, 1, 0.01)));
        ActionBox bronchoconstrictionBox = new ActionBox(app, "Bronchoconstriction", bronchoconstrictionComponents);
        boxes.add(bronchoconstrictionBox);

        Map<String, JComponent> copdExacerbationComponents = new HashMap<>();
        copdExacerbationComponents.put("BronchitisSeverity", new JSpinner(new SpinnerNumberModel(0, 0, 1, 0.01)));
        copdExacerbationComponents.put("EmphysemaLeftLungSeverity", new JSpinner(new SpinnerNumberModel(0, 0, 1, 0.01)));
        copdExacerbationComponents.put("EmphysemaRightLungSeverity", new JSpinner(new SpinnerNumberModel(0, 0, 1, 0.01)));
        ActionBox copdExacerbationBox = new ActionBox(app, "COPD Exacerbation", copdExacerbationComponents);
        boxes.add(copdExacerbationBox);

        Map<String, JComponent> dyspneaComponents = new HashMap<>();
        dyspneaComponents.put("Severity", new JSpinner(new SpinnerNumberModel(0, 0, 1, 0.01)));
        ActionBox dyspneaBox = new ActionBox(app, "Dyspnea", dyspneaComponents);
        boxes.add(dyspneaBox);

        Map<String, JComponent> exerciseComponents = new HashMap<>();
        exerciseComponents.put("Intensity", new JSpinner(new SpinnerNumberModel(0, 0, 1, 0.01)));
        ActionBox exerciseBox = new ActionBox(app, "Exercise", exerciseComponents);
        boxes.add(exerciseBox);

        Map<String, JComponent> pericardialEffusionComponents = new HashMap<>();
        pericardialEffusionComponents.put("EffusionRate", new JSpinner(new SpinnerNumberModel(0, 0, 1000, 0.01)));
        ActionBox pericardialEffusionBox = new ActionBox(app, "Pericardial Effusion", pericardialEffusionComponents);
        boxes.add(pericardialEffusionBox);

        Map<String, JComponent> pneumoniaExacerbationComponents = new HashMap<>();
        pneumoniaExacerbationComponents.put("LeftLungSeverity", new JSpinner(new SpinnerNumberModel(0, 0, 1, 0.01)));
        pneumoniaExacerbationComponents.put("RightLungSeverity", new JSpinner(new SpinnerNumberModel(0, 0, 1, 0.01)));
        ActionBox pneumoniaExacerbationBox = new ActionBox(app, "Pneumonia Exacerbation", pneumoniaExacerbationComponents);
        boxes.add(pneumoniaExacerbationBox);

        Map<String, JComponent> shuntExacerbationComponents = new HashMap<>();
        shuntExacerbationComponents.put("Severity", new JSpinner(new SpinnerNumberModel(0, 0, 1, 0.01)));
        ActionBox shuntExacerbationBox = new ActionBox(app, "Pulmonary Shunt Exacerbation", shuntExacerbationComponents);
        boxes.add(shuntExacerbationBox);

        Map<String, JComponent> respiratoryFatigueComponents = new HashMap<>();
        respiratoryFatigueComponents.put("Severity", new JSpinner(new SpinnerNumberModel(0, 0, 1, 0.01)));
        ActionBox respiratoryFatigueBox = new ActionBox(app, "Respiratory Fatigue", respiratoryFatigueComponents);
        boxes.add(respiratoryFatigueBox);

        ActionBox urinateBox = new ActionBox(app, "Urinate", new HashMap<>());
        boxes.add(urinateBox);

        Map<String, JComponent> ventilatorLeakComponents = new HashMap<>();
        ventilatorLeakComponents.put("Severity", new JSpinner(new SpinnerNumberModel(0, 0, 1, 0.01)));
        ActionBox ventilatorLeakBox = new ActionBox(app, "Ventilator Leak", ventilatorLeakComponents);
        boxes.add(ventilatorLeakBox);

        // Aggiungi i pannelli delle ConditionBox al mainPanel
        for(ActionBox box : boxes) {
        	actionsContainer.add(box.getSectionPanel());
        }
        
        mainPanel.add(Box.createRigidArea(new Dimension(550, 10)));
        mainPanel.add(scrollablePanel);
        mainPanel.add(Box.createRigidArea(new Dimension(550, 10)));
        
    }

    // Metodo per restituire il mainPanel
    public JPanel getMainPanel() {
        return mainPanel;
    }

}


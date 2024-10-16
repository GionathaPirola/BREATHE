package inputItems;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.HasEnabled;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.textfield.NumberField;
import com.vaadin.flow.component.textfield.TextField;

import java.util.Map;
import java.util.HashMap;

import app.App;
import data.Action;

public class ActionBox extends VerticalLayout {

    private String title;
    private Map<String, Component> components;
    private Button applySectionButton;

    // TextFields for time input
    private NumberField hoursField;
    private NumberField minutesField;
    private NumberField secondsField;

    private App app;

    public ActionBox(App app, String title, Map<String, Component> components2) {
        this.app = app;
        this.title = title;
        this.components = components2;
      
        // Header Button
        Button headerButton = new Button(title);
        headerButton.getStyle().set("text-align", "center");
        headerButton.setWidth("90%");
        headerButton.setMaxWidth("90%"); // Imposta una larghezza massima
        headerButton.addClickListener(e -> toggleFields());

        // Create fields layout
        VerticalLayout fieldsLayout = new VerticalLayout();
        fieldsLayout.getStyle().set("border", "1px dashed lightgray");
        fieldsLayout.setWidth("90%");
        fieldsLayout.setAlignItems(Alignment.CENTER);
        fieldsLayout.setVisible(false);
        
        // Add fields and spans
        for (Map.Entry<String, Component> entry : components2.entrySet()) {
            if (entry.getValue() instanceof NumberField) {
                NumberField numberField = (NumberField) entry.getValue(); 
                numberField.setValue(0.0);
                numberField.setWidth("30%"); 
            }
            fieldsLayout.add(entry.getValue()); 
        }

        // Time fields
        createTimeFields(fieldsLayout);

        // Apply Button
        applySectionButton = new Button("Apply", e -> applyAction());
        applySectionButton.setEnabled(false);
        fieldsLayout.add(applySectionButton);

        // Add components to the layout
        add(headerButton, fieldsLayout);
    }

    private void createTimeFields(VerticalLayout fieldsLayout) {
        HorizontalLayout timeLayout = new HorizontalLayout();
        
        // Imposta l'allineamento orizzontale e verticale
        timeLayout.setJustifyContentMode(JustifyContentMode.CENTER); // Centra orizzontalmente
        timeLayout.setAlignItems(Alignment.CENTER); // Centra verticalmente

        hoursField = new NumberField("Hours");
        hoursField.setValue(0.0);
        hoursField.setStep(1); 
        hoursField.setMin(0); 
        hoursField.setWidth("10%"); // Imposta la larghezza al 10%

        minutesField = new NumberField("Minutes");
        minutesField.setValue(0.0);
        minutesField.setStep(1); 
        minutesField.setMin(0); 
        minutesField.setWidth("10%");

        secondsField = new NumberField("Seconds");
        secondsField.setValue(0.0);
        secondsField.setStep(1); 
        secondsField.setMin(0); 
        secondsField.setWidth("10%");

        // Set input restrictions
        hoursField.setPlaceholder("0");
        minutesField.setPlaceholder("0");
        secondsField.setPlaceholder("0");

        timeLayout.add(hoursField, minutesField, secondsField);

        Button plusButton = new Button("+", e -> addToScenario());
        timeLayout.add(plusButton);

        fieldsLayout.add(timeLayout);
    }

    private void toggleFields() {
        boolean isVisible = !getComponentAt(1).isVisible();
        getComponentAt(1).setVisible(isVisible);
    }
    
    public void enableButton(boolean enable) {
    	applySectionButton.setEnabled(enable);
    	for (Map.Entry<String, Component> entry : components.entrySet()) {
    	    if (entry.getValue() instanceof HasEnabled) { 
    	        ((HasEnabled) entry.getValue()).setEnabled(enable); 
    	    }
    	}
    }

    private void addToScenario() {
        int totalSeconds = getTotalTimeInSeconds();
        Map<String, Double> parameters = new HashMap<>();

        for (Map.Entry<String, Component> entry : components.entrySet()) {
            if (entry.getValue() instanceof NumberField) {
                NumberField numberField = (NumberField) entry.getValue();
                Double value = numberField.getValue();
                parameters.put(entry.getKey(), value);
            }
        }

        app.addActiontoScenario(new Action(title, parameters), totalSeconds);
        Notification.show("Action added to scenario!");
    }

    private void applyAction() {
        Map<String, Double> parameters = new HashMap<>();
        
        for (Map.Entry<String, Component> entry : components.entrySet()) {
            if (entry.getValue() instanceof NumberField) {
                NumberField numberField = (NumberField) entry.getValue();
                Double value = numberField.getValue();
                if (value == null) value = 0.00;
                parameters.put(entry.getKey(), value);
            }
        }

        app.applyAction(new Action(title, parameters));
        Notification.show("Action applied!");
    }

    public int getTotalTimeInSeconds() {
        int hours = hoursField.getValue().intValue();
        int minutes = minutesField.getValue().intValue();
        int seconds = secondsField.getValue().intValue();
        return hours * 3600 + minutes * 60 + seconds;
    }

}

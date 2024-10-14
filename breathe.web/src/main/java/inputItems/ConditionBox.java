package inputItems;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.HasEnabled;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.NumberField;

import java.util.HashMap;
import java.util.Map;

import app.App;
import data.Condition;

public class ConditionBox extends VerticalLayout {

    private Button applySectionButton;
    private Button headerButton;

    private App app;

    private String title;
    private Map<String, Component> components;

    private boolean applied = false;

    public ConditionBox(App app, String title, Map<String, Component> components) {
        this.app = app;
        this.title = title;
        this.components = components;

        this.getStyle().set("background-color", "white");

        // Header Button
        headerButton = new Button(title);
        headerButton.getStyle().set("text-align", "center");
        headerButton.setWidth("90%");
        headerButton.setMaxWidth("90%"); 
        headerButton.addClickListener(e -> toggleFields());

        // Create fields layout
        VerticalLayout fieldsLayout = new VerticalLayout();
        fieldsLayout.getStyle().set("border", "1px dashed lightgray");
        //fieldsLayout.setWidth("90%");
        fieldsLayout.setAlignItems(Alignment.CENTER);
        fieldsLayout.setVisible(false);

        // Add fields and spans
        for (Map.Entry<String, Component> entry : components.entrySet()) {
            fieldsLayout.add(entry.getValue());
        }

        // "Apply" button
        applySectionButton = new Button("Apply", e -> applyCondition());
        applySectionButton.setEnabled(true);
        fieldsLayout.add(applySectionButton);

        // Add components to the layout
        add(headerButton, fieldsLayout);
    }

    private void toggleFields() {
        VerticalLayout fieldsLayout = (VerticalLayout) getComponentAt(1);
        boolean isVisible = !fieldsLayout.isVisible();
        fieldsLayout.setVisible(isVisible);
        headerButton.setText(isVisible ? title + " (Close)" : title);
    }

    private void applyCondition() {
        if (!applied) {
            enableFields(false);
            applySectionButton.setText("Remove");
            headerButton.getStyle().set("background-color", "lightblue");

            Map<String, Double> parameters = new HashMap<>();
            for (Map.Entry<String, Component> entry : components.entrySet()) {
                String key = entry.getKey();
                if (entry.getValue() instanceof NumberField) {
                	NumberField textField = (NumberField) entry.getValue();
	                Double value = textField.getValue();
	                if (value == null) value = 0.00;
	                parameters.put(key, value);
                }
            }

            app.applyCondition(new Condition(title, parameters));
            applied = true;
        } else {
            // Removing Condition
            enableFields(true);
            applySectionButton.setText("Apply");
            headerButton.getStyle().set("background-color", "");
            app.removeCondition(title);
            applied = false;
        }
    }

    private void enableFields(boolean enable) {
        for (Map.Entry<String, Component> entry : components.entrySet()) {
        	if (entry.getValue() instanceof HasEnabled) { 
    	        ((HasEnabled) entry.getValue()).setEnabled(enable); 
    	    }
        }
    }

    public boolean isActive() {
        return applied;
    }

    public String getTitle() {
        return title;
    }

    public void reset() {
        enableFields(true);
        applySectionButton.setText("Apply");
        headerButton.getStyle().set("background-color", "");
        for (Map.Entry<String, Component> entry : components.entrySet()) {
        	if (entry.getValue() instanceof NumberField) {
                NumberField numberField = (NumberField) entry.getValue();
                numberField.setValue(0.00);
        	}
        }
        applied = false;
    }

    private String addSpaceBeforeUpperCase(String input) {
        if (input == null || input.isEmpty()) {
            return input;
        }
        return input.replaceAll("(?<!^)([A-Z])", " $1").trim();
    }

    public void setComponents(Map<String, Double> parameters) {
        for (Map.Entry<String, Double> entry : parameters.entrySet()) {
            String key = entry.getKey();
            Double value = entry.getValue();

            if (components.containsKey(key)) {
            	 if (components.get(key) instanceof NumberField) {
	            	NumberField textField = (NumberField) components.get(key);
	                textField.setValue(value);
	                applySectionButton.setText("Remove");
	                headerButton.getStyle().set("background-color", "lightblue");
	                app.applyCondition(new Condition(title, parameters));
	                applied = true;
            	 }
            }
        }
    }
    
    public void enableBox(boolean enable) {
    	applySectionButton.setEnabled(enable);
    	enableFields(enable);
    }
}

package utils;

import javax.swing.JPanel;

import com.kitware.pulse.cdm.properties.CommonUnits.Unit;

import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Point;
import java.awt.RenderingHints;
import java.awt.Color;
import java.awt.Dimension;
import java.util.ArrayList;
import java.util.List;

public class LineChart extends JPanel {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private final List<Point> points = new ArrayList<>();
    private int maxXValue = 500;  
    private int maxYValue;  
    private int minYValue = 0;  
    private int yStep;      
    private String title;
    private Unit unit;
    private double currentYValue;  // Variabile per memorizzare l'ultimo valore di Y

    public LineChart(String title, Unit unit) {
        this.title = title;
        this.unit = unit;
        this.setMaxY();
        setPreferredSize(new Dimension(600, 300));
        setBackground(Color.BLACK); 
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        Graphics2D g2 = (Graphics2D) g;
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        if (title != null && !title.isEmpty()) {
            // Disegna il titolo con font grande
            g2.setFont(g2.getFont().deriveFont(20f)); 
            g2.setColor(Color.WHITE); 
            int titleWidth = g2.getFontMetrics().stringWidth(title);
            g2.drawString(title, (getWidth() - titleWidth) / 2, 20);

            // Disegna l'unità di misura con font più piccolo
            if (unit != null) {
                g2.setFont(g2.getFont().deriveFont(16f)); // Font leggermente più piccolo per l'unità
                String unitStr = "(" + unit.toString() + ")";
                int unitWidth = g2.getFontMetrics().stringWidth(unitStr);
                g2.drawString(unitStr, (getWidth() + titleWidth) / 2 + 5, 20); // Posiziona l'unità accanto al titolo
            }
        }

        // Disegna il valore corrente di y vicino al titolo
        if (!points.isEmpty()) {
            g2.setFont(g2.getFont().deriveFont(14f));
            g2.setColor(Color.WHITE);
            String yValueStr = String.format("%.2f", currentYValue);
            g2.drawString(yValueStr, (getWidth() - g2.getFontMetrics().stringWidth(yValueStr)) / 2, 40);
        }

        g2.setColor(Color.WHITE); 
        g2.setStroke(new java.awt.BasicStroke(1.5f)); 
        g2.drawLine(50, 250, 550, 250); 
        g2.drawLine(50, 50, 50, 250);   

        g2.setColor(new Color(255, 255, 255, 80)); 
        g2.setStroke(new java.awt.BasicStroke(0.5f)); 

        drawGrid(g2);  // Disegna la griglia

        drawAxisLabels(g2);  // Disegna le etichette

        if (points.size() > 1) {
            int prevX = 50;
            g2.setColor(Color.GREEN);
            g2.setStroke(new java.awt.BasicStroke(2f));

            for (int i = Math.max(0, points.size() - maxXValue); i < points.size() - 1; i++) {          	
                Point p1 = points.get(i);
                Point p2 = points.get(i + 1);          
                int y1 = p1.y;
                int y2 = p2.y;
                g2.drawLine(prevX, y1, p2.x - p1.x + prevX, y2);
                prevX = (int)(p2.x - p1.x + prevX);
            }
        }
    }



    private void drawGrid(Graphics2D g2) {
        int chartWidth = getWidth() - 100; // Larghezza utile per il grafico
        int labelInterval = 50; // Intervallo per le etichette sull'asse X

        int startXValue = Math.max(0, points.size() - maxXValue);
        for (int i = startXValue; i <= startXValue + maxXValue; i += labelInterval) {
            int x = 50 + ((i - startXValue) * chartWidth / maxXValue);
            g2.drawLine(x, 50, x, 250);
        }

        for (int i = minYValue; i <= maxYValue; i += yStep) {
            int y = 250 - ((i - minYValue) * 200 / (maxYValue - minYValue)); 
            g2.drawLine(50, y, 550, y);
        }
    }

    private void drawAxisLabels(Graphics2D g2) {
        g2.setColor(Color.WHITE); 
        g2.setFont(g2.getFont().deriveFont(12f)); 

        int chartWidth = getWidth() - 100; 
        int labelInterval = 50; 

        int startXValue = Math.max(0, points.size() - maxXValue);
        
        for (int i = startXValue; i <= startXValue + maxXValue; i += labelInterval) {
            int x = 50 + ((i - startXValue) * chartWidth / maxXValue);
            int y = 265;
            g2.drawString(String.valueOf(i / 50), x - 10, y + 15);
        }

        for (int i = minYValue; i <= maxYValue; i += yStep) {
            int x = 30; 
            int y = 250 - ((i - minYValue) * 200 / (maxYValue - minYValue)); 
            g2.drawString(String.valueOf(i), x - 10, y + 5);
        }
    }

    public void addPoint(double x, double y) {
        if(minYValue > y) {
        	minYValue = (int) Math.floor(y);
        };
        if(maxYValue < y) {
        	maxYValue = (int) Math.floor(y);
        };
    	
        int x1 = (int) (x * 50 + 50);
        int y1 = (int) (250 - ((y - minYValue) * 200 / (maxYValue - minYValue)));
        points.add(new Point(x1, y1));
        currentYValue = y;  
        repaint(); 
    }

    public void clear() {
        points.clear(); 
        setMaxY();
        repaint();
    }
    
    public void setMaxY(){
        switch(this.title){
            case "Heart Rate":
                this.maxYValue = 150;
                this.minYValue = 0;
                this.yStep = 20;  
                break;
            case "Total Lung Volume":
                this.maxYValue = 3500;
                this.minYValue = 1500;
                this.yStep = 400;  
                break;
            case "Respiratory Rate":
                this.maxYValue = 30;
                this.minYValue = 0;
                this.yStep = 5;   
                break;
            case "ECG":
                this.maxYValue = 1;
                this.minYValue = -1;
                this.yStep = 1;   
                break;
            case "CO2":
                this.maxYValue = 50;
                this.minYValue = 0;
                this.yStep = 5;   
                break;
            case "Pleth":
                this.maxYValue = 150;
                this.minYValue = 50;
                this.yStep = 20;   
                break;
            default:
                this.maxYValue = 100;
                this.minYValue = 0;
                this.yStep = 20;  
                break;
        }
    }
    
    public int getMaxY() {
        return this.maxYValue;
    }

    public void setMinYValue(int minYValue) {
        this.minYValue = minYValue;
        repaint();  
    }
}

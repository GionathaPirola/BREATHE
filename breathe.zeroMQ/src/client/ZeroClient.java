package client;

import org.zeromq.SocketType;
import org.zeromq.ZMQ;
import org.zeromq.ZMQException;
import org.zeromq.ZContext;

import javax.swing.*;
import java.awt.Color;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.util.HashMap;
import java.util.Map;

public class ZeroClient {
    private JFrame frame;
    private JButton connectButton, disconnectButton;
    private JRadioButton volumeButton, pressureButton;
    private JTextArea outputArea;
    private JSpinner rrSpinner, ieRatioSpinner, pinspSpinner, vtSpinner, peepSpinner;

    private ZMQ.Socket socket;
    private ZContext context;
    private String selectedOption;
    private boolean isConnected = false;
    private Thread communicationThread;

    private Map<String, Double> receivedDataMap;
    private String simTime;

    public ZeroClient() {
        receivedDataMap = new HashMap<>();

        frame = new JFrame("ZeroMQ Client");
        frame.setSize(400, 400);
        frame.setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);
        frame.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                if (disconnectButton.isEnabled()) {
                    disconnectFromServer();
                }
                frame.dispose();
                System.exit(0);
            }
        });

        JPanel panel = new JPanel();
        frame.add(panel);
        placeComponents(panel);

        frame.setVisible(true);
    }

    private void placeComponents(JPanel panel) {
        panel.setLayout(null);

        connectButton = new JButton("Connect");
        connectButton.setBounds(50, 20, 100, 25);
        connectButton.setBackground(new Color(0, 122, 255));
        connectButton.setForeground(Color.WHITE);
        connectButton.setFocusPainted(false);
        panel.add(connectButton);

        disconnectButton = new JButton("Disconnect");
        disconnectButton.setBounds(200, 20, 120, 25);
        disconnectButton.setBackground(new Color(255, 59, 48));
        disconnectButton.setForeground(Color.WHITE);
        disconnectButton.setFocusPainted(false);
        disconnectButton.setEnabled(false);
        panel.add(disconnectButton);

        outputArea = new JTextArea();
        outputArea.setBounds(50, 160, 300, 180);
        panel.add(outputArea);
        outputArea.setLineWrap(true);
        outputArea.setWrapStyleWord(true);
        outputArea.setEditable(false);

        JScrollPane scrollPane = new JScrollPane(outputArea);
        scrollPane.setBounds(50, 160, 300, 180);
        panel.add(scrollPane);

        volumeButton = new JRadioButton("Volume");
        volumeButton.setBounds(50, 60, 100, 25);
        panel.add(volumeButton);

        pressureButton = new JRadioButton("Pressure");
        pressureButton.setBounds(160, 60, 100, 25);
        pressureButton.setSelected(true); // Default selezionato Pressione
        panel.add(pressureButton);

        ButtonGroup group = new ButtonGroup();
        group.add(volumeButton);
        group.add(pressureButton);

        // Spinner per Respiratory Rate (RR)
        JLabel rrLabel = new JLabel("RR:");
        rrLabel.setBounds(50, 90, 100, 25);
        panel.add(rrLabel);

        rrSpinner = new JSpinner(new SpinnerNumberModel(12, 6, 30, 1)); // default 12, min 6, max 30
        rrSpinner.setBounds(100, 90, 50, 25);
        panel.add(rrSpinner);

        // Spinner per I:E Ratio
        JLabel ieLabel = new JLabel("I:E Ratio:");
        ieLabel.setBounds(160, 90, 100, 25);
        panel.add(ieLabel);

        ieRatioSpinner = new JSpinner(new SpinnerNumberModel(0.67, 0.1, 2.0, 0.01)); // default 2/3
        ieRatioSpinner.setBounds(220, 90, 60, 25);
        panel.add(ieRatioSpinner);

        // Spinner per Pinsp (mostrato solo se selezionato Pressure)
        JLabel pinspLabel = new JLabel("P insp:");
        pinspLabel.setBounds(50, 120, 100, 25);
        panel.add(pinspLabel);

        pinspSpinner = new JSpinner(new SpinnerNumberModel(20.0, 10.0, 40.0, 1.0)); // default 20
        pinspSpinner.setBounds(100, 120, 50, 25);
        panel.add(pinspSpinner);

        // Spinner per Vt (mostrato solo se selezionato Volume)
        JLabel vtLabel = new JLabel("Vt:");
        vtLabel.setBounds(50, 120, 100, 25);
        panel.add(vtLabel);

        vtSpinner = new JSpinner(new SpinnerNumberModel(500.0, 200.0, 1000.0, 50.0)); // default 500
        vtSpinner.setBounds(100, 120, 50, 25);
        vtLabel.setVisible(false); // Nascondi inizialmente
        vtSpinner.setVisible(false); // Nascondi inizialmente
        panel.add(vtSpinner);

        // Spinner per PEEP
        JLabel peepLabel = new JLabel("PEEP:");
        peepLabel.setBounds(160, 120, 100, 25);
        panel.add(peepLabel);

        peepSpinner = new JSpinner(new SpinnerNumberModel(5.0, 0.0, 20.0, 0.5)); // default 5
        peepSpinner.setBounds(220, 120, 60, 25);
        panel.add(peepSpinner);

        // Listener per cambiare la visualizzazione dei componenti in base alla selezione
        volumeButton.addActionListener(e -> {
            vtSpinner.setVisible(true); // Mostra Vt
            vtLabel.setVisible(true);
            pinspSpinner.setVisible(false); // Nascondi Pinsp
            pinspLabel.setVisible(false);
        });

        pressureButton.addActionListener(e -> {
            vtSpinner.setVisible(false); // Nascondi Vt
            vtLabel.setVisible(false);
            pinspSpinner.setVisible(true); // Mostra Pinsp
            pinspLabel.setVisible(true);
        });

        connectButton.addActionListener(e -> {
            if (!isConnected) {
                selectedOption = volumeButton.isSelected() ? "Volume" : "Pressure";
                connectToServerWithTimer();
                volumeButton.setEnabled(false);
                pressureButton.setEnabled(false);
                connectButton.setEnabled(false);
                disconnectButton.setEnabled(true);
            }
        });

        disconnectButton.addActionListener(e -> {
            if (isConnected) {
                disconnectFromServer();
                volumeButton.setEnabled(true);
                pressureButton.setEnabled(true);
                connectButton.setEnabled(true);
                disconnectButton.setEnabled(false);
                outputArea.append("Disconnected.\n");
                frame.dispose();
                System.exit(0);
            }
        });

        outputArea.getDocument().addDocumentListener(new javax.swing.event.DocumentListener() {
            public void insertUpdate(javax.swing.event.DocumentEvent e) {
                outputArea.setCaretPosition(outputArea.getDocument().getLength());
            }

            public void removeUpdate(javax.swing.event.DocumentEvent e) {
                outputArea.setCaretPosition(outputArea.getDocument().getLength());
            }

            public void changedUpdate(javax.swing.event.DocumentEvent e) {
                outputArea.setCaretPosition(outputArea.getDocument().getLength());
            }
        });
    }


    private void connectToServerWithTimer() {
        synchronized (this) {
            context = new ZContext();
            socket = context.createSocket(SocketType.REQ);
        }

        outputArea.append("Connecting to server...\n");

        try {
            socket.connect("tcp://localhost:5555");
        } catch (ZMQException ex) {
            outputArea.append("Failed to connect to server: " + ex.getMessage() + "\n");
            return;
        }

        synchronized (this) {
            isConnected = true;
        }

        communicationThread = new Thread(() -> {
            outputArea.append("Thread started. Entering while loop...\n");

            try {
                while (isConnected && !Thread.currentThread().isInterrupted()) {
                	

                    socket.send("requestData".getBytes(ZMQ.CHARSET), 0);
                    outputArea.append("Request Sent\n");

                    byte[] reply = socket.recv(0);
                    String receivedData = new String(reply, ZMQ.CHARSET);
                    //outputArea.append("Received: " + receivedData + "\n");

                    storeData(receivedData);

                    double value = selectedOption.equals("Volume") ? processVolume() : processPressure();

                    String request = selectedOption + ": " + value;
                    outputArea.append("Sending: " + request + "\n");
                    socket.send(request.getBytes(ZMQ.CHARSET), 0);

                    reply = socket.recv(0);
                    outputArea.append("Received: " + new String(reply, ZMQ.CHARSET) + "\n");

                    Thread.sleep(200);
                }
            } catch (InterruptedException ex) {
                Thread.currentThread().interrupt();
                outputArea.append("Thread was interrupted.\n");
            } catch (ZMQException ex) {
                if (ex.getErrorCode() == ZMQ.Error.ETERM.getCode()) {
                    outputArea.append("ZMQ context terminated.\n");
                } else if (ex.getErrorCode() == ZMQ.Error.EINTR.getCode()) {
                    outputArea.append("Socket interrupted during recv.\n");
                } else {
                    throw ex;
                }
            } finally {
                synchronized (this) {
                    if (socket != null) {
                        socket.close();
                        socket = null;
                    }
                    if (context != null) {
                        context.close();
                        context = null;
                    }
                }
                outputArea.append("Resources cleaned up after interruption.\n");
            }
        });

        communicationThread.start();
    }

    private void disconnectFromServer() {
        outputArea.append("Disconnecting from server...\n");

        new Thread(() -> {
            synchronized (this) {
                isConnected = false;
            }

            try {
                if (socket != null) {
                    socket.send("disconnect".getBytes(ZMQ.CHARSET), 0);
                    outputArea.append("Disconnect message sent to server.\n");
                }
            } catch (ZMQException ex) {
                outputArea.append("Failed to send disconnect message: " + ex.getMessage() + "\n");
            }

            if (communicationThread != null) {
                try {
                    communicationThread.join();
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }

            synchronized (this) {
                if (socket != null) {
                    socket.close();
                    socket = null;
                }
                if (context != null) {
                    context.close();
                    context = null;
                }
                isConnected = false;
            }

            outputArea.append("Disconnected.\n");
        }).start();
    }

    private void storeData(String data) {
        String[] patientDataParts = data.split("Patient Data:");
        if (patientDataParts.length > 1) {
            String patientData = patientDataParts[1].trim();
            
            String[] keyValuePairs = patientData.split(";");
            for (String pair : keyValuePairs) {
                String[] keyValue = pair.split(":");
                if (keyValue.length == 2) {
                    String key = keyValue[0].trim();
                    String valueStr = keyValue[1].trim();
                    
                    if (key.equals("SimTime")) {
                        simTime = valueStr;
                    } else {
                        try {
                            double value = Double.parseDouble(valueStr);
                            receivedDataMap.put(key, value);
                        } catch (NumberFormatException e) {
                            outputArea.append("Errore nel parsing del valore: " + valueStr + "\n");
                        }
                    }
                }
            }
        }
    }

    private double processVolume() {
        double volume = 20;

        return volume; // Return the current pressure value
    }

    private double processPressure() {
        int respiratoryRate = (int) rrSpinner.getValue();
        double ieRatio = (double) ieRatioSpinner.getValue();
        double pinsp = (double) pinspSpinner.getValue();
        double peep = (double) peepSpinner.getValue();

        if (simTime == null) {
            return peep; 
        }

        outputArea.append("Time: " + simTime + "\n");
        double currentSimTime = Double.parseDouble(simTime);
        
        double totalCycleDuration = 60.0 / respiratoryRate;
        double inspiratoryTime = totalCycleDuration * (ieRatio / (1 + ieRatio));

        double cycleTime = currentSimTime % totalCycleDuration;

        if (cycleTime < inspiratoryTime) {
            return pinsp;
        } else {
            return peep; 
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(ZeroClient::new);
    }
}

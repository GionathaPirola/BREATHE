package tests;

import javax.swing.*;
import java.util.List;

import com.kitware.pulse.cdm.engine.SEDataRequestManager;
import com.kitware.pulse.cdm.patient.SEPatient;
import com.kitware.pulse.cdm.properties.CommonUnits.FrequencyUnit;
import com.kitware.pulse.cdm.properties.CommonUnits.TimeUnit;
import com.kitware.pulse.cdm.properties.CommonUnits.VolumeUnit;
import com.kitware.pulse.cdm.properties.SEScalarTime;
import com.kitware.pulse.engine.PulseEngine;
import com.kitware.pulse.utilities.Log;
import com.kitware.pulse.utilities.JNIBridge;

public class SimulationWorker extends SwingWorker<Void, String> {

    private final App app;

    public SimulationWorker(App app) {
        this.app = app;
    }

    @Override
    protected Void doInBackground() throws Exception {
        // Inizializzazione di JNIBridge e PulseEngine
        JNIBridge.initialize();
        PulseEngine pe = new PulseEngine();
        
        String[] requestList = {"SimTime","HeartRate","TotalLungVolume","RespirationRate","BloodVolume"};

        // Creazione e configurazione delle richieste di dati
        SEDataRequestManager dataRequests = new SEDataRequestManager();
        dataRequests.createPhysiologyDataRequest(requestList[1], FrequencyUnit.Per_min);
        dataRequests.createPhysiologyDataRequest(requestList[2], VolumeUnit.mL);
        dataRequests.createPhysiologyDataRequest(requestList[3], FrequencyUnit.Per_min);
        dataRequests.createPhysiologyDataRequest(requestList[4], VolumeUnit.mL);
        dataRequests.setResultsFilename("./test_results/HowTo_EngineUse.java.csv");

        //SOLO PER DEBUG
        pe.serializeFromFile("./states/StandardMale@0s.json", dataRequests);
        SEPatient initialPatient = new SEPatient();
        pe.getInitialPatient(initialPatient);

        publish("Started\n");
        // Avanzamento temporale e gestione degli errori
        SEScalarTime time = new SEScalarTime(0, TimeUnit.s);
        for(int tempo = 0; tempo < 10; tempo++) {
            if (!pe.advanceTime(time)) {
                publish("Something bad happened\n");
                return null;
            }

            // Estrazione e scrittura dei dati
            List<Double> dataValues = pe.pullData();
            dataRequests.writeData(dataValues);
            publish("---------------------------\n");
            for(int i = 0; i < (dataValues.size()); i++ ) {
                publish(requestList[i] + ": " + dataValues.get(i) + "\n");
            }

            // Aggiungi punto al grafico usando SimTime (dataValues.get(0)) e HeartRate (dataValues.get(1))
            int x = (int)(dataValues.get(0)*30+50);  // Scala il tempo per renderlo visibile
            int y = (int) (250 - dataValues.get(1)*2);
            app.getChartPanel().addPoint(x, y);

            time.setValue(1, TimeUnit.s);
            Log.info("Advancing "+time+"...");
        }

        // Pulizia finale e chiusura della simulazione
        pe.clear();
        pe.cleanUp();
        publish("Simulation Complete\n");

        return null;
    }

    @Override
    protected void process(java.util.List<String> chunks) {
        for (String chunk : chunks) {
            app.getResultArea().append(chunk);
        }
    }
}
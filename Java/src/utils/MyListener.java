package utils;

import com.kitware.pulse.utilities.LogListener;

import panels.MiniLogPanel;

public class MyListener extends LogListener
{
  public MyListener()
  {
    super();
    // Since we are just pushing this data into the log
    // We set listen to false, when you create a LogListener
    // is will automatically register itself with the static Log class,
    // and when ever a Log even class is called, this will be called
    // and since this just calls the Log to log you will get into a recursive infinite loop.
    // This is just because I use the LogListener interface to listen to any log messages coming
    // from C++. Technically it is a LogListener as it is 'listening' to log events in C++.
    // At any rate the Java side will receive log events from C++, and you create your own 
    // LogListener so you can do as you see fit with those messages. BUT if you do want to 
    // push those messages to the Java Log, you will need this class to not listen so you
    // don't get into an infinite recursive loop
    listen(true);
  }    
  @Override
  public void handleDebug(String msg) {  }
  @Override
  public void handleInfo(String msg)  {  }
  @Override
  public void handleWarn(String msg)  {  }
  @Override
  public void handleError(String msg) { MiniLogPanel.append("aaaaa"); }
  @Override
  public void handleFatal(String msg) { MiniLogPanel.append(msg); }
}
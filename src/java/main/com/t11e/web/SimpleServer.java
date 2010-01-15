package com.t11e.web;

import org.mortbay.jetty.Connector;
import org.mortbay.jetty.Server;
import org.mortbay.jetty.bio.SocketConnector;
import org.mortbay.jetty.handler.ResourceHandler;

public class SimpleServer
{
  private int port;
  private String resourceBase;
  private Server server;

  public static void main(final String args[])
  {
    if (args.length != 2)
    {
      System.err.println("Usage: SimpleServer port path");
      throw new IllegalArgumentException();
    }
    SimpleServer server = new SimpleServer();
    server.setPort(Integer.parseInt(args[0], 10));
    server.setResourceBase(args[1]);
    server.start();
    server.join();
  }

  public void start()
  {
    server = new Server();
    {
      Connector connector = new SocketConnector();
      connector.setPort(getPort() > 0 ? getPort() : 0);
      server.setConnectors(new Connector[] {connector});
    }
    if (resourceBase != null)
    {
      final ResourceHandler resourceHandler = new ResourceHandler();
      resourceHandler.setWelcomeFiles(new String[] {"index.html"});
      resourceHandler.setResourceBase(resourceBase);
      server.addHandler(resourceHandler);
    }
    try
    {
      server.start();
    }
    catch (Exception e)
    {
      throw new RuntimeException("Problem starting server", e);
    }
  }

  public void stop()
  {
    try
    {
      server.stop();
    }
    catch (Exception e)
    {
      throw new RuntimeException("Problem stopping server", e);
    }
  }

  public void join()
  {
    try
    {
      server.join();
    }
    catch (InterruptedException e)
    {
      Thread.currentThread().interrupt();
    }
  }

  public void setPort(int port)
  {
    this.port = port;
  }

  public int getPort()
  {
    return port;
  }

  public void setResourceBase(String resourceBase)
  {
    this.resourceBase = resourceBase;
  }

  public String getResourceBase()
  {
    return resourceBase;
  }
}

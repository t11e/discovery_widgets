package com.t11e.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.BitSet;
import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class TutorialResultsServlet
  extends HttpServlet
{
  private static final long serialVersionUID = 7819929443901355878L;

  @Override
  protected void doGet(
    final HttpServletRequest request,
    final HttpServletResponse response)
    throws IOException
  {
    final List<String> ids = getCommaSeparatedValues(request, "itemIds");
    final BitSet exactMatches = stringToBitSet(request.getParameter("exactMatches"));
    final int totalSize = getFirstAsInt(request, "totalSize", 0);
    final int exactSize = getFirstAsInt(request, "exactSize", 0);
    final int startIndex = getFirstAsInt(request, "startIndex", 0);
    final int pageSize = getFirstAsInt(request, "pageSize", 0);

    response.setContentType("text/html");
    final PrintWriter out = response.getWriter();
    out.println("<html><body>");
    out.println("<div class='summary'>" +
                "There are " + totalSize + " results, with " + exactSize +
                " exact matches. Page size is " + pageSize + ".</div>");
    for (int i = 0; i < ids.size(); ++i)
    {
      final String id = ids.get(i);
      final boolean exact = exactMatches.get(i);
      final int resultNumber = startIndex + i + 1; // adjusting to be one-based
      out.print("<div class='row " + (exact ? "exact" : "fuzzy") + "'>");
      out.print("<div class='result-num'>" + resultNumber + "</div>");
      out.print("<div class='result-id'>" + id + "</div>");
      out.print("<div class='result-type'>" + (exact ? "exact" : "fuzzy") + "</div>");
      out.println("</div>");
    }
    out.println("</body></html>");
  }


  private List<String> getCommaSeparatedValues(
    final HttpServletRequest request,
    final String parameter)
  {
    final String idsString = request.getParameter(parameter);
    List<String> result = Collections.emptyList();
    if (idsString != null)
    {
      result = Arrays.asList(idsString.split(","));
    }
    return result;
  }

  private int getFirstAsInt(
    final HttpServletRequest request,
    final String parameter,
    final int defaultValue)
  {
    final String value = request.getParameter(parameter);
    int result = defaultValue;
    if (value != null)
    {
      result = Integer.parseInt(value, 10);
    }
    return result;
  }

  private BitSet stringToBitSet(final String stringRep)
  {
    final BitSet result = new BitSet();
    if (stringRep != null)
    {
      final int len = stringRep.length();
      for (int i = 0; i < len; ++i)
      {
        final char c = stringRep.charAt(i);
        if ('1' == c)
        {
          result.set(i);
        }
      }
    }
    return result;
  }

}

package com.t11e.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONValue;

public class TutorialAutoCompleteServlet
  extends HttpServlet
{
  private static final long serialVersionUID = 8872041268396435423L;

  private static final String[] WORDS = new String[] {
    "Orange",
    "Apple",
    "Banana",
    "Pear",
    "Strawberry",
    "Peach",
    "Kiwi",
    "Mango",
    "Pineapple",
  };

  @Override
  protected void doGet(
    final HttpServletRequest request,
    final HttpServletResponse response)
    throws IOException
  {
    final String term;
    {
      final String termParam = request.getParameter("term");
      term = termParam == null ? "" : termParam.trim();
    }
    final int listLength;
    {
      String listLengthParam = request.getParameter("listlength");
      listLength = (listLengthParam == null || listLengthParam.length() == 0)
        ? -1 : Math.min(100, Integer.parseInt(listLengthParam, 10));
    }
    List<Map<String, Object>> hits = new ArrayList<Map<String, Object>>();
    final String matchTerm = term.toLowerCase();
    for (final String word : WORDS)
    {
      final String matchWord = word.toLowerCase();
      if (matchTerm.length() == 0 || matchWord.contains(matchTerm))
      {
        Map<String, Object> hit = new HashMap<String, Object>();
        hit.put("label", word);
        hit.put("value", matchWord);
        hits.add(hit);
      }
    }
    if (listLength != -1)
    {
      hits = hits.subList(0, Math.min(hits.size(), listLength));
    }
    response.setContentType("application/json");
    JSONValue.writeJSONString(hits, response.getWriter());
  }
}

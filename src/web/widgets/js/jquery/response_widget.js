/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview t11e.widget.jquery.ResponseWidget definition
 */

t11e.util.define_namespace('t11e.widget.jquery');
if (false) {
    t11e.widget.jquery.prototype.Eclipse__Outline__Hack = undefined;
}

/**
 * Debug widget that displays the search response as JSON.
 * <h2>Example</h2>
 * <div class="t11e-widget t11e-widget-jquery-response t11e-widget-id-2103">
 *  <div class="t11e-hd t11e-widget-jquery-response-hd">
 *      <h1>
 *          JSON Response
 *      </h1>
 *  </div>
 *  <div class="t11e-bd t11e-widget-jquery-response-bd">
 *      <div class="response"></div>
 *  </div>
 *  <div class="t11e-ft t11e-widget-jquery-response-ft"></div>
 * </div>
 * <script type="text/javascript">
 *  //<!--
 *      if ('undefined' === typeof t11e) { t11e = {}; }
 *      if ('undefined' === typeof t11e.widget_options) { t11e.widget_options = {}; }
 *      t11e.widget_options['2103'] = {
 *          "search_group": "vehicle"
 *      };
 *  //-->
 * </script>
 *
 *<h3>Example Response</h3>
 *<pre class="brush: js">
 * {
 *   "results_query_params": "itemIds=1299123372,1379973264,1379992904,1380507219,1380521004,
 *                          1380521054,1380542517,1380757566,1380942965,1381018779
 *                          &exactMatches=1111111111&totalSize=1110&exactSize=424&startIndex=0&pageSize=10",
 *   "_discovery": {
 *     "request": {
 *       "drillDown": [
 *         {
 *           "ids": [
 *             "vehicles/automobiles/cars",
 *             "vehicles/automobiles/motorcycles",
 *             "vehicles/automobiles/suvs",
 *             "vehicles/automobiles/trucks",
 *             "vehicles/automobiles/vans"
 *           ],
 *           "dimension": "category"
 *         }
 *       ],
 *       "values": [
 *         "latlon"
 *       ],
 *       "pageSize": 10,
 *       "criteria": [
 *         {
 *           "id": "vehicles/automobiles/cars",
 *           "dimension": "category"
 *         }
 *       ]
 *     },
 *     "response": {
 *       "exactMatches": [
 *         true,
 *         true,
 *         true,
 *         true,
 *         true,
 *         true,
 *         true,
 *         true,
 *         true,
 *         true
 *       ],
 *       "pageSize": 10,
 *       "itemIds": [
 *         "1299123372",
 *         "1379973264",
 *         "1379992904",
 *         "1380507219",
 *         "1380521004",
 *         "1380521054",
 *         "1380542517",
 *         "1380757566",
 *         "1380942965",
 *         "1381018779"
 *       ],
 *       "exactSize": 424,
 *       "datasetSize": 3626,
 *       "relevanceValues": [
 *         1,
 *         1,
 *         1,
 *         1,
 *         1,
 *         1,
 *         1,
 *         1,
 *         1,
 *         1
 *       ],
 *       "startIndex": 0,
 *       "totalSize": 1110,
 *       "currentPageSize": 10,
 *       "availableSize": 1110,
 *       "values": {
 *         "latlon": [
 *           "40.7779007,-73.9634018",
 *           "40.446701000000004,-74.4889984",
 *           "40.760299700000004,-74.0509033",
 *           "40.8624992,-74.0747986",
 *           "40.7631989,-73.8672028",
 *           "40.7631989,-73.8672028",
 *           "40.7481995,-73.9325027",
 *           "40.7392998,-73.8896027",
 *           "40.7522011,-73.97419739999998",
 *           "40.7779007,-73.9634018"
 *         ]
 *       },
 *       "drillDown": [
 *         {
 *           "exactCounts": [
 *             424,
 *             48,
 *             429,
 *             68,
 *             56
 *           ],
 *           "fuzzyCounts": [
 *             424,
 *             48,
 *             429,
 *             68,
 *             56
 *           ],
 *           "dimension": "category",
 *           "ids": [
 *             "vehicles/automobiles/cars",
 *             "vehicles/automobiles/motorcycles",
 *             "vehicles/automobiles/suvs",
 *             "vehicles/automobiles/trucks",
 *             "vehicles/automobiles/vans"
 *           ]
 *         }
 *       ]
 *     }
 *   }
 * }
 *</pre>
 * @name t11e.widget.jquery.ResponseWidget
 * @class Debug widget for displaying search results.
 */
t11e.widget.jquery.ResponseWidget = function ($) {
    var options = t11e.widget_options[$(this).attr('t11e-widget-id')];
    var search_group = options.search_group;
    var base_url = options.base_url;
    var target = $(this).find(".response:first");
    var update_from_error = function (title, error) {
        target.html('<div id="error">' +
                '<div id="title">' + title + '</div>' +
                '<div id="message">' + error.status + ' ' + error.statusText + '</div>' +
                '<div id="errorText">' + error.responseText + '</div>' +
                '</div>');
    };
    t11e.event.subscribe('response_error.' + search_group, function (error) {
        update_from_error('Problem performing search.', error);
    });
    var update_from_response = function (response) {
        target.html('<pre style="overflow:scroll;">' + JSON.stringify(response, null, '  ') + '</pre>');
    };
    t11e.event.subscribe('response.' + search_group, update_from_response);
};

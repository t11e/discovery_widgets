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
 *   "_discovery": {
 *     "response": {
 *       "availableSize": 9,
 *       "currentPageSize": 4,
 *       "datasetSize": 9,
 *       "drillDown": [
 *         {
 *           "dimension": "shape",
 *           "exactCounts": [3, 3, 3],
 *           "fuzzyCounts": [3, 3, 3],
 *           "ids": ["square", "circle", "triangle"]
 *         }
 *       ],
 *       "exactMatches": [true, true, true, false],
 *       "exactSize": 3,
 *       "itemIds": ["CheapHeavyCircle", "CheapLightCircle", "LightCircle", "CheapTriangle"],
 *       "pageSize": 4,
 *       "relevanceValues": [1, 1, 1, 0],
 *       "renderParameters": "startIndex=0&pageSize=4&exactSize=3&totalSize=9&itemIds=CheapHeavyCircle+CheapLightCircle+LightCircle+CheapTriangle&exactMatches=1110",
 *       "startIndex": 0,
 *       "totalSize": 9
 *     }
 *   }
 * }
 *</pre>
 *
 * @name t11e.widget.jquery.ResponseWidget
 * @class Debug widget for displaying search results.
 */
t11e.widget.jquery.ResponseWidget = function ($, options) {
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

t11e.widget.jquery.make_jquery_ui_widget(jQuery,
    't11e_response', t11e.widget.jquery.ResponseWidget);

/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview jQuery.ui.t11e_response definition
 */

t11e.util.define_namespace('t11e.widget.jquery');
if (false) {
    t11e.widget.jquery.prototype.Eclipse__Outline__Hack = undefined;
}

/**
 * Debug widget that displays the search response as JSON.
 *
 * <h2>Options</h2>
 * <dl>
 *   <dt>search_group</dt>
 *   <dd>The search group from which this widget displays the response.</dd>
 * <dl>
 *
 * <h2>Example</h2>
 * <div class="t11e-widget-example"><!--
 *   <div id="example" class="t11e-widget t11e-widget-jquery-response">
 *     <div class="t11e-hd t11e-widget-jquery-response-hd"></div>
 *     <div class="t11e-bd t11e-widget-jquery-response-bd">
 *       <div class="response"></div>
 *     </div>
 *     <div class="t11e-ft t11e-widget-jquery-response-ft"></div>
 *   </div>
 *   <script type="text/javascript">
 *      $("#example").t11e_response({
 *        "search_group": "default"
 *      });
 *   </script>
 * --></div>
 *
 * Also available as t11e.widget.jquery.ResponseWidget.
 *
 * @name jQuery.ui.t11e_response
 * @class Debug widget for displaying search results.
 */
t11e.widget.jquery.ResponseWidget = function ($, options) {
    var search_group = options.search_group;
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

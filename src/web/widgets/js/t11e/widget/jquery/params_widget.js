/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview jQuery.ui.t11e_params definition
 */

t11e.util.define_namespace('t11e.widget.jquery');
if (false) {
    t11e.widget.jquery.prototype.Eclipse__Outline__Hack = undefined;
}

/**
 * Display search parameters for individual search group.
 *
 * <h2>Options</h2>
 * <dl>
 *   <dt>search_group</dt>
 *   <dd>The search group from which this widget displays the params.</dd>
 * <dl>
 *
 * <h2>Example</h2>
 * <div class="t11e-widget-example"><!--
 *   <div id="example" class="t11e-widget t11e-widget-jquery-params">
 *     <div class="t11e-hd t11e-widget-jquery-params-hd"></div>
 *     <div class="t11e-bd t11e-widget-jquery-params-bd">
 *       <div class="t11e-params"/>
 *     </div>
 *     <div class="t11e-ft t11e-widget-jquery-params-ft"></div>
 *   </div>
 *   <script type="text/javascript">
 *     $("#example").t11e_params({
 *       "search_group": "history"
 *     });
 *     // For example purposes only, change the hash to create some
 *     // parameters.
 *     window.location.hash = "&a=example%20param&b=another%20one";
 *   </script>
 * --><div>
 *
 * Also available as t11e.widget.jquery.ParamsWidget.
 *
 * @name jQuery.ui.t11e_params
 * @class Debug widget for displaying the current search parameters by search_group
 */
t11e.widget.jquery.ParamsWidget = function ($, options) {
    var search_group = options.search_group;
    var target = $(this).find(".t11e-params:first");

    var load_from_params = function (params) {
        target.html('<pre style="overflow:scroll;">' + JSON.stringify(params, null, '  ') + '</pre>');
    };
    t11e.event.subscribe('request.' + search_group, load_from_params);

};

t11e.widget.jquery.make_jquery_ui_widget(jQuery,
    't11e_params', t11e.widget.jquery.ParamsWidget);

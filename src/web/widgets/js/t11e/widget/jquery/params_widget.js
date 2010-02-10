/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview t11e.widget.jquery.ParamsWidget definition
 */

t11e.util.define_namespace('t11e.widget.jquery');
if (false) {
    t11e.widget.jquery.prototype.Eclipse__Outline__Hack = undefined;
}

/**
 * Display search parameters for individual search group.
 *
 * @name t11e.widget.jquery.ParamsWidget
 * @class Debug widget for displaying the current search parameters by search_group
 */
t11e.widget.jquery.ParamsWidget = function ($) {
    var options = t11e.widget_options[$(this).attr('t11e-widget-id')];
    var search_group = options.search_group;
    var target = $(this).find(".params:first");

    var load_from_params = function (params) {
        target.html('<pre style="overflow:scroll;">' + JSON.stringify(params, null, '  ') + '</pre>');
    };
    t11e.event.subscribe('request.' + search_group, load_from_params);
};

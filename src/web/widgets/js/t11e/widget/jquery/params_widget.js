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

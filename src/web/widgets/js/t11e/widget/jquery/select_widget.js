/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview t11e.widget.jquery.SelectWidget definition
 *
 */

t11e.util.define_namespace('t11e.widget.jquery');
if (false) {
    t11e.widget.jquery.prototype.Eclipse__Outline__Hack = undefined;
}

/**
 * <p>TODO</p>
 *
 * <h2>Options</h2>
 *
 * <dl>
 *    <dt>css_class</dt>
 *    <dd>An option CSS class to be applied to this widget instance to facilitate custom styling.</dd>
 *
 *    <dt>search_group</dt>
 *    <dd>The search group</dd>
 *
 *    <dt>value_param</dt>
 *    <dd>The search group parameter this widget listens to.</dd>
 * </dl>
 * <h2>Example</h2>
 *
 * @name t11e.widget.jquery.SelectWidget
 * @class A select widget.
 *
 * */
t11e.widget.jquery.SelectWidget = function ($) {
    var options = t11e.widget_options[$(this).attr('t11e-widget-id')];
    var search_group = options.search_group;
    var value_param = options.value_param;
    var dimension = options.dimension;
    var select = $(this).find('form select');
    var select_options = $(this).find('form select option');

    var ignore_event = false;
    /**
     * Update the widget's current state from the params object. This
     * function is used as a callback to the <code>request</code> topic.
     * @param {Object} params
     */
    var load_from_params = function (/**Object*/params) {
        var values = params[value_param];
        if (t11e.util.is_undefined(values)) {
            values = [];
        }
        ignore_event = true;
        try {
            select_options.each(function (i, option) {
                var selected = (-1 !== $.inArray(option.value, values));
                if (option.selected !== selected) {
                    option.selected = selected;
                }
            });
        } finally {
            ignore_event = false;
        }
    };
    /**
    * Subscribe to the request topic.
    */
    t11e.event.subscribe('request.' + search_group, load_from_params);
    /**
     * @function
     * @description Adds a facet to the search request parameters
     * @param {Object} params
     * @param {String} facet_id
     * @returns {Boolean}
     *     Returns <code>true</code> if the search params have changed.
     */
    var add_facet_to_params = function (params, facet_id) {
        var changed = false;
        if (t11e.util.is_defined(facet_id) &&
            '' !== facet_id) {
            var values = params[value_param];
            if (t11e.util.is_undefined(values)) {
                params[value_param] = [facet_id];
                changed = true;
            }
            else if (-1 === $.inArray(facet_id, values)) {
                values.push(facet_id);
                changed = true;
            }
        }
        return changed;
    };
    /**
     * @function
     * @description Removes a facet from the search request parameters
     * @param {Object} params
     * @param {String} facet_id
     * @returns {Boolean}
     *     Returns <code>true</code> if a facet was removed from the
     *     search params.
     */
    var remove_facet_from_params = function (params, facet_id) {
        var changed = false;
        var values = params[value_param];
        if (t11e.util.is_defined(values)) {
            var old_length = values.length;
            params[value_param] = $.grep(values, function (v, i) {
                return v !== facet_id;
            });
            changed = old_length !== params[value_param].length;
        }
        return changed;
    };
    /**
     * Update the search request parameters.
     *
     * @param {Object} event
     */
    var option_changed = function (event) {
        if (!ignore_event) {
            var changed = false;
            t11e.event.trigger('update_request.' + search_group, function (params) {
                select_options.each(function (i, option) {
                    if (option.selected) {
                        changed = add_facet_to_params(params, option.value) || changed;
                    } else {
                        changed = remove_facet_from_params(params, option.value) || changed;
                    }
                });
                if (changed) {
                    t11e.util.remove_param(params, options.page_param);
                }
            });
        }
    };

    $(select).bind('change', option_changed);

    /**
     * Clear all the widget's options. This
     * function is used as a callback to the <code>clear_params_from_search</code> topic.
     * @param {Object} params
     */
    var clear_params_from_search = function (params) {
        t11e.widget.jquery.util.remove_checkbox_values_from_params($, select_options, params, value_param);
    };
    t11e.event.subscribe('clear_params_from_search.' + search_group, clear_params_from_search);
};


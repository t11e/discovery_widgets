/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview t11e.widget.jquery.FacetedCheckboxesWidget definition
 *
 * <p>{@link t11e.widget.jquery.FacetedCheckboxesWidget} provides a faceted
 * search interface of either checkboxes or radio buttons.</p>
 */

t11e.util.define_namespace('t11e.widget.jquery');
if (false) {
    t11e.widget.jquery.prototype.Eclipse__Outline__Hack = undefined;
}

/**
 * <p>Widget that displays faceted checkboxes which allow selection of
 * facets to alter the search and display the facet counts from the
 * response.</p>
 *
 * <h2>Options</h2>
 *
 *<dl>
 *    <dt>css_class</dt>
 *    <dd>An option CSS class to be applied to this widget instance to facilitate custom styling.</dd>
 *
 *    <dt>search_group</dt>
 *    <dd>The search group</dd>
 *
 *    <dt>value_param</dt>
 *    <dd>The search group parameter this widget listens to.</dd>
 *
 *    <dt>dimension</dt>
 *    <dd>The dimension (index) used for updating drilldown counts.</dd>

 * <h2>Sample HTML</h2>
 * <pre class="brush: html">
 * * &lt;div class=&quot;t11e-widget t11e-widget-jquery-faceted-checkboxes t11e-widget-id-2078&quot;&gt;
 *  &lt;div class=&quot;t11e-hd t11e-widget-jquery-faceted-checkboxes-hd&quot;&gt;&lt;/div&gt;
 *  &lt;div class=&quot;t11e-bd t11e-widget-jquery-faceted-checkboxes-bd&quot;&gt;
 *      &lt;form action=&quot;&quot;&gt;
 *          &lt;div class=&quot;row&quot;&gt;
 *              &lt;input type=&quot;checkbox&quot; name=&quot;c&quot; value=&quot;vehicles/automobiles/cars&quot;&gt;
 *              &lt;label&gt;Cars&lt;/label&gt; &amp;nbsp;&amp;nbsp;&lt;span class=&quot;facet-count&quot;&gt;0&lt;/span&gt;
 *          &lt;/div&gt;
 *          &lt;div class=&quot;row&quot;&gt;
 *              &lt;input type=&quot;checkbox&quot; name=&quot;c&quot; value=&quot;vehicles/automobiles/motorcycles&quot;&gt;
 *              &lt;label&gt;Motorcycles&lt;/label&gt; &amp;nbsp;&amp;nbsp;&lt;span class=&quot;facet-count&quot;&gt;0&lt;/span&gt;
 *          &lt;/div&gt;
 *          &lt;div class=&quot;row&quot;&gt;
 *              &lt;input type=&quot;checkbox&quot; name=&quot;c&quot; value=&quot;vehicles/automobiles/suvs&quot;&gt;
 *              &lt;label&gt;SUV&lt;/label&gt; &amp;nbsp;&amp;nbsp;&lt;span class=&quot;facet-count&quot;&gt;0&lt;/span&gt;
 *          &lt;/div&gt;
 *          &lt;div class=&quot;row&quot;&gt;
 *              &lt;input type=&quot;checkbox&quot; name=&quot;c&quot; value=&quot;vehicles/automobiles/trucks&quot;&gt;
 *              &lt;label&gt;Trucks&lt;/label&gt; &amp;nbsp;&amp;nbsp;&lt;span class=&quot;facet-count&quot;&gt;0&lt;/span&gt;
 *          &lt;/div&gt;
 *          &lt;div class=&quot;row&quot;&gt;
 *              &lt;input type=&quot;checkbox&quot; name=&quot;c&quot; value=&quot;vehicles/automobiles/vans&quot;&gt;
 *              &lt;label&gt;Vans&lt;/label&gt; &amp;nbsp;&amp;nbsp;&lt;span class=&quot;facet-count&quot;&gt;0&lt;/span&gt;
 *          &lt;/div&gt;
 *      &lt;/form&gt;
 *  &lt;/div&gt;
 *  &lt;div class=&quot;t11e-ft t11e-widget-jquery-faceted-checkboxes-ft&quot;&gt;&lt;/div&gt;
 * &lt;/div&gt;
 * &lt;script type=&quot;text/javascript&quot;&gt;
 *  //&lt;!--
 *      if (&#x27;undefined&#x27; === typeof t11e) {
 *          t11e = {};
 *      }
 *      if (&#x27;undefined&#x27; === typeof t11e.widget_options) {
 *          t11e.widget_options = {};
 *      }
 *      t11e.widget_options[&#x27;2078&#x27;] = {
 *          &quot;value_param&quot;: &quot;c&quot;,
 *          &quot;page_param&quot;: null,
 *          &quot;search_group&quot;: &quot;vehicle&quot;,
 *          &quot;dimension&quot;: &quot;category&quot;
 *          }
 *      };
 *  //--&gt;
 * &lt;/script&gt;
 *</pre>
 * @name t11e.widget.jquery.FacetedCheckboxesWidget
 * @class A checkbox widget that displays facet counts.
 *
 * */
t11e.widget.jquery.FacetedCheckboxesWidget = function ($) {
    var options = t11e.widget_options[$(this).attr('t11e-widget-id')];
    var search_group = options.search_group;
    var value_param = options.value_param;
    var dimension = options.dimension;
    var settings = options.settings;
    var checkboxes = $(this).find('form div.row input');

    var ignore_event = false;
    /** @scope t11e.widget.jquery.FacetedCheckboxesWidget */
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
            checkboxes.each(function (i, checkbox) {
                var selected = (-1 !== $.inArray(checkbox.value, values));
                if (checkbox.checked !== selected) {
                    checkbox.checked = selected;
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
        var values = params[value_param];
        if (t11e.util.is_undefined(values)) {
            params[value_param] = [facet_id];
            changed = true;
        } else if (-1 === $.inArray(facet_id, values)) {
            values.push(facet_id);
            changed = true;
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
     * Update the search request parameters and the breadcrumbs when
     * a checkbox or radio button is clicked.
     *
     * <h2>Triggers:</h2>
     * <ul>
     * <li>update_request</li>
     * </ul>
     *
     * @param {Object} event
     */
    var checkbox_clicked = function (event) {
        if (!ignore_event) {
            var changed = false;
            t11e.event.trigger('update_request.' + search_group, function (params) {
                checkboxes.each(function (i, checkbox) {
                    if (checkbox.checked) {
                        changed = add_facet_to_params(params, checkbox.value) || changed;
                    } else {
                        changed = remove_facet_from_params(params, checkbox.value) || changed;
                    }
                });
                if (changed) {
                    t11e.util.remove_param(params, options.page_param);
                }
            });
        }
    };

    checkboxes.each(function (i, checkbox) {
        $(checkbox).bind('click', checkbox_clicked);
    });

    if (t11e.util.is_defined(dimension)) {
        /**
        * @function
        * @description
        *     Update the widget's drilldown counts from the search response object.
        *     This function is used as a callback to the <code>response</code> topic.
        * @param {Object} search The search response object.
        */
        var update_from_response = function (search) {
            var facet_counts =
                t11e.widget.jquery.util.get_dimension_drilldown($, search, dimension);

            checkboxes.each(function (i, checkbox) {
                var count = facet_counts[checkbox.value];
                if (t11e.util.is_undefined(count)) {
                    count = 0;
                }
                $(checkbox).find('~span.facet-count').each(function (i, span) {
                    $(span).html(count);
                });
            });
        };
        /**
         * Subscribe to the response topic.
         * @param {String} response.search_group
         * @param {Function} callback
         */
        t11e.event.subscribe('response.' + search_group, update_from_response);
    }

    $(this).find('form div.row').each(function (i, row) {
        t11e.widget.jquery.util.associate_labels($, row);
    });

    /** @scope t11e.widget.jquery.FacetedCheckboxesWidget */
    /**
     * Clear all the widget's checkboxes. This
     * function is used as a callback to the <code>clear_params_from_search</code> topic.
     * @param {Object} params
     */
    var clear_params_from_search = function (params) {
        t11e.widget.jquery.util.remove_checkbox_values_from_params($, checkboxes, params, value_param);
    };
    t11e.event.subscribe('clear_params_from_search.' + search_group, clear_params_from_search);
};


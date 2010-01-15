/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview t11e.widget.jquery.FacetedFlyoutWidget definition
 * <p>{@link t11e.widget.jquery.FacetedFlyoutWidget} provides a faceted
 * search interface of either checkboxes or radio buttons that includes a
 * flyout panel to display additional choices.</p>
 * @copyright Transparensee Systems, Inc.
 */

/**
 * A widget with the same functionality as {@link t11e.widget.jquery.FacetedCheckboxesWidget}
 * that also contains a flyout panel.
 *
 * <h2>Options</h2>
 *
 *<dl>
 *    <dt>css_class</dt>
 *    <dd>An optional CSS class to be applied to this widget instance to facilitate custom styling.</dd>
 *
 *    <dt>search_group</dt>
 *    <dd>The search group.</dd>
 *
 *    <dt>value_param</dt>
 *    <dd>The search group parameter this widget listens to.</dd>
 *
 *    <dt>dimension</dt>
 *    <dd>The dimension (index) used for updating drilldown counts.</dd>
 *
 *    <dt>primary_settings</dt>
 *    <dd>The primary list of items that are always displayed.</dd>
 *
 *    <dt>secondary_settings</dt>
 *    <dd>The secondary list of items that are displayed in the flyout panel</dd>
 *
 *    <dt>flyout_panel_width</dt>
 *    <dd>The width, in pixels, of the flyout panel</dd>
 *
 *    <dt>column_count</dt>
 *    <dd>The number of columns to be used in the flyout panel</dd>
 *</dl>
 * <h2>Sample HTML</h2>
 *<pre class="brush: html">
 * &lt;div class=&quot;t11e-widget t11e-widget-jquery-faceted-flyout t11e-widget-id-2077&quot;&gt;
 *  &lt;div class=&quot;t11e-hd t11e-widget-jquery-faceted-flyout-hd&quot;&gt;&lt;/div&gt;
 *  &lt;div class=&quot;t11e-bd t11e-widget-jquery-faceted-flyout-bd&quot;&gt;
 *      &lt;div class=&quot;breadcrumb&quot;&gt;&lt;/div&gt;
 *      &lt;form action=&quot;&quot;&gt;
 *          &lt;fieldset class=&quot;t11e-widget-jquery-faceted-flyout-primary&quot;&gt;
 *              &lt;div class=&quot;row&quot;&gt;
 *                  &lt;input type=&quot;checkbox&quot; name=&quot;c&quot; value=&quot;vehicles/automobiles/cars&quot;&gt;
 *                  &lt;label&gt;Cars&lt;/label&gt; &amp;nbsp;&amp;nbsp;&lt;span class=&quot;facet-count&quot;&gt;0&lt;/span&gt;
 *              &lt;/div&gt;
 *              &lt;div class=&quot;row&quot;&gt;
 *                  &lt;input type=&quot;checkbox&quot; name=&quot;c&quot; value=&quot;vehicles/automobiles/motorcycles&quot;&gt;
 *                  &lt;label&gt;Motorcycles&lt;/label&gt; &amp;nbsp;&amp;nbsp;&lt;span class=&quot;facet-count&quot;&gt;0&lt;/span&gt;
 *              &lt;/div&gt;
 *              &lt;div class=&quot;row&quot;&gt;
 *                  &lt;input type=&quot;checkbox&quot; name=&quot;c&quot; value=&quot;vehicles/automobiles/suvs&quot;&gt;
 *                  &lt;label&gt;SUV&lt;/label&gt; &amp;nbsp;&amp;nbsp;&lt;span class=&quot;facet-count&quot;&gt;0&lt;/span&gt;
 *              &lt;/div&gt;
 *          &lt;/fieldset&gt;
 *          &lt;fieldset class=&quot;t11e-widget-jquery-faceted-flyout-secondary&quot;&gt;
 *              &lt;div class=&quot;flyout-panel&quot;&gt;
 *                  &lt;div class=&quot;close-flyout-panel&quot;&gt;
 *                      [x]
 *                  &lt;/div&gt;
 *                  &lt;div class=&quot;row&quot;&gt;
 *                      &lt;input type=&quot;checkbox&quot; name=&quot;c&quot; value=&quot;vehicles/automobiles/trucks&quot;&gt;
 *                      &lt;label&gt;Trucks&lt;/label&gt; &amp;nbsp;&amp;nbsp;&lt;span class=&quot;facet-count&quot;&gt;0&lt;/span&gt;
 *                  &lt;/div&gt;
 *                  &lt;div class=&quot;row&quot;&gt;
 *                      &lt;input type=&quot;checkbox&quot; name=&quot;c&quot; value=&quot;vehicles/automobiles/vans&quot;&gt;
 *                      &lt;label&gt;Vans&lt;/label&gt; &amp;nbsp;&amp;nbsp;&lt;span class=&quot;facet-count&quot;&gt;0&lt;/span&gt;
 *                  &lt;/div&gt;
 *              &lt;/div&gt;
 *          &lt;/fieldset&gt;
 *          &lt;div class=&quot;toggle-flyout&quot;&gt;
 *              More...
 *          &lt;/div&gt;
 *      &lt;/form&gt;
 *  &lt;/div&gt;
 *  &lt;div class=&quot;t11e-ft t11e-widget-jquery-faceted-flyout-ft&quot;&gt;&lt;/div&gt;
 * &lt;/div&gt;&lt;script type=&quot;text/javascript&quot;&gt;
 *  //&lt;!--
 *      if (&#x27;undefined&#x27; === typeof t11e) {
 *          t11e = {};
 *      }
 *      if (&#x27;undefined&#x27; === typeof t11e.widget_options) {
 *          t11e.widget_options = {};
 *      }
 *      t11e.widget_options[&#x27;2077&#x27;] = {
 *          &quot;flyout_panel_width&quot;: 250,
 *          &quot;value_param&quot;: &quot;c&quot;,
 *          &quot;page_param&quot;: null,
 *          &quot;primary_settings&quot;: {
 *              &quot;checkboxes&quot;: [{
 *                  &quot;id&quot;: &quot;vehicles/automobiles/cars&quot;,
 *                  &quot;label&quot;: &quot;Cars&quot;
 *              },
 *              {
 *                  &quot;id&quot;: &quot;vehicles/automobiles/motorcycles&quot;,
 *                  &quot;label&quot;: &quot;Motorcycles&quot;
 *              },
 *              {
 *                  &quot;id&quot;: &quot;vehicles/automobiles/suvs&quot;,
 *                  &quot;label&quot;: &quot;SUV&quot;
 *              }]
 *          },
 *          &quot;search_group&quot;: &quot;vehicle&quot;,
 *          &quot;secondary_settings&quot;: {
 *              &quot;checkboxes&quot;: [{
 *                  &quot;id&quot;: &quot;vehicles/automobiles/trucks&quot;,
 *                  &quot;label&quot;: &quot;Trucks&quot;
 *              },
 *              {
 *                  &quot;id&quot;: &quot;vehicles/automobiles/vans&quot;,
 *                  &quot;label&quot;: &quot;Vans&quot;
 *              }]
 *          },
 *          &quot;dimension&quot;: &quot;category&quot;,
 *          &quot;column_count&quot;: 2
 *      };
 *  //--&gt;
 * &lt;/script&gt; *</pre>
 * @name t11e.widget.jquery.FacetedFlyoutWidget
 * @class A checkbox widget that contains a flyout panel for additional options.
 *
 */
t11e.util.declare('t11e.widget.jquery.FacetedFlyoutWidget', function ($) {
    /**
     * Widget that displays faceted checkboxes which allow selection of
     * facets to alter the search and display the facet counts from the
     * response.
     */
    var options = t11e.widget_options[$(this).attr('t11e-widget-id')];
    var search_group = options.search_group;
    var value_param = options.value_param;
    var dimension = options.dimension;
    var checkboxes = $(this).find('form div.row input');

    var toggle_flyout_button = $(this).find('div.toggle-flyout:first');
    var container = $(this).find('div.t11e-widget-jquery-faceted-flyout-bd > form:first');
    var breadcrumb = $(this).find('.breadcrumb:first');
    var primary = $(this).find('.t11e-widget-jquery-faceted-flyout-primary:first');
    var secondary = $(this).find('.t11e-widget-jquery-faceted-flyout-secondary:first');
    var flyout_panel = secondary.find('div:first');
    var close_flyout_panel = flyout_panel.find('div.close-flyout-panel');
    var primary_values = $.map(primary.find('div.row input'), function (n) {
        return $(n).attr('value');
    });

    // Fix ie 6 bug
    if (t11e.util.is_defined($.bgiframe)) {
        flyout_panel.bgiframe();
    }

    var ignore_event = false;
    /** @scope t11e.widget.jquery.FacetedFlyoutWidget */
    /**
     * Update the widget's current state from the params object. This
     * function is used as a callback to the <code>request</code> topic.
     * @param {Object} params
     */
    var load_from_params = function (params) {
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

                if (-1 === $.inArray(checkbox.value, primary_values)) {
                    if (checkbox.checked === true) {
                        add_breadcrumb(checkbox);
                    } else {
                        remove_breadcrumb(checkbox);
                    }
                }
            });
        } finally {
            ignore_event = false;
        }
    };
    t11e.event.subscribe('request.' + search_group, load_from_params);

    /** @scope t11e.widget.jquery.FacetedFlyoutWidget */
    /**
     * Clear all the widget's checkboxes. This
     * function is used as a callback to the <code>clear_params_from_search</code> topic.
     * @param {Object} params
     */
    var clear_params_from_search = function (params) {
        t11e.widget.jquery.util.remove_checkboxe_values_from_params($, checkboxes, params, value_param);
    };
    t11e.event.subscribe('clear_params_from_search.' + search_group, clear_params_from_search);

    /**
     * @function
     * @description Adds a facet to the search request parameters
     * @param {Object} params
     * @param {String} facet_id
     * @returns {Boolean}
     *     Returns <code>true</code> if a facet was removed from the
     *     search params.
     */
    var add_facet_to_params = function (params, facet_id) {
        var values = params[value_param];
        if (t11e.util.is_undefined(values)) {
            params[value_param] = [facet_id];
        } else if (-1 === $.inArray(facet_id, values)) {
            values.push(facet_id);
        }
    };
    /**
     * Update the search request parameters and the breadcrumbs when
     * a checkbox or radio button is clicked.
     *
     * @param {Object} event
     */
    var remove_facet_from_params = function (params, facet_id) {
        var values = params[value_param];
        if (t11e.util.is_defined(values)) {
            params[value_param] = $.grep(values, function (v, i) {
                return v !== facet_id;
            });
        }
    };
    /**
     * Update the search request parameters when
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
        var input = this;
        if (!ignore_event) {
            t11e.event.trigger('update_request.' + search_group, function (params) {
                if (input.checked) {
                    add_facet_to_params(params, input.value);
                } else {
                    remove_facet_from_params(params, input.value);
                }
                t11e.util.remove_param(params, options.page_param);
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
            var facet_counts = {};
            var found = false;
            var drillDown = t11e.util.deref(search, '_discovery.response.drillDown');
            if (t11e.util.is_defined(drillDown)) {
                $(drillDown).each(function (i, criterion) {
                    if (!found && dimension === criterion.dimension) {
                        found = true;
                        var ids = criterion.ids;
                        var counts = criterion.exactCounts;
                        var j;
                        for (j = 0; j < ids.length && j < counts.length; j++) {
                            var id = ids[j];
                            var count = counts[j];
                            facet_counts[id] = count;
                        }
                    }
                });
            }
            checkboxes.each(function (i, checkbox) {
                // Updated drillDown counts
                var count = facet_counts[checkbox.value];
                if (t11e.util.is_undefined(count)) {
                    count = 0;
                }
                $(checkbox).find('~span.facet-count').each(function (i, span) {
                    $(span).html(count);
                });
            });
        };
        t11e.event.subscribe('response.' + search_group, update_from_response);
    }

    $(this).find('form div.row').each(function (i, row) {
        t11e.widget.jquery.util.associate_labels($, row);
    });

    var init = function () {
        // Initialize the flyout panel
        var flyout_left = breadcrumb.offset().left;
        var flyout_top = breadcrumb.offset().top;
        if (t11e.util.is_defined(secondary)) {
            secondary.appendTo('body');
            secondary.css({
                position: 'absolute',
                top: flyout_top,
                left: flyout_left
            });
            if ('undefined' !== options.column_width) {
                secondary.find('div.row').each(function (i) {
                    $(this).css({
                        width: options.column_width
                    });
                });
            }

            if (t11e.util.is_defined(flyout_panel) && t11e.util.is_defined(options.flyout_panel_width)) {
                flyout_panel.css({
                    width: options.flyout_panel_width
                });
            }

            layout_flyout_panel_into_columns();
        }

        if (t11e.util.is_defined(close_flyout_panel)) {
            close_flyout_panel.bind('click', function (event) {
                hide_flyout();
            });
        }
    };

    var layout_flyout_panel_into_columns = function () {
        var num_secondary = secondary.find('div.row input').size();
        if (num_secondary > 1 && Number(options.column_count) > 1) {
            var num_per_column = Math.ceil(num_secondary / options.column_count);
            var table = $('<table><tbody><tr></tr></tbody></table>');
            var tr = table.find('tr:first');
            var tds = [];
            tds.length = options.column_count;
            $.each(tds, function (i, td) {
                tds[i] = $('<td></td>');
                tds[i].appendTo(tr);
            });

            flyout_panel.find('div.row').each(function (i) {
                var current_column = Math.min(Math.floor(i / num_per_column), tds.length - 1);
                $(this).appendTo(tds[current_column]);
            });
            table.appendTo(flyout_panel);
        }
    };

    var add_breadcrumb = function (checkbox) {
        var crumb = breadcrumb.find('span[facet_id=' + checkbox.value + ']');
        if (crumb.size() === 0) {
            var crumb_label = $(checkbox).parent().find('label').html();
            crumb = $('<span class="' + crumb_label + '" facet_id="' +
                checkbox.value + '">' + crumb_label +
                ' [<a href="#" class="close">x</a>] </span> ').appendTo(breadcrumb);
            var crumb_anchor = crumb.find('a:first');
            crumb_anchor.bind('click', function () {
                var facet_id = $(this).parent().attr('facet_id');
                t11e.event.trigger('update_request.' + search_group, function (params) {
                    remove_facet_from_params(params, facet_id);
                    t11e.util.remove_param(params, options.page_param);
                });
                t11e.event.trigger('perform_search');
                return false;
            });
        }
    };

    var remove_breadcrumb = function (checkbox) {
        breadcrumb.find('span[facet_id=' + checkbox.value + ']').remove();
    };

    var flyout_panel_is_empty = function () {
        return (flyout_panel.children().size() === 0);
    };

    var show_flyout = function () {
        secondary.show('slow');
        toggle_flyout_button.html('Hide...');
    };

    var hide_flyout = function () {
        secondary.hide('slow');
        toggle_flyout_button.html('More...');
    };

    var update_toggle_flyout_button_state = function () {
        if (flyout_panel_is_empty() === true) {
            toggle_flyout_button.addClass('t11e-state-disabled');
            hide_flyout();
        } else {
            toggle_flyout_button.removeClass('t11e-state-disabled');
        }
    };

    toggle_flyout_button.bind('click', function (event) {
        if (toggle_flyout_button.hasClass('t11e-state-disabled') !== true) {
            if (toggle_flyout_button.html() === 'Hide...') {
                hide_flyout();
            } else {
                show_flyout();
            }
            update_toggle_flyout_button_state();
        }
    });

    init();
});

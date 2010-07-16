/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview jQuery.ui.t11e_faceted_flyout definition
 * <p>
 * Provides a faceted search interface of either checkboxes or radio buttons
 * that includes a flyout panel to display additional choices.
 */

t11e.util.define_namespace('t11e.widget.jquery');
if (false) {
    t11e.widget.jquery.prototype.Eclipse__Outline__Hack = undefined;
}

/**
 * A widget with the same functionality as {@link jQuery.ui.t11e_faceted_checkboxes_widget}
 * that also contains a flyout panel.
 *
 * <h2>Options</h2>
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
 *
 * <h2>Example</h2>
 * <div class="t11e-widget-example"><!--
 *   <div id="example" class="t11e-widget t11e-widget-jquery-faceted-flyout">
 *     <div class="t11e-hd t11e-widget-jquery-faceted-flyout-hd"></div>
 *     <div class="t11e-bd t11e-widget-jquery-faceted-flyout-bd">
 *       <div class="breadcrumb"></div>
 *         <form action="">
 *           <fieldset class="t11e-widget-jquery-faceted-flyout-primary">
 *             <div class="row">
 *               <input type="checkbox" name="c" value="cars">
 *               <label>Cars</label><span class="facet-count">0</span>
 *             </div>
 *             <div class="row">
 *               <input type="checkbox" name="c" value="motorcycles">
 *               <label>Motorcycles</label><span class="facet-count">0</span>
 *             </div>
 *           </fieldset>
 *           <fieldset class="t11e-widget-jquery-faceted-flyout-secondary">
 *             <div class="flyout-panel">
 *               <div class="close-flyout-panel">[x]</div>
 *               <div class="row">
 *                 <input type="checkbox" name="c" value="suvs">
 *                 <label>SUV</label><span class="facet-count">0</span>
 *               </div>
 *               <div class="row">
 *                 <input type="checkbox" name="c" value="trucks">
 *                 <label>Trucks</label><span class="facet-count">0</span>
 *               </div>
 *               <div class="row">
 *                 <input type="checkbox" name="c" value="vans">
 *                 <label>Vans</label><span class="facet-count">0</span>
 *               </div>
 *             </div>
 *           </fieldset>
 *           <div class="toggle-flyout">More...</div>
 *         </form>
 *       </div>
 *     <div class="t11e-ft t11e-widget-jquery-faceted-flyout-ft"></div>
 *   </div>
 *   <script type="text/javascript">
 *     $("#example").t11e_faceted_flyout({
 *       "search_group": "default",
 *       "value_param": "c",
 *       "dimension": "category",
 *       "column_count": 2,
 *       "flyout_panel_width": 250
 *     });
 *   </script>
 * --></div>
 *
 * Also available as t11e.widget.jquery.FacetedFlyoutWidget.
 *
 * @name jQuery.ui.t11e_faceted_flyout
 * @class A checkbox widget that contains a flyout panel for additional options.
 *
 */
t11e.widget.jquery.FacetedFlyoutWidget = function ($, options) {
    /**
     * Widget that displays faceted checkboxes which allow selection of
     * facets to alter the search and display the facet counts from the
     * response.
     */
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
        t11e.widget.jquery.util.remove_checkbox_values_from_params($, checkboxes, params, value_param);
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
            var facet_counts =
                t11e.widget.jquery.util.get_dimension_drilldown($, search, dimension);

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
};

t11e.widget.jquery.make_jquery_ui_widget(jQuery,
    't11e_faceted_flyout', t11e.widget.jquery.FacetedFlyoutWidget);

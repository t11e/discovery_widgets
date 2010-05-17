/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview jquery.ui.t11e_faceted_checkboxes definition
 *
 * <p>Provides a faceted search interface of either checkboxes or radio buttons.</p>
 */

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

 * <h2>Example</h2>
 * <div class="t11e-widget t11e-widget-jquery-faceted-checkboxes t11e-widget-id-cars">
 *  <div class="t11e-hd t11e-widget-jquery-faceted-checkboxes-hd"></div>
 *  <div class="t11e-bd t11e-widget-jquery-faceted-checkboxes-bd">
 *      <form action="">
 *          <div class="row">
 *              <input type="checkbox" name="c" value="vehicles/automobiles/cars">
 *              <label>Cars</label> &nbsp;&nbsp;<span class="facet-count">0</span>
 *          </div>
 *          <div class="row">
 *              <input type="checkbox" name="c" value="vehicles/automobiles/motorcycles">
 *              <label>Motorcycles</label> &nbsp;&nbsp;<span class="facet-count">0</span>
 *          </div>
 *          <div class="row">
 *              <input type="checkbox" name="c" value="vehicles/automobiles/suvs">
 *              <label>SUV</label> &nbsp;&nbsp;<span class="facet-count">0</span>
 *          </div>
 *          <div class="row">
 *              <input type="checkbox" name="c" value="vehicles/automobiles/trucks">
 *              <label>Trucks</label> &nbsp;&nbsp;<span class="facet-count">0</span>
 *          </div>
 *          <div class="row">
 *              <input type="checkbox" name="c" value="vehicles/automobiles/vans">
 *              <label>Vans</label> &nbsp;&nbsp;<span class="facet-count">0</span>
 *          </div>
 *      </form>
 *  </div>
 *  <div class="t11e-ft t11e-widget-jquery-faceted-checkboxes-ft"></div>
 * </div>
 * <script type="text/javascript">
 *  //<!--
 *      if ('undefined' === typeof t11e) { t11e = {}; }
 *      if ('undefined' === typeof t11e.widget_options) { t11e.widget_options = {}; }
 *      t11e.widget_options['cars'] = {
 *          "search_group": "vehicle",
 *          "value_param": "c",
 *          "dimension": "category"
 *      };
 *  //-->
 * </script>
 *
 * @name jQuery.ui.t11e_faceted_checkboxes
 * @class A checkbox widget that displays facet counts.
 *
 * */

(function ($) {
    var options = {
        search_group: 'default',
        value_param: '',
        input_selector: 'form input',
        row_class: 't11e-input-row',
        facet_count_class: 't11e-facet-count'
    };
    $.widget('ui.t11e_faceted_checkboxes', {options: options});
    $.ui.t11e_faceted_checkboxes.defaults = options;

    /*jslint nomen: false */
    $.ui.t11e_faceted_checkboxes.prototype._init = function () {
        var self = this;

        var search_group = self.options.search_group;
        var value_param = self.options.value_param;
        var dimension = self.options.dimension;
        var settings = self.options.settings;
        var checkboxes = self.element.find(self.options.input_selector);

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
                        t11e.util.remove_param(params, self.options.page_param);
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
                    // Find sibling elements
                    $(checkbox).find('~.' + self.options.facet_count_class).each(function (i, span) {
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

        self.element.find('.' + self.options.row_class).each(function (i, row) {
            t11e.widget.jquery.util.associate_labels($, row);
        });

        // Updates checkboxes so that styling can be customized.
        self.element.t11e_styled_checkboxes(self.options);

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
}(jQuery));


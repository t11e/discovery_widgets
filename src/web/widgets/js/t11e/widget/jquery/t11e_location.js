/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview jQuery.ui.t11e_location definition
 */

/**
 * Search widget for geocoding addresses. Wraps t11e_geocode and hooks it into
 * the search event flow. This means that the actual latitude/longitude of
 * the geocoded address can be passed to the search controller.
 *
 * <h2>Options</h2>
 * <dl>
 *    <dt>search_group</dt>
 *    <dd>The search group associated with this widget.</dd>
 *
 *    <dt>page_param</dt>
 *    <dd>Query parameter for the pagination widget associated with this search.</dd>
 *
 *    <dt>value_param</dt>
 *    <dd>Query parameter for the address.</dd>
 *
 *    <dt>latitude_param</dt>
 *    <dd>Query parameter for latitude.</dd>
 *
 *    <dt>longitude_param</dt>
 *    <dd>Query parameter for longitude.</dd>
 *
 *    <dt>input_selector</dt>
 *    <dd>jQuery selector for the input element to use for displaying and entering the address.</dd>
 *
 *    <dt>display_results</dt>
 *    <dd>If true, the latitude and longitude returned by Google is displayed.</dd>
 *
 *    <dt>results_selector</dt>
 *    <dd>jQuery selector for the input element to use for displaying the latitude and longitude results (most useful for testing).</dd>
 *
 *    <dt>error_selector</dt>
 *    <dd>jQuery selector for the element to use to display the error message.</dd>
 *
 *    <dt>error_template</dt>
 *    <dd>String to display when the entered address cannot be geocoded.</dd>
 * </dl>
 *
 * <h2>Example</h2>
 * <script src="http://maps.google.com/maps?file=api&amp;v=2.x&amp;key=" type="text/javascript"></script>
 * <div class="t11e-widget-example"><!--
 *   <div id="example" class="t11e-widget t11e-widget-jquery-location">
 *     <div class="t11e-hd t11e-widget-jquery-location-hd"></div>
 *     <div class="t11e-bd t11e-widget-jquery-location-bd"></div>
 *     <div class="t11e-ft t11e-widget-jquery-location-ft"></div>
 *   </div>
 *   <script type="text/javascript">
 *     $("#example").t11e_location({
 *       "search_group": "default",
 *       "value_param": "location",
 *       "latitude_param": "lat",
 *       "longitude_param": "lon",
 *       "display_results": true
 *     });
 *   </script>
 * --></div>
 *
 * @name jQuery.ui.t11e_location
 * @class A search widget that geocodes addresses and makes the geocoded form available for search.
 */

(function ($) {
    $.t11e_widget('t11e_location', {
        search_group: 'default',
        page_param: 'page',
        value_param: 'location',
        latitude_param: 'lat',
        longitude_param: 'lon',
        display_results: 'true',
        display_error: 'true',
        error_selector: '.t11e-widget-jquery-location-ft',
        error_template: 'Unknown address. Please enter a new address.'
    });
    $.ui.t11e_location.widgetEventPrefix = "location";

    /*jslint nomen: false */
    $.ui.t11e_location.prototype._init = function () {
        var self = this;
        var options = self.options;
        var container = self.element.find('.t11e-widget-jquery-location-bd:first');
        if (t11e.util.is_defined(container) &&
            container.length > 0) {
            container.t11e_geocode({
                error: function (event, ui) {
                    t11e.event.trigger('update_request.' + options.search_group, function (params) {
                        self._display_error(self.options.error_template);
                        self._clear_params(params);
                    });
                },
                success: function (event, ui) {
                    t11e.event.trigger('update_request.' + options.search_group, function (params) {
                        delete params[options.page_param];
                        self._remove_error();
                        self._save_params(event, ui, params);
                    });
                },
                clear: function (event, ui) {
                    t11e.event.trigger('update_request.' + options.search_group, function (params) {
                        self._remove_error();
                        self._clear_params(params);
                    });
                }
            });
        } else {
            t11e.util.error('Container is not defined');
        }

        t11e.event.subscribe('request.' + options.search_group, function (params) {
            self._load_params(params);
        });

        t11e.event.subscribe('clear_params_from_search.' + options.search_group, function (params) {
            self._clear_params(params);
        });
    };

    $.ui.t11e_location.prototype._load_params = function (params) {
        var self = this;
        var options = this.options;
        var container = self.element.find('.t11e-widget-jquery-location-bd:first');
        if (t11e.util.is_defined(container)) {
            var values = params[options.value_param];
            var value = t11e.util.is_defined(values) ? values[0] : '';
            value = t11e.util.is_defined(value) ? value : '';
            container.t11e_geocode('address', value);
        }
    };

    $.ui.t11e_location.prototype._save_params = function (event, ui, params) {
        var self = this;
        var options = this.options;
        if (t11e.util.is_defined(ui.normalized_address) &&
            t11e.util.is_defined(ui.latitude) &&
            t11e.util.is_defined(ui.longitude)) {
            params[options.value_param] = [ui.normalized_address];
            params[options.latitude_param] = [ui.latitude];
            params[options.longitude_param] = [ui.longitude];
        }
    };

    $.ui.t11e_location.prototype._clear_params = function (params) {
        var self = this;
        var options = this.options;
        delete params[options.value_param];
        delete params[options.latitude_param];
        delete params[options.longitude_param];
        delete params[options.page_param];
    };

    $.ui.t11e_location.prototype._display_error = function (message) {
        var self = this;
        if (self.options.display_error) {
            var error = this.element.find(this.options.error_selector);
            if (t11e.util.is_defined(error)) {
                error.html(message);
            }
        }
    };

    $.ui.t11e_location.prototype._remove_error = function () {
        var error = this.element.find(this.options.error_selector);
        if (t11e.util.is_defined(error)) {
            error.html("");
        }
    };

    $.ui.t11e_location.prototype.destroy = function () {
        var self = this;
        this.element.unbind();
        $.widget.prototype.destroy.apply(this, arguments);
    };
}(jQuery));

/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview Geocode widget definition
 */

/**
 * Widget for geocoding addresses.
 *
 * <h2>Options</h2>
 *
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
 * <h2>Example</h2>
 * <div class="t11e-widget t11e-widget-jquery-geocode t11e-widget-id-geo">
 *     <div class="t11e-hd t11e-widget-jquery-geocode-hd"><h1>Geocode</h1></div>
 *     <div class="t11e-bd t11e-widget-jquery-geocode-bd">
 *         <form action="" onsubmit="return false;">
 *             <input name="location" />
 *         </form>
 *         <div class="t11e-error"></div>
 *         <div class="t11e-results"></div>
 *     </div>
 *     <div class="t11e-ft t11e-widget-jquery-geocode-ft"></div>
 * </div>
 * <script type="text/javascript">
 * //<!--
 *     if ('undefined' === typeof t11e) { t11e = {}; }
 *     if ('undefined' === typeof t11e.widget_options) { t11e.widget_options = {}; }
 *     t11e.widget_options['geo'] = {
 *         "search_group": "default",
 *         "value_param": "location",
 *         "latitude_param": "la",
 *         "longitude_param": "lo",
 *         "display_results": true
 *     };
 * //-->
 * </script>
 * <script src="http://maps.google.com/maps?file=api&amp;v=2.x&amp;key=" type="text/javascript"></script>
 * @name GeocodeWidget
 * @class A widget for geocoding addresses.
 */

(function ($) {
    $.widget('ui.t11e_geocode', {});

    $.ui.t11e_geocode.defaults = {
        search_group: 'default',
        page_param: 'page',
        value_param: 'location',
        latitude_param: 'lat',
        longitude_param: 'lon',
        input_selector: 'input:first',
        display_results: 'true',
        results_selector: '.t11e-results',
        error_selector: '.t11e-error',
        error_template: 'Unknown address. Please enter a new address.'
    };

    /*jslint nomen: false */
    $.ui.t11e_geocode.prototype._init = function () {
        var self = this;
        var options = self.options;
        var textbox = self.element.find(options.input_selector);

        if (t11e.util.is_defined(textbox)) {
            var ignore_event = false;
            var changed = function (event) {
                if (!ignore_event) {
                    self.geocode();
                }
            };
            textbox.bind('change', changed);
        }

        t11e.event.subscribe('request.' + options.search_group, function (params) {
            self._load_params(params);
        });

        t11e.event.subscribe('clear_params_from_search.' + options.search_group, function (params) {
            self._clear_params(params);
        });
    };

    $.ui.t11e_geocode.prototype._load_params = function (params) {
        var self = this;
        var options = this.options;
        var textbox = self.element.find(options.input_selector);
        if (t11e.util.is_defined(textbox)) {
            var values = params[options.value_param];
            var value = t11e.util.is_defined(values) ? values[0] : '';
            value = t11e.util.is_defined(value) ? value : '';
            ignore_event = true;
            try {
                textbox.val(value);
            } finally {
                ignore_event = false;
            }
        }
    };

    $.ui.t11e_geocode.prototype._save_params = function (params) {
        var self = this;
        var options = this.options;

        if (t11e.util.is_defined(self.geocoded_address) &&
            t11e.util.is_defined(self.latitude) &&
            t11e.util.is_defined(self.longitude)) {
            params[options.value_param] = [self.geocoded_address];
            params[options.latitude_param] = [self.latitude];
            params[options.longitude_param] = [self.longitude];
        }
    };

    $.ui.t11e_geocode.prototype._clear_params = function (params) {
        var self = this;
        var options = this.options;
        delete params[options.value_param];
        delete params[options.latitude_param];
        delete params[options.longitude_param];
        delete params[options.page_param];
        delete self.geocoded_address;
        delete self.latitude;
        delete self.longitude;
    };

    $.ui.t11e_geocode.prototype._get_geocoder = function (params) {
        var self = this;
        if (t11e.util.is_defined(self._geocoder)) {
            return self._geocoder;
        } else {
            if (typeof window.GBrowserIsCompatible !== "undefined" && window.GBrowserIsCompatible()) {
                self._geocoder = new GClientGeocoder();
                return self._geocoder;
            }
        }
    };

    $.ui.t11e_geocode.prototype._display_error = function (params) {
        var error = this.element.find(this.options.error_selector);
        if (t11e.util.is_defined(error)) {
            error.html(this.options.error_template);
        }
    };

    $.ui.t11e_geocode.prototype._remove_error = function (params) {
        var error = this.element.find(this.options.error_selector);
        if (t11e.util.is_defined(error)) {
            error.html("");
        }
    };

    $.ui.t11e_geocode.prototype._display_results = function () {
        var self = this;
        if (self.options.display_results) {
            var results = self.element.find(self.options.results_selector);
            if (t11e.util.is_defined(results) &&
                t11e.util.is_defined(self.latitude) &&
                t11e.util.is_defined(self.longitude)) {
                results.html('Lat: ' + self.latitude + ' Long: ' + self.longitude);
            }
        }
    };

    $.ui.t11e_geocode.prototype._remove_results = function () {
        var self = this;
        if (self.options.display_results) {
            var results = self.element.find(self.options.results_selector);
            if (t11e.util.is_defined(results)) {
                results.html('');
            }
        }
    };

    $.ui.t11e_geocode.prototype.geocode = function () {
        var self = this;
        var options = self.options;
        var geocoder = self._get_geocoder();
        var textbox = self.element.find('input:first');

        if (t11e.util.is_defined(geocoder) && (t11e.util.is_defined(textbox))) {
            var address = $.trim(textbox.val());
            if ('' !== address) {
                geocoder.getLocations(address, function (response) {
                    if (!response || response.Status.code !== 200) {
                        self._remove_results();
                        self._display_error();
                        t11e.event.trigger('update_request.' + options.search_group, function (params) {
                            self._clear_params(params);
                        });
                    } else {

                        place = response.Placemark[0];
                        point = new GLatLng(place.Point.coordinates[1], place.Point.coordinates[0]);

                        self.geocoded_address = place.address;
                        self.latitude = place.Point.coordinates[1];
                        self.longitude = place.Point.coordinates[0];

                        self._remove_error();
                        self._display_results();

                        ignore_event = true;
                        try {
                            textbox.val(self.geocoded_address);
                        } finally {
                            ignore_event = false;
                        }

                        t11e.event.trigger('update_request.' + options.search_group, function (params) {
                            self._save_params(params);
                        });
                    }
                });
            } else {
                self._remove_error();
                self._remove_results();
            }
        }
    };

    $.ui.t11e_geocode.prototype.destroy = function () {
        var self = this;
        this.element.unbind();
        $.widget.prototype.destroy.apply(this, arguments);
    };
}(jQuery));
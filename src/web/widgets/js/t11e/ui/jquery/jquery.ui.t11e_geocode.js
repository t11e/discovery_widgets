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
 *    <dt>address</dt>
 *    <dd>The initial address to be geocoded.</dd>
 * </dl>
 * <h2>Example 1</h2>
 *
 * <pre class="brush: js">
 *     $('#geocode').t11e_geocode({address: 'New York, NY'});
 * </pre>
 *
 * <h2>Example 2</h2>
 * <div class="t11e-widget t11e-jquery-ui-geocode t11e-widget-id-geocode"></div>
 * <script type="text/javascript">
 * //<!--
 *     if ('undefined' === typeof t11e) { t11e = {}; }
 *     if ('undefined' === typeof t11e.widget_options) { t11e.widget_options = {}; }
 *     t11e.widget_options['geocode'] = {
 *            address: 'New York, NY'
 *     }
 * //-->
 * </script>
 * <script src="http://maps.google.com/maps?file=api&amp;v=2.x&amp;key=" type="text/javascript"></script>
 * @name jQuery.ui.t11e_geocode
 * @class A widget for geocoding addresses.
 */

(function ($) {
    var options = {address: ''};
    $.widget('ui.t11e_geocode', {
        // TODO: check compatibility
        widgetEventPrefix: 'geocode',
        options: options
    });
    $.ui.t11e_geocode.defaults = options;

    /*jslint nomen: false */
    $.ui.t11e_geocode.prototype._init = function () {
        var self = this;
        var options = self.options;
        self.element.addClass('t11e-widget' +
            ' t11e-widget-jquery-geocode');

        self._address = self._inputs('t11e-address', 'text');
        var type = self.options.showResults ? 'text': 'hidden';
        self._latitude = self._inputs('t11e-latitude', type);
        self._longitude = self._inputs('t11e-longitude', type);

        self.geocoding = false;
        if (self._inputs_exist()) {
            var changed = function (event) {
                if (!self.geocoding) {
                    var geocode_address = true;
                    if (self._is_geocoded()) {
                        // Do not re-code if this address has already been geocoded.
                        var address = self.address();
                        var results = self.element.data('results');
                        if (t11e.util.is_defined(results)) {
                            if (address === results.address) {
                                self._address.val(results.normalized_address);
                                self.options.address = results.normalized_address;
                                geocode_address = false;
                            } else if (address === results.normalized_address) {
                                geocode_address = false;
                            }
                        }
                    }
                    if (geocode_address) {
                        self.geocode(event);
                    }
                }
            };
            self._address.bind('change', changed);
        }
        if (options.address) {
            self.address(options.address);
        }
    };

    $.ui.t11e_geocode.prototype._get_geocoder = function (params) {
        var self = this;
        var geocoder;
        if (t11e.util.is_undefined(self._geocoder) &&
            typeof window.GBrowserIsCompatible !== "undefined" &&
            window.GBrowserIsCompatible()) {
            geocoder = new GClientGeocoder();
        }
        return geocoder;
    };

    $.ui.t11e_geocode.prototype._inputs = function (css_class, type) {
        var self = this;
        var input;
        if (t11e.util.is_defined(css_class) &&
            t11e.util.is_defined(type)) {
            input = self.element.find('input.' + css_class + ':first');
            if (!t11e.util.is_defined(input) ||
                input.length === 0) {
                input = $('<input type="' + type + '" value="" />')
                .addClass(css_class)
                .appendTo(self.element);
            }
        }
        return input;
    };

    $.ui.t11e_geocode.prototype._inputs_exist = function () {
        var self = this;
        if (t11e.util.is_defined(self._address) &&
            t11e.util.is_defined(self._latitude) &&
            t11e.util.is_defined(self._longitude)) {
            return true;
        } else {
            return false;
        }
    };

    $.ui.t11e_geocode.prototype._is_geocoded = function () {
        var self = this;
        var results = self.element.data('results');
        if (t11e.util.is_defined(results) &&
            (t11e.util.is_defined(results.address) &&
            '' !== results.address) &&
            (t11e.util.is_defined(results.normalized_address) &&
                '' !== results.normalized_address) &&
            (t11e.util.is_defined(results.latitude) &&
                '' !== results.latitude) &&
            (t11e.util.is_defined(results.longitude) &&
                '' !== results.longitude)) {
            return true;
        } else {
            return false;
        }
    };

    $.ui.t11e_geocode.prototype._clear = function () {
        var self = this;
        self.element.removeData('results');
        if (self._inputs_exist()) {
            self._address.val('');
            self._latitude.val('');
            self._longitude.val('');
        }
    };

    $.ui.t11e_geocode.prototype._update = function (results) {
        var self = this;
        self.element.data('results', results);
        if (self._inputs_exist()) {
            var address = results.normalized_address || '';
            self._address.val(address);
            self.options.address = address;
            var latitude = results.latitude || '';
            self._latitude.val(latitude);
            var longitude = results.longitude || '';
            self._longitude.val(longitude);
        }
    };

    $.ui.t11e_geocode.prototype.address = function (address) {
        var self = this;
        if (t11e.util.is_defined(self._address)) {
            var original_address = $.trim(self._address.val());
            if (arguments.length) {
                if (original_address !== address) {
                    self.options.address = address;
                    self._address.val(address);
                    self._address.change();
                }
            } else {
                return  original_address;
            }
        }
    };

    $.ui.t11e_geocode.prototype.geocode = function (event) {
        var self = this;
        var options = self.options;
        try {
            var geocoder = self._get_geocoder();
            if (t11e.util.is_defined(geocoder) && (self._inputs_exist())) {
                var address = self.address();
                if ('' !== address) {
                    self.geocoding = true;
                    self.element.addClass('t11e-geocoding');
                    geocoder.getLocations(address, function (response) {
                        self.element.removeClass('t11e-geocoding');
                        self.geocoding = false;
                        if (!response || response.Status.code !== 200) {
                            self._clear();
                            self._trigger("error", event, response);
                        } else {
                            place = response.Placemark[0];
                            if (t11e.util.is_defined(place) &&
                                t11e.util.is_defined(place.address) &&
                                t11e.util.is_defined(place.Point.coordinates[1]) &&
                                t11e.util.is_defined(place.Point.coordinates[0])) {
                                var results = {
                                    address: address,
                                    normalized_address: place.address,
                                    latitude: place.Point.coordinates[1],
                                    longitude: place.Point.coordinates[0]
                                };
                                self._update(results);
                                self._trigger("success", event, results);
                            } else {
                                self._clear();
                                self._trigger("error", event, response);
                            }
                        }
                    });
                } else {
                    self._clear();
                    self._trigger("clear", event);
                }
            }
        } catch (ex) {
            t11e.util.error(ex);
        }
    };

    $.ui.t11e_geocode.prototype.destroy = function () {
        var self = this;
        this._address.unbind();
        this.element.unbind();
        $.widget.prototype.destroy.apply(this, arguments);
    };
}(jQuery));

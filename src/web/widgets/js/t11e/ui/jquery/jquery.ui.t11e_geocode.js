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
    var options = {address: null};
    $.widget('ui.t11e_geocode', {
        // TODO: check compatibility
        widgetEventPrefix: "geocode",
        options: options
    });
    $.ui.t11e_geocode.defaults = options;

    /*jslint nomen: false */
    $.ui.t11e_geocode.prototype._init = function () {
        var self = this;
        var options = self.options;

        self.element.addClass("t11e-widget" +
            " t11e-widget-jquery-geocode");

        self._address = self._inputs('t11e-address', 'text');
        var type = self.options.showResults ? 'text': 'hidden';
        self._latitude = self._inputs('t11e-latitude', type);
        self._longitude = self._inputs('t11e-longitude', type);

        self.geocoding = false;
        if (t11e.util.is_defined(self._address)) {
            var changed = function (event) {
                if (!self.geocoding) {
                    self.geocode(event);
                }
            };
            self._address.bind('change', changed);
        }
        if (self.options.address) {
            self.address(self.options.address);
        }
    };

    $.ui.t11e_geocode.prototype._get_geocoder = function (params) {
        var self = this;
        if (t11e.util.is_undefined(self._geocoder) &&
            typeof window.GBrowserIsCompatible !== "undefined" &&
            window.GBrowserIsCompatible()) {
            self._geocoder = new GClientGeocoder();
        }
        return self._geocoder;
    };

    $.ui.t11e_geocode.prototype._inputs = function (css_class, type) {
        var self = this;
        if (t11e.util.is_defined(css_class) &&
            t11e.util.is_defined(type)) {
            var input = self.element.find('input.' + css_class + ':first');
            if (!t11e.util.is_defined(input) ||
                input.length === 0) {
                input = $('<input type="' + type + '" value="" />')
                .addClass(css_class)
                .appendTo(self.element);
            }
            return input;
        }
    };

    $.ui.t11e_geocode.prototype._clear = function () {
        var self = this;
        if (t11e.util.is_defined(self._address) &&
            t11e.util.is_defined(self._latitude) &&
            t11e.util.is_defined(self._longitude)) {
            //self._address.val('');
            self._latitude.val('');
            self._longitude.val('');
        }
    };

    $.ui.t11e_geocode.prototype._update = function (results) {
        var self = this;
        if (t11e.util.is_defined(self._address) &&
            t11e.util.is_defined(self._latitude) &&
            t11e.util.is_defined(self._longitude)) {
            var address = results.normalized_address || '';
            self._address.val(address);
            var latitude = results.latitude || '';
            self._latitude.val(latitude);
            var longitude = results.longitude || '';
            self._longitude.val(longitude);
        }
    };

    $.ui.t11e_geocode.prototype.address = function (address) {
        var self = this;
        if (t11e.util.is_defined(self._address)) {
            if (arguments.length) {
                self.options.address = $.trim(address);
                self._address.val(self.options.address);
                self._address.change();
            }
            return self._address.val();
        }
    };

    $.ui.t11e_geocode.prototype.latitude = function () {
        var self = this;
        if (t11e.util.is_defined(self._latitude)) {
            return self._latitude.val();
        }
    };

    $.ui.t11e_geocode.prototype.longitude = function () {
        var self = this;
        if (t11e.util.is_defined(self._longitude)) {
            return self._longitude.val();
        }
    };

    $.ui.t11e_geocode.prototype.geocode = function (event) {
        var self = this;
        var options = self.options;
        self.geocoding = true;
        self.element.addClass('t11e-geocoding');
        try {
            var geocoder = self._get_geocoder();
            if (t11e.util.is_defined(geocoder) && (t11e.util.is_defined(self._address))) {
                var address = $.trim(self._address.val());
                if ('' !== address) {
                    geocoder.getLocations(address, function (response) {
                        if (!response || response.Status.code !== 200) {
                            self._clear();
                            self._trigger("error", event, response);
                        } else {
                            place = response.Placemark[0];
                            var results = {
                                normalized_address: place.address,
                                latitude: place.Point.coordinates[1],
                                longitude: place.Point.coordinates[0]
                            };
                            self._update(results);
                            self._trigger("success", event, results);
                        }
                    });
                } else {
                    self._clear();
                    self._trigger("clear", event);
                }
            }
        } finally {
            self.element.removeClass('t11e-geocoding');
            self.geocoding = false;
        }
    };

    $.ui.t11e_geocode.prototype.destroy = function () {
        var self = this;
        this._address.remove();
        this._latitude.remove();
        this._longitude.remove();
        this.element.unbind();
        //$.widget.prototype.destroy.apply(this, arguments);
    };
}(jQuery));
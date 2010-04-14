(function ($) {
    $.widget('ui.t11e_geocode', {});

    $.ui.t11e_geocode.defaults = {
        search_group: 'default',
        page_param: 'page',
        value_param: 'location',
        latitude_param: 'lat',
        longitude_param: 'lon',
        input_selector: 'input:first',
        error_selector: '.t11e-error',
        error_template: 'Unknown address. Please enter a new address.'
    };

    /*jslint nomen: false */
    $.ui.t11e_geocode.prototype._init = function () {
        var self = this;
        var options = self.options;
        var textbox = self.element.find(options.input_selector);

        var ignore_event = false;
        var changed = function (event) {
            if (!ignore_event) {
                self.geocode();
            }
        };
        textbox.bind('change', changed);

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

        var values = params[options.value_param];
        var value = t11e.util.is_defined(values) ? values[0] : '';
        value = t11e.util.is_defined(value) ? value : '';
        ignore_event = true;
        try {
            textbox.val(value);
        } finally {
            ignore_event = false;
        }
    };

    $.ui.t11e_geocode.prototype._clear_params = function (params) {
        var self = this;
        var options = this.options;
        delete params[options.value_param];
        delete params[options.latitude_param];
        delete params[options.longitude_param];
        delete params[options.page_param];
    };

    $.ui.t11e_geocode.prototype._get_geocoder = function (params) {
        var self = this;
        if (t11e.util.is_defined(self._geocoder)) {
            return self._geocoder;
        }
        if (typeof window.GBrowserIsCompatible !== "undefined" && window.GBrowserIsCompatible()) {
            self._geocoder = new GClientGeocoder();
            return self._geocoder;
        }
    };

    $.ui.t11e_geocode.prototype._display_error = function (params) {
        var error = this.element.find(this.options.error_selector);
        error.html(this.options.error_template);
    };

    $.ui.t11e_geocode.prototype._remove_error = function (params) {
        var error = this.element.find(this.options.error_selector);
        error.html("");
    };

    $.ui.t11e_geocode.prototype.geocode = function () {
        var self = this;
        var options = self.options;
        var geocoder = self._get_geocoder();

        if (t11e.util.is_defined(geocoder)) {
            var textbox = self.element.find('input:first');
            var address = $.trim(textbox.val());

            geocoder.getLocations(address, function (response) {
                if (!response || response.Status.code !== 200) {
                    self._display_error();
                    t11e.event.trigger('update_request.' + options.search_group, function (params) {
                        self._clear_params(params);
                    });
                    t11e.util.log("Status Code:" + response.Status.code);
                } else {
                    self._remove_error();
                    place = response.Placemark[0];
                    point = new GLatLng(place.Point.coordinates[1], place.Point.coordinates[0]);

                    var geocoded_address = place.address;
                    var latitude = place.Point.coordinates[1];
                    var longitude = place.Point.coordinates[0];

                    textbox.val(geocoded_address);
                    // Save params
                    t11e.event.trigger('update_request.' + options.search_group, function (params) {
                        params[options.value_param] = [geocoded_address];
                        params[options.latitude_param] = [latitude];
                        params[options.longitude_param] = [longitude];
                    });
                }
            });
        }
    };

    $.ui.t11e_geocode.prototype.destroy = function () {
        var self = this;
        this.element.unbind();
        $.widget.prototype.destroy.apply(this, arguments);
    };
}(jQuery));
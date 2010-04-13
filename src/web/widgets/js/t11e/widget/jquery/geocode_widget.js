(function ($) {
    $.widget('ui.t11e_geocode', {});

    $.ui.t11e_geocode.defaults = {
        search_group: 'default',
        page_param: 'page',
        value_param: 'location',
        latitude_param: 'lat',
        longitude_param: 'lon'
    };

    /*jslint nomen: false */
    $.ui.t11e_geocode.prototype._init = function () {
        var self = this;
        var options = self.options;
        var textbox = this.element.find('input:first');

        if (typeof window.GBrowserIsCompatible !== "undefined" && window.GBrowserIsCompatible()) {
            this.geocoder = new GClientGeocoder();
        }

        var ignore_event = false;
        var changed = function (event) {
            if (!ignore_event) {
                self.geocode();
            }
        };
        textbox.bind('change', changed);

        t11e.event.subscribe('request.' + options.search_group, function (params) {
            var values = params[options.value_param];
            var value = t11e.util.is_defined(values) ? values[0] : '';
            value = t11e.util.is_defined(value) ? value : '';
            ignore_event = true;
            try {
                textbox.val(value);
            } finally {
                ignore_event = false;
            }
        });

        t11e.event.subscribe('clear_params_from_search.' + options.search_group, function (params) {
            delete params[options.value_param];
            delete params[options.latitude_param];
            delete params[options.longitude_param];
            delete params[options.page_param];
        });
    };

    $.ui.t11e_geocode.prototype.geocode = function () {
        var self = this;
        var options = self.options;
        var textbox = self.element.find('input:first');
        var address = $.trim(textbox.val());

        self.geocoder.getLocations(address, function (response) {
            if (!response || response.Status.code !== 200) {
                t11e.util.log("Status Code:" + response.Status.code);
            } else {
                place = response.Placemark[0];
                point = new GLatLng(place.Point.coordinates[1], place.Point.coordinates[0]);
                textbox.val(place.address);
                var  geocoded_address = place.address;
                var latitude = place.Point.coordinates[1];
                var longitude = place.Point.coordinates[0];
                t11e.event.trigger('update_request.' + options.search_group, function (params) {
                    params[options.value_param] = [address];
                    params[options.latitude_param] = [latitude];
                    params[options.longitude_param] = [longitude];
                });
            }
        });

    };

    $.ui.t11e_geocode.prototype.destroy = function () {
        var self = this;
        this.element.unbind();
        $.widget.prototype.destroy.apply(this, arguments);
    };
}(jQuery));
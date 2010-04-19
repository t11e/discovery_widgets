module("Options");

test('Geo1 Options', function () {
    var geocode = $('.t11e-widget-jquery-location');
    same(geocode.t11e_location('option', 'page_param'), 'page', 'page_param should be "page"');
    same(geocode.t11e_location('option', 'value_param'), 'location', 'value_param should be "location"');
    same(geocode.t11e_location('option', 'latitude_param'), 'lat', 'latitude_param should be "latitude"');
    same(geocode.t11e_location('option', 'longitude_param'), 'lon', 'longitude_param should be "longitude"');
});

(function ($) {

    var test_input = function () {
        var input = $('.t11e-widget-jquery-location input.t11e-address');
        same(input.val(), 'Raleigh, NC 27617, USA', 'Input should say "Raleigh, NC 27617, USA"');
        start();
    };

    module('Geocode Module', {
        setup: function () {
            t11e.event.subscribe('update_request.default', test_input);
        },
        teardown: function () {
            t11e.event.unsubscribe('update_request.default', test_input);
        }
    });

    test('Geocode', function () {
        var widget = $('.t11e-widget-jquery-location:first');
        var input = widget.find('input.t11e-address');
        input.val('27617');
        input.change();
        stop(3000);
    });

}(jQuery));
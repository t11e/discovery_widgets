(function ($) {
    module("Location options");

    test('Location Options', function () {
        var geocode = $('#location1');
        same(geocode.t11e_location('option', 'page_param'), 'page', 'page_param should be "page"');
        same(geocode.t11e_location('option', 'value_param'), 'location', 'value_param should be "location"');
        same(geocode.t11e_location('option', 'latitude_param'), 'lat', 'latitude_param should be "latitude"');
        same(geocode.t11e_location('option', 'longitude_param'), 'lon', 'longitude_param should be "longitude"');
    });

    var test_input = function () {
        var input = $('#location1 input.t11e-address');
        same(input.val(), 'Raleigh, NC 27617, USA', 'Input should say "Raleigh, NC 27617, USA"');
        start();
    };

    module('Location change module', {
        setup: function () {
            t11e.event.subscribe('update_request.default', test_input);
        },
        teardown: function () {
            t11e.event.unsubscribe('update_request.default', test_input);
        }
    });

    test('Change location', function () {
        var widget = $('.t11e-widget-jquery-location-bd:first');
        widget.t11e_geocode();
        stop();
        widget.t11e_geocode('address', '27617');
    });

    var test_clear = function () {
        var input = $('#location1 input.t11e-address');
        same(input.val(), '', 'Input should say ""');
        start();
    };

    module('Location clear module', {
        setup: function () {
            t11e.event.subscribe('update_request.default', test_clear);
        },
        teardown: function () {
            t11e.event.unsubscribe('update_request.default', test_clear);
        }
    });

    test('Clear input', function () {
        var widget = $('.t11e-widget-jquery-location-bd:first');
        widget.t11e_geocode();
        stop();
        widget.t11e_geocode('address', '');
    });

}(jQuery));

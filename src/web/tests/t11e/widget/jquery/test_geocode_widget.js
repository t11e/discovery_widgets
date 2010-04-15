module("Options");

test('Geo1 Options', function () {
    var geocode = $('.t11e-widget[t11e-widget-id=geo1]');
    same(geocode.t11e_geocode('option', 'page_param'), 'page', 'page_param should be "page"');
    same(geocode.t11e_geocode('option', 'value_param'), 'location', 'value_param should be "location"');
    same(geocode.t11e_geocode('option', 'latitude_param'), 'la', 'latitude_param should be "la"');
    same(geocode.t11e_geocode('option', 'longitude_param'), 'lo', 'longitude_param should be "lo"');
});

test('Geo2 Options', function () {
    var geocode = $('.t11e-widget[t11e-widget-id=geo2]');
    same(geocode.t11e_geocode('option', 'page_param'), 'page', 'page_param should be "page"');
    same(geocode.t11e_geocode('option', 'value_param'), 'loc', 'value_param should be "loc"');
    same(geocode.t11e_geocode('option', 'latitude_param'), 'lat', 'latitude_param should be "lat"');
    same(geocode.t11e_geocode('option', 'longitude_param'), 'lon', 'longitude_param should be "lon"');
});

(function ($) {

    var test_input = function () {
        var input = $('.t11e-widget[t11e-widget-id=geo1] input');
        same(input.val(), 'Raleigh, NC 27617, USA', 'Input should say "Raleigh, NC 27617, USA"');
        start();
    };

    module("Geocode", {
        setup: function () {
            t11e.event.subscribe('update_request.default', test_input);
        },
        teardown: function () {
            t11e.event.unsubscribe('update_request.default', test_input);
        }
    });

    test('Geocode', function () {
        var input = $('.t11e-widget[t11e-widget-id=geo1] input');
        input.val('27617');
        input.change();
        stop(3000);
    });

}(jQuery));

(function ($) {

    var test_error = function () {
        var widget = $('.t11e-widget[t11e-widget-id=geo1]');
        var error = widget.find('.t11e-error');
        var error_template = widget.t11e_geocode('option', 'error_template');
        same($.trim(error.html()), $.trim(error_template), 'Input should say "' + $.trim(error_template) + '"');
        start();
    };

    module("Geocode Errors", {
        setup: function () {
            t11e.event.subscribe('update_request.default', test_error);
        },
        teardown: function () {
            t11e.event.unsubscribe('update_request.default', test_error);
        }
    });

    test('Geocode Error Message', function () {
        var input = $('.t11e-widget[t11e-widget-id=geo1] input');
        input.val('asdf1234#$!');
        input.change();
        stop(10000);
    });

}(jQuery));
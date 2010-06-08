(function ($) {
    module("Geocode Events", {
        setup: function () {
            $('#geocode1').t11e_geocode({
                success: function (event, ui) {
                    t11e.util.log('Success (geocode1): ', ui);
                    same(ui.normalized_address, 'Raleigh, NC 27617, USA',
                        'Input should say "Raleigh, NC 27617, USA"');
                    start();
                },
                clear: function (event, ui) {
                    t11e.util.log('Clear (geocode1)', event);
                    ok(true, 'Clear event called.');
                    var address = $('#geocode1').find('.t11e-address:first');
                    same('', address.val(), 'Address field is empty');
                    start();
                },
                error: function (event, ui) {
                    t11e.util.log('Error (geocode1): ', ui);
                    same(ui.name, 'asdf123', 'The response name should be "asdf123"');
                    start();
                }
            });
        },
        teardown: function () {
            // pass
        }
    });

    test('Geocode success', function () {
        $('#geocode1').t11e_geocode('address', '27617');
        stop();
    });

    test('Geocode clear', function () {
        $('#geocode1').t11e_geocode('address', '');
        stop();
    });

    test('Geocode error', function () {
        $('#geocode1').t11e_geocode('address', 'asdf123');
        stop();
    });

}(jQuery));

(function ($) {
    module("Geocode Multiple Requests", {
        setup: function () {
            var count = 0;
            $('#geocode2').t11e_geocode({
                success: function (event, ui) {
                    count += 1;
                    t11e.util.log('Success (geocode2): ', count,  ui);
                    ok((count < 2), 'Success event should only be called once.');
                    start();
                }
            });
        },
        teardown: function () {
            // pass
        }
    });

    test('Geocode address', function () {
        t11e.util.log('requesting NY');
        $('#geocode2').t11e_geocode('address', 'New York, NY');
        t11e.util.log('requesting NY');
        $('#geocode2').t11e_geocode('address', 'New York, NY');
        t11e.util.log('requesting NY');
        $('#geocode2').t11e_geocode('address', 'New York, NY');
        stop();
    });

}(jQuery));

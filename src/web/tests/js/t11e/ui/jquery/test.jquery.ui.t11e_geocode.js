(function ($) {
    module("Geocode Events", {
        setup: function () {
            // pass
        },
        teardown: function () {
            // pass
        }
    });

    test('Geocode success', function () {
        $('#geocode1').t11e_geocode({
            success: function (event, ui) {
                t11e.util.log('Success: ', ui);
                same(ui.normalized_address, 'Raleigh, NC 27617, USA',
                    'Input should say "Raleigh, NC 27617, USA"');
                start();
            }
        });
        stop();
        $('#geocode1').t11e_geocode('address', '27617');
    });

    test('Geocode success (change event)', function () {
        $('#geocode1').t11e_geocode({
            success: function (event, ui) {
                t11e.util.log('Success (change event): ', ui);
                same(ui.normalized_address, 'New York, NY 10075, USA',
                    'Input should say "New York, NY 10075, USA"');
                start();
            }
        });
        var addr_input = $('#geocode1').find('input.t11e-address');
        addr_input.val('10075');
        stop();
        addr_input.change();
    });

    test('Geocode error', function () {
        $('#geocode1').t11e_geocode({
            error: function (event, ui) {
                t11e.util.log('Error: ', ui);
                same(ui.name, 'asdf123', 'The response name should be "asdf123"');
                start();
            }
        });
        stop();
        $('#geocode1').t11e_geocode('address', 'asdf123');
    });

    test('Geocode multiple requests', function () {
        var count = 0;
        $('#geocode1').t11e_geocode({
            success: function (event, ui) {
                count += 1;
                t11e.util.log('Success: ', count,  ui);
                ok((count < 2), 'Success event should only be called once.');
                start();
            }
        });
        stop();
        $('#geocode1').t11e_geocode('address', 'New York, NY');
        $('#geocode1').t11e_geocode('address', 'New York, NY');
        $('#geocode1').t11e_geocode('address', 'New York, NY');
    });

    test('Geocode clear', function () {
        var count = 0;
        stop();
        $('#geocode1').t11e_geocode({
            address: '03063',
            success: function (event, ui) {
                $('#geocode1').t11e_geocode('address', '');
            },
            clear: function (event, ui) {
                count += 1;
                t11e.util.log('Clear: ', event);
                ok((count = 1), 'Clear event should be triggered once.');
                start();
            }
        });

    });

    test('Geocode options', function () {
        stop();
        $('#geocode1').t11e_geocode({
            address: '27617',
            success: function (event, ui) {
                var addr = $('#geocode1').t11e_geocode('option', 'address');
                same(addr, 'Raleigh, NC 27617, USA', 'Address should be "Raleigh, NC 27617, USA"');
                start();
            }
        });
    });

}(jQuery));


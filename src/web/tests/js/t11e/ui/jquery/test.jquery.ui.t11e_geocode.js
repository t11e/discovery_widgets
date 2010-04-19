(function ($) {
    module("Geocode Success", {
        setup: function () {
            // pass
        },
        teardown: function () {
            // pass
        }
    });

    var test_address = function (address) {
        same(address, 'Raleigh, NC 27617, USA', 'Input should say "Raleigh, NC 27617, USA"');
    };

    test('Geocode', function () {
        $('#geocode1').t11e_geocode({
            address: '27617',
            success: function (event, ui) {
                test_address(ui.normalized_address);
                start();
            },
            error: function (event, ui) {
                same(ui.name, 'asdf123', 'The response name should be "asdf123"');
                start();
            }
        });
        stop(3000);
    });

    test('Geocode error', function () {
        $('#geocode1').t11e_geocode('address', 'asdf123');
        stop(3000);
    });

}(jQuery));


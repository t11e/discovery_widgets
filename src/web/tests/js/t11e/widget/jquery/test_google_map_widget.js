test('Google Map Widget', function () {
    var widget = $('.t11e-widget-jquery-google-map:first');
    same(widget.t11e_google_map().jquery, '1.3.2', 'jQuery version should be "1.3.2"');
});
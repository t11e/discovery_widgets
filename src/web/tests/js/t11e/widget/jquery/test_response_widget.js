test('Response Widget', function () {
    var widget = $('.t11e-widget-jquery-response:first');
    same(widget.t11e_response().jquery, '1.3.2', 'jQuery version should be "1.3.2"');
});
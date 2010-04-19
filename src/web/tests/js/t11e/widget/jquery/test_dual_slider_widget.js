test('Button Widget', function () {
    var widget = $('.t11e-widget-jquery-button:first');
    same(widget.t11e_button().jquery, '1.3.2', 'jQuery version should be "1.3.2"');
});
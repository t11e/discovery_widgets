test('Params Widget', function () {
    var widget = $('.t11e-widget-jquery-params:first');
    same(widget.t11e_params().jquery, '1.3.2', 'jQuery version should be "1.3.2"');
});
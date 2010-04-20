test('Slider Widget', function () {
    var widget = $('.t11e-widget-jquery-slider:first');
    widget.t11e_slider({
        'search_group': 'default',
        'param': 's',
        'min_value': 0,
        'max_value': 10
    });
    same(widget.t11e_slider().jquery, '1.3.2', 'jQuery version should be "1.3.2"');
});
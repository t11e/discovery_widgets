test('Faceted Dual Slider Widget', function () {
    var widget = $('.t11e-widget-jquery-faceted-dual-slider:first');
    same(widget.t11e_faceted_dual_slider().jquery, '1.3.2', 'jQuery version should be "1.3.2"');
});
test('Faceted Flyout Widget', function () {
    var widget = $('.t11e-widget-jquery-faceted-flyout:first');
    same(widget.t11e_faceted_flyout().jquery, '1.3.2', 'jQuery version should be "1.3.2"');
});
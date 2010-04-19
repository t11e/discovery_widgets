test('Pagination Widget', function () {
    var widget = $('.t11e-widget-jquery-pagination:first');
    same(widget.t11e_pagination().jquery, '1.3.2', 'jQuery version should be "1.3.2"');
});
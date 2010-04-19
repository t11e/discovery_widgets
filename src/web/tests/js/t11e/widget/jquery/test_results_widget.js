test('Results Widget', function () {
    var widget = $('.t11e-widget-jquery-results:first');
    same(widget.t11e_results().jquery, '1.3.2', 'jQuery version should be "1.3.2"');
});
test('Textbox Widget', function () {
    var widget = $('.t11e-widget-jquery-textbox:first');
    same(widget.t11e_textbox().jquery, '1.3.2', 'jQuery version should be "1.3.2"');
});
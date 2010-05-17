test('Faceted Checkboxes Widget', function () {
    var widget = $('.t11e-widget-jquery-faceted-checkboxes:first');
    same(widget.t11e_faceted_checkboxes().jquery, '1.3.2', 'jQuery version should be "1.3.2"');
    $('input').each(function (i, target){
        $(target).bind('click', function (event, ui) {
            t11e.util.log($(this).val());
        });
    });
});

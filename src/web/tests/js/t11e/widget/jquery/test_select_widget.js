test('Select widget.', function () {
    var type1 = $('div[t11e-widget-id="type1"]');
    ok(true, t11e.util.is_defined(type1));

    var type2 = $('div[t11e-widget-id="type2"]');
    ok(true, t11e.util.is_defined(type2));

    var style = $('div[t11e-widget-id="style"');
    var test_input = style.find('input[value=multi-family]');
    same(test_input.checked, undefined, 'This checkbox should not be checked');

    var sel = type2.find('select');
    var opts = type2.find('option');
    var test_opt = type2.find('option[value=multi-family]');
    test_opt.attr('selected', 'selected');
    ok(true, test_opt.attr('selected'), 'The select box option should be selected');

    // Trigger change event on selector to update params
    sel.trigger('change');
    ok(true, test_input.checked, 'The checkbox should be checked now');
});
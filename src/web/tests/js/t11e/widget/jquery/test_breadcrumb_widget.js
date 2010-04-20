var add_param = function (params, param, value) {
    var values = params[param];
    if (t11e.util.is_undefined(values)) {
        params[param] = [value];
    } else if (-1 === $.inArray(value, values)) {
        values.push(value);
    }
};

module("breadcrumbs", {
    setup: function () {
        $('.t11e-widget-jquery-button-bd a').trigger('click');
    },
    teardown: function () {
        //pass
    }
});

test('Options', function () {
    var breadcrumb = $('.t11e-widget-jquery-breadcrumb:first');
    same(breadcrumb.t11e_breadcrumb('option', 'page_param'), 'page', 'page_param should be "page"');
    same(breadcrumb.t11e_breadcrumb('option', 'value_params').length, 2, 'value_params length should be 2');
    same(breadcrumb.t11e_breadcrumb('option', 'animate'), false, 'animate should be "false"');
    breadcrumb.t11e_breadcrumb('option', 'animate', true);
    same(breadcrumb.t11e_breadcrumb('option', 'animate'), true, 'animate should be "true"');
    breadcrumb.t11e_breadcrumb('option', 'animate', false);
    same(breadcrumb.t11e_breadcrumb('option', 'animate'), false, 'animate should be "false"');
    same(breadcrumb.t11e_breadcrumb('option', 'animation_speed'), 'fast', 'animation_speed should be "fast"');
});

test('Save to params', function () {

    t11e.event.trigger('update_request.default', function (params) {
        add_param(params, 'param1', 'value1');
    });

    same($('.t11e-breadcrumb').length, 1, 'There should be 1 breadcrumb item');

    t11e.event.trigger('update_request.default', function (params) {
        add_param(params, 'param2', 'value1');
    });

    t11e.event.trigger('update_request.default', function (params) {
        add_param(params, 'param2', 'value2');
    });

    same($('.t11e-breadcrumb').length, 3, 'There should be 3 breadcrumb items');

});

asyncTest('Remove from params', function () {
    t11e.event.trigger('update_request.default', function (params) {
        add_param(params, 'param1', 'value1');
    });

    t11e.event.trigger('update_request.default', function (params) {
        add_param(params, 'param2', 'value1');
    });

    t11e.event.trigger('update_request.default', function (params) {
        add_param(params, 'param2', 'value2');
    });

    same($('.t11e-breadcrumb').length, 3, 'There should be 3 breadcrumb items');

    var clicked_item = $('.t11e-breadcrumb > a')[0];
    $(clicked_item).trigger('click');

    setTimeout(function () {
        same($('.t11e-breadcrumb').length, 2, 'There should be 2 breadcrumb items');

        start();
    }, 100);

});
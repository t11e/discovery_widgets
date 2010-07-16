/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview t11e.widget.jquery.util
 */

/**
 * @name jQuery
 * @namespace jQuery: See <a href="http://docs.jquery.com">external documentation</a>
 */

/**
 * @name jQuery.ui
 * @namespace jQuery UI: See <a href="http://docs.jquery.com">external documentation</a>
 */

/**
 * @name t11e.widget.jquery.util
 * @namespace t11e.widget.jquery.util
 */

t11e.util.define_namespace('t11e.widget.jquery.util');
if (false) {
    t11e.widget.jquery.prototype.Eclipse__Outline__Hack = undefined;
}

t11e.widget.jquery.util.call_func = function ($, value, func) {
    if (t11e.util.is_defined(func) &&
        t11e.util.is_function(func)) {
        return func($, value);
    } else {
        return value;
    }
};

/**
 * Automatically find any labels and associates them with the first input
 * inside the given container.
 */
t11e.widget.jquery.util.associate_labels = function ($, container) {
    var input = $(container).find('input:first');
    var input_id = input.attr('id');
    if ('' === input_id) {
        input_id = 't11e-widget-counter-' + t11e.util.get_next_number();
        input.attr('id', input_id);
    }
    $(container).find('label').each(function (i, label) {
        if ('' === $(label).attr('for')) {
            $(label).attr('for', input_id);
        }
    });
};

t11e.widget.jquery.util.remove_checkbox_values_from_params = function ($, checkboxes, params, value_param) {
    var values = params[value_param];
    if (t11e.util.is_defined(values)) {
        var values_to_remove = checkboxes.map(function (checkbox) {
            return checkbox.value;
        });
        params[value_param] =
            t11e.widget.jquery.util.subtract($, values, values_to_remove);
    }
};
t11e.util.deprecated(
    'Misspelled method name',
    't11e.widget.jquery.util.remove_checkboxe_values_from_params',
    't11e.widget.jquery.util.remove_checkbox_values_from_params');

t11e.widget.jquery.util.subtract = function ($, firstArray, secondArray) {
    var output = $.grep(firstArray, function (value, idx) {
        return ! $.inArray(value, secondArray);
    });
    return output;
};

t11e.widget.jquery.util.get_dimension_drilldown = function ($, search, dimension) {
    var facet_counts = {};
    var found = false;
    var drillDown = t11e.util.deref(search, '_discovery.response.drillDown');
    if (t11e.util.is_defined(drillDown)) {
        $(drillDown).each(function (i, criterion) {
            if (!found && dimension === criterion.dimension) {
                found = true;
                var ids = criterion.ids;
                var counts = criterion.exactCounts;
                var j;
                for (j = 0; j < ids.length && j < counts.length; j++) {
                    var id = ids[j];
                    var count = counts[j];
                    facet_counts[id] = count;
                }
            }
        });
    }
    return facet_counts;
};
t11e.util.deprecated(
    'Misspelled method name',
    't11e.widget.jquery.util.get_dimenion_drilldown',
    't11e.widget.jquery.util.get_dimension_drilldown');

t11e.widget.jquery.util.apply_template = function ($, template_string, props) {
    var result = undefined;
    if (t11e.util.is_defined($.template) &&
            t11e.util.is_defined(template_string) &&
            '' !== $.trim(template_string)) {
        result = $.template(template_string).apply(props);
    }
    return result;
};

/**
 * Creates a 't11e-widget-id' attribute on the widgets base
 * 'div' element and sets the appropriate widget id value.
 */
t11e.widget.jquery.util.bind_widget_id = function ($) {
    if (t11e.util.is_undefined($(this).attr('t11e-widget-id'))) {
        /*jslint regexp: false */
        var matches = /t11e-widget-id-([^ ]+)/.exec($(this).attr('class'));
        if (matches && matches.length === 2) {
            var fake_class = matches[0];
            var widget_id = matches[1];
            $(this).removeClass(fake_class);
            $(this).attr('t11e-widget-id', widget_id);
        }
    }
};

/**
 * Creates a jQuery UI widget out of a traditional style Discovery Widget.
 */
t11e.widget.jquery.make_jquery_ui_widget = function ($, ui_name, widget) {
    $.widget('ui.' + ui_name, {});
    /*jslint nomen: false */
    $.ui[ui_name].prototype._init = function () {
        widget.call(this.element[0], $, this.options);
    };
};

/**
 * Calls jQuery.serializeArray on the form and then flattens it into
 * a simple multi-map.
 */
t11e.widget.jquery.serialize_form = function ($, form) {
    var result = {};
    $.each($(form).serializeArray(), function (i, field) {
        if (t11e.util.is_defined(field.value)) {
            var old_value = result[field.name];
            if (t11e.util.is_defined(old_value)) {
                if (t11e.util.is_array(old_value)) {
                    old_value.push(field.value);
                } else {
                    result[field.name] = [old_value, field.value];
                }
            } else {
                result[field.name] = field.value;
            }
        }
    });
    return result;
};

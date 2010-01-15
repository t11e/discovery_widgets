/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview t11e.widget.jquery.util.associate_labels
 *
 * <p>Automatically find any labels and associates them with the first input
 * inside the given container.</p>
 */
t11e.util.declare('t11e.widget.jquery.util.associate_labels', function ($, container) {
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
});

t11e.util.declare('t11e.widget.jquery.util.remove_checkboxe_values_from_params', function ($, checkboxes, params, value_param) {
    var values = params[value_param];
    if (t11e.util.is_defined(values)) {
        var values_to_remove = checkboxes.map(function (checkbox) {
            return checkbox.value;
        });
        params[value_param] =
            t11e.widget.jquery.util.subtract($, values, values_to_remove);
    }
});

t11e.util.declare('t11e.widget.jquery.util.subtract', function ($, firstArray, secondArray) {
    var output = $.grep(firstArray, function (value, idx) {
        return ! $.inArray(value, secondArray);
    });
    return output;
});

t11e.util.declare('t11e.widget.jquery.util.get_dimenion_drilldown', function ($, search, dimension) {
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
});

t11e.util.declare('t11e.widget.jquery.util.apply_template', function ($, template_string, props) {
    var result = undefined;
    if (t11e.util.is_defined($.template) &&
            t11e.util.is_defined(template_string) &&
            '' !== $.trim(template_string)) {
        result = $.template(template_string).apply(props);
    }
    return result;
});

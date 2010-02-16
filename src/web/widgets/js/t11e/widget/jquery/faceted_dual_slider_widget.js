/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview t11e.widget.jquery.DualSliderWidget definition
 */

t11e.util.define_namespace('t11e.widget.jquery');
if (false) {
    t11e.widget.jquery.prototype.Eclipse__Outline__Hack = undefined;
}

 /**
 * A dual-handled slider widget.
 *
 * <h2>Options</h2>
 * <dl>
 *    <dt>css_class</dt>
 *    <dd>An option CSS class to be applied to this widget instance to facilitate custom styling.</dd>
 *
 *    <dt>title</dt>
 *    <dd>The widget's title, which is displayed on the page.</dd>
 *
 *    <dt>search_group</dt>
 *    <dd>The search group this widget is associated with.</dd>
 *
 *    <dt>min_param</dt>
 *    <dd>The query parameter this widget is associated with.</dd>
 *
 *    <dt>max_param</dt>
 *    <dd>The query parameter this widget is associated with.</dd>
 *
 *    <dt>min_value</dt>
 *    <dd>The minimum value for the slider range.</dd>
 *
 *    <dt>max_value</dt>
 *    <dd>The maximum value for the slider range.</dd>
 *
 *    <dt>step</dt>
 *    <dd>The increment value for the slider. The default is '1'.</dd>
 *
 *    <dt>page_param</dt>
 *    <dd>Causes the pagination widget to reset when when this widget is updated. The 'page_param' value
 *    must be set to the same as the pagination widget's 'page_param' value.</dd>
 *
 *    <dt>value_to_param</dt>
 *    <dd>Optional callback for mapping the slider value to a param value.</dd>
 *
 *    <dt>param_to_value</dt>
 *    <dd>Optional callback for mapping a param value to a slider value.</dd>
 *
 *    <dt>sparkline</dt>
 *    <dd>Configuration for displaying a sparkline (an inline chart) that represents the distribution of
 *    the slider values.</dd>
 *
 *    <dt>format</dt>
 *    <dd>Optional callback that formats how the slider values are displayed on the page.
 * </dl>
 *
 * <h2>Sample HTML</h2>
 * <div class="t11e-widget t11e-widget-jquery-faceted-dual-slider t11e-widget-id-7">
 *     <div class="t11e-hd t11e-widget-jquery-faceted-dual-slider-hd">Price</div>
 *     <div class="t11e-bd t11e-widget-jquery-faceted-dual-slider-bd">
 *         <div class="t11e-sparkline"></div>
 *         <div class="t11e-slider-control"></div>
 *         <div class="t11e-amount"></div>
 *     </div>
 *     <div class="t11e-ft t11e-widget-jquery-faceted-dual-slider-ft">
 *     </div>
 * </div>
 * <script type="text/javascript">
 * //<!--
 *     t11e.widget_options['7'] = {
 *         "search_group": "default",
 *         "dimension": "price",
 *         "page_param": "page",
 *         "min_param": "price_min",
 *         "max_param": "price_max",
 *         "min_value": 2,
 *         "max_value": 10,
 *         "step": 1,
 *         "sparkline": {
 *             "height": "2em",
 *             "lineWidth": 2,
 *             "background": {
 *                 "lineColor": "#AAA",
 *                 "fillColor": "#CCC"
 *             },
 *             "foreground": {
 *                 "lineColor": "#F66",
 *                 "fillColor": "#FAA"
 *             }
 *         },
 *         "value_to_param": function ($, value) {
 *             return Math.pow(Number(value), 3);
 *         },
 *         "param_to_value": function ($, value) {
 *             return Math.ceil(Math.pow(value, 1/3));
 *         },
 *         "format": function ($, amount, min_value, max_value) {
 *             amount.html('$' + min_value + ' - $' + max_value);
 *         }
 *     };
 * //-->
 * </script>
 *
 * @name t11e.widget.jquery.FacetedDualSliderWidget
 * @class A dual-handled slider widget for searching a range of values.
 */
t11e.widget.jquery.FacetedDualSliderWidget = function ($) {
    var options = t11e.widget_options[$(this).attr('t11e-widget-id')];
    var search_group = options.search_group;
    var dimension = options.dimension;
    var sl = $(this).find(".t11e-sparkline:first");
    var amount = $(this).find(".t11e-amount:first");
    var slider_ctl = $(this).find(".t11e-slider-control:first");
    var slider_options = {
        'range': true,
        'values': [Number(options.min_value), Number(options.max_value)],
        'min': Number(options.min_value),
        'max': Number(options.max_value),
        'step': Number(options.step) > 0 ? Number(options.step) : 1,
        'orientation': t11e.util.is_defined(options.orientation) ? options.orientation : 'horizontal'
    };
    slider_ctl.slider(slider_options);

    var value_to_param = function (value) {
        return t11e.widget.jquery.util.call_func($, value, options.value_to_param);
    };

    var param_to_value = function (param) {
        return t11e.widget.jquery.util.call_func($, param, options.param_to_value);
    };

    if (t11e.util.is_defined(options.sparkline) &&
        t11e.util.is_defined(sl) &&
        sl.length > 0 &&
        t11e.util.is_defined(sl.sparkline)) {
        $(this).addClass('t11e-widget-jquery-faceted-dual-slider-sparkline');
        var chart_min = value_to_param(slider_options.min);
        var chart_max = value_to_param(slider_options.max);
        var sl_options = options.sparkline;
        var sl_width = $(this).find('.ui-slider-horizontal').width();
        var sl_config = {
            type: 'line',
            height: t11e.util.is_defined(sl_options.height) ? sl_options.height : "2em",
            width: t11e.util.is_defined(sl_options.width) ? sl_options.width : sl_width,
            lineWidth: t11e.util.is_defined(sl_options.lineWidth) ? sl_options.lineWidth : 2,
            chartRangeMin: chart_min,
            chartRangeMax: chart_max,
            spotColor: '',
            minSpotColor: '',
            maxSpotColor: ''
        };
        var sl_background = $.extend({}, sl_config, sl_options.background);
        var sl_foreground = $.extend({}, sl_config, sl_options.foreground);
        sl_foreground.composite = true;
    }

    var update_amounts = function (event, ui) {
        var min_value = value_to_param(ui.values[0]);
        var max_value = value_to_param(ui.values[1]);
        if (t11e.util.is_defined(options.format) &&
            t11e.util.is_function(options.format)) {
            options.format($, amount, min_value, max_value);
        }
        else {
            amount.html(min_value + ' - ' + max_value);
        }
    };

    var show_sparkline = function (event, ui) {
        if (t11e.util.is_defined(sl) &&
            t11e.util.is_defined(sl_background) &&
            t11e.util.is_defined(sl_foreground)) {
            var min_value = ui.values[0];
            var max_value = ui.values[1];
            var sparkline_values = [];
            var selected = [];
            for (var i = slider_options.min; i <= slider_options.max; i = i + slider_options.step) {
                sparkline_values.push(value_to_param(i));
                if (i >= min_value && i <= max_value) {
                    selected.push(value_to_param(i));
                }
                else {
                    selected.push(null);
                }
            }
            sl.sparkline(sparkline_values, sl_background);
            sl.sparkline(selected, sl_foreground);
        }
    };
    slider_ctl.bind('slide', update_amounts);
    slider_ctl.bind('slide', show_sparkline);
    update_amounts(null, slider_options);
    show_sparkline(null, slider_options);

    var ignore_event = false;
    var load_from_params = function (params) {
        var param_min_values = params[options.min_param];
        var param_max_values = params[options.max_param];
        var slider_min_value;
        var slider_max_value;
        if (t11e.util.is_defined(param_min_values) && param_min_values.length > 0) {
            slider_min_value = param_to_value(param_min_values[0]);
        } else {
            slider_min_value = slider_options.min;
        }
        if (t11e.util.is_defined(param_max_values) && param_max_values.length > 0) {
            slider_max_value = param_to_value(param_max_values[0]);
        } else {
            slider_max_value = slider_options.max;
        }

        if (t11e.util.is_defined(slider_min_value) && t11e.util.is_defined(slider_max_value)) {
            var old_values = slider_ctl.slider('values');
            if (old_values[0] !== slider_min_value || old_values[1] !== slider_max_value) {
                ignore_event = true;
                try {
                    slider_ctl.slider('values', 0, slider_min_value);
                    slider_ctl.slider('values', 1, slider_max_value);
                    update_amounts(null, {
                        'values': [slider_min_value, slider_max_value]
                    });
                    show_sparkline(null, {
                        'values': [slider_min_value, slider_max_value]
                    });
                }
                finally {
                    ignore_event = false;
                }
            }

        }
    };
    t11e.event.subscribe('request.' + search_group, load_from_params);

    var save_to_params = function (params) {
        var values = slider_ctl.slider('values');
        var param_min_value = value_to_param(values[0]);
        var param_max_value = value_to_param(values[1]);
        params[options.min_param] = [param_min_value];
        params[options.max_param] = [param_max_value];
        // Reset the pagination parameter so that the new results
        // start on the first page.
        t11e.util.remove_param(params, options.page_param);
    };

    slider_ctl.bind('slidechange', function (event, ui) {
        if (!ignore_event) {
            t11e.event.trigger('update_request.' + search_group, save_to_params);
        }
    });

    var clear_params_from_search = function (params) {
        t11e.util.remove_param(params, options.min_param);
        t11e.util.remove_param(params, options.max_param);
        t11e.util.remove_param(params, options.page_param);
    };
    t11e.event.subscribe('clear_params_from_search.' + search_group, clear_params_from_search);

};

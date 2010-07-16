/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview jQuery.ui.t11e_dual_slider definition
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
 * </dl>
 *
 * <h2>Example</h2>
 * <div class="t11e-widget-example"><!--
 *   <div id="example" class="t11e-widget t11e-widget-jquery-dual-slider">
 *     <div class="t11e-hd t11e-widget-jquery-dual-slider-hd"></div>
 *     <div class="t11e-bd t11e-widget-jquery-dual-slider-bd">
 *       <div class="amount"></div>
 *       <div class="slider-control"></div>
 *     </div>
 *     <div class="t11e-ft t11e-widget-jquery-dual-slider-ft"></div>
 *   </div>
 *   <script type="text/javascript">
 *     $("#example").t11e_dual_slider({
 *       "search_group": "default",
 *       "min_param": "year_min",
 *       "max_param": "year_max",
 *       "min_value": 1960,
 *       "max_value": 2010
 *     });
 *   </script>
 * --></div>
 *
 * Also available as t11e.widget.jquery.DualSliderWidget.
 *
 * @name jQuery.ui.t11e_dual_slider
 * @class A dual-handled slider widget for searching a range of values.
 */
t11e.widget.jquery.DualSliderWidget = function ($, options) {
    var search_group = options.search_group;
    var amount = $(this).find(".amount:first");
    var slider_ctl = $(this).find(".slider-control:first");
    var slider_options = {
        'range': true,
        'values': [Number(options.min_value), Number(options.max_value)],
        'min': Number(options.min_value),
        'max': Number(options.max_value),
        'step': Number(options.step) > 0 ? Number(options.step) : 1
    };
    slider_ctl.slider(slider_options);
    var update_amounts = function (event, ui) {
        amount.html(ui.values[0] + ' - ' + ui.values[1]);
    };
    slider_ctl.bind('slide', update_amounts);
    update_amounts(null, slider_options);

    var ignore_event = false;
    var load_from_params = function (params) {
        var min_values = params[options.min_param];
        var max_values = params[options.max_param];
        var min_value = (t11e.util.is_defined(min_values) && min_values.length > 0) ?
            min_values[0] : slider_options.min;
        var max_value = (t11e.util.is_defined(max_values) && max_values.length > 0) ?
            max_values[0] : slider_options.max;
        if (t11e.util.is_defined(min_value) && t11e.util.is_defined(max_value)) {
            var old_values = slider_ctl.slider('values');
            if (old_values[0] !== min_value || old_values[1] !== max_value) {
                ignore_event = true;
                try {
                    slider_ctl.slider('values', 0, min_value);
                    slider_ctl.slider('values', 1, max_value);
                    update_amounts(null, {
                        'values': [min_value, max_value]
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
        params[options.min_param] = [values[0]];
        params[options.max_param] = [values[1]];
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

t11e.widget.jquery.make_jquery_ui_widget(jQuery,
    't11e_dual_slider', t11e.widget.jquery.DualSliderWidget);

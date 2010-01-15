/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview t11e.widget.jquery.DualSliderWidget definition
 */
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
 * <h2>Sample HTML</h2>
 * <pre class="brush: html">
 * &lt;div class=&quot;t11e-widget t11e-widget-jquery-dual-slider t11e-widget-id-2081&quot;&gt;
 *  &lt;div class=&quot;t11e-hd t11e-widget-jquery-dual-slider-hd&quot;&gt;&lt;/div&gt;
 *  &lt;div class=&quot;t11e-bd t11e-widget-jquery-dual-slider-bd&quot;&gt;
 *      &lt;div class=&quot;amount&quot;&gt;&lt;/div&gt;
 *      &lt;div class=&quot;slider-control&quot;&gt;&lt;/div&gt;
 *  &lt;/div&gt;
 *  &lt;div class=&quot;t11e-ft t11e-widget-jquery-dual-slider-ft&quot;&gt;&lt;/div&gt;
 * &lt;/div&gt;
 * &lt;script type=&quot;text/javascript&quot;&gt;
 *  //&lt;!--
 *      if (&#x27;undefined&#x27; === typeof t11e) {
 *          t11e = {};
 *      }
 *      if (&#x27;undefined&#x27; === typeof t11e.widget_options) {
 *          t11e.widget_options = {};
 *      }
 *      t11e.widget_options[&#x27;2081&#x27;] = {
 *          &quot;page_param&quot;: null,
 *          &quot;max_param&quot;: &quot;year_max&quot;,
 *          &quot;min_value&quot;: 1960,
 *          &quot;search_group&quot;: &quot;vehicle&quot;,
 *          &quot;step&quot;: 1,
 *          &quot;max_value&quot;: 2010,
 *          &quot;min_param&quot;: &quot;year_min&quot;
 *      };
 *  //--&gt;
 * &lt;/script&gt;
 * </pre>
 * @name t11e.widget.jquery.DualSliderWidget
 * @class A dual-handled slider widget for searching a range of values.
 */
t11e.util.declare('t11e.widget.jquery.DualSliderWidget', function ($) {
    var options = t11e.widget_options[$(this).attr('t11e-widget-id')];
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
});

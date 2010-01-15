/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview t11e.widget.jquery.TextBoxWidget definition
 */

/**
 * Widget that displays a text entry box.
 * <h2>Options</h2>
 * <dl>
 *    <dt>search_group</dt>
 *    <dd>The search group this widget is associated with.</dd>
 *
 *    <dt>value_param</dt>
 *    <dd>The query parameter this widget is associated with.</dd>
 * </dl>
 * <h2>Sample HTML</h2>
 *<pre class="brush: html">
 * &lt;div class=&quot;t11e-widget t11e-widget-jquery-textbox t11e-widget-id-2076&quot;&gt;
 *  &lt;div class=&quot;t11e-hd t11e-widget-jquery-textbox-hd&quot;&gt;&lt;/div&gt;
 *  &lt;div class=&quot;t11e-bd t11e-widget-jquery-textbox-bd&quot;&gt;
 *      &lt;form action=&quot;&quot; onsubmit=&quot;return false;&quot;&gt;
 *          &lt;input name=&quot;k&quot;&gt;
 *      &lt;/form&gt;
 *  &lt;/div&gt;
 *  &lt;div class=&quot;t11e-ft t11e-widget-jquery-textbox-ft&quot;&gt;&lt;/div&gt;
 * &lt;/div&gt;
 * &lt;script type=&quot;text/javascript&quot;&gt;
 *  //&lt;!--
 *      if (&#x27;undefined&#x27; === typeof t11e) {
 *          t11e = {};
 *      }
 *      if (&#x27;undefined&#x27; === typeof t11e.widget_options) {
 *          t11e.widget_options = {};
 *      }
 *      t11e.widget_options[&#x27;2076&#x27;] = {
 *          &quot;value_param&quot;: &quot;k&quot;,
 *          &quot;search_group&quot;: &quot;vehicle&quot;,
 *          &quot;page_param&quot;: null
 *      };
 *  //--&gt;
 * &lt;/script&gt;
 *</pre>
 * @name t11e.widget.jquery.TextBoxWidget
 * @class A textbox widget for keyword searches.
 */
t11e.util.declare('t11e.widget.jquery.TextBoxWidget', function ($) {
    var options = t11e.widget_options[$(this).attr('t11e-widget-id')];
    var search_group = options.search_group;
    var value_param = options.value_param;
    var textbox = $(this).find('input:first');

    var ignore_event = false;
    var load_from_params = function (params) {
        var values = params[value_param];
        var value = t11e.util.is_defined(values) ? values[0] : '';
        value = t11e.util.is_defined(value) ? value : '';
        ignore_event = true;
        try {
            textbox.val(value);
        } finally {
            ignore_event = false;
        }
    };
    t11e.event.subscribe('request.' + search_group, load_from_params);

    var save_to_params = function (params) {
        params[value_param] = [textbox.val()];
        t11e.util.remove_param(params, options.page_param);
    };

    var changed = function (event) {
        if (!ignore_event) {
            t11e.event.trigger('update_request.' + search_group, save_to_params);
        }
    };
    textbox.bind('change', changed);

    t11e.widget.jquery.util.associate_labels($, this);

    var clear_params_from_search = function (params) {
        t11e.util.remove_param(params, value_param);
        t11e.util.remove_param(params, options.page_param);
    };
    t11e.event.subscribe('clear_params_from_search.' + search_group, clear_params_from_search);
});


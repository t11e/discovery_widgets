/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview t11e.widget.jquery.TextBoxWidget definition
 */

t11e.util.define_namespace('t11e.widget.jquery');
if (false) {
    t11e.widget.jquery.prototype.Eclipse__Outline__Hack = undefined;
}

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
 * <div class="t11e-widget t11e-widget-jquery-textbox t11e-widget-id-2076">
 *  <div class="t11e-hd t11e-widget-jquery-textbox-hd"></div>
 *  <div class="t11e-bd t11e-widget-jquery-textbox-bd">
 *      <form action="" onsubmit="return false;">
 *          <input name="k">
 *      </form>
 *  </div>
 *  <div class="t11e-ft t11e-widget-jquery-textbox-ft"></div>
 * </div>
 * <script type="text/javascript">
 *  //<!--
 *      if ('undefined' === typeof t11e) { t11e = {}; }
 *      if ('undefined' === typeof t11e.widget_options) { t11e.widget_options = {}; }
 *      t11e.widget_options['2076'] = {
 *          "search_group": "vehicle",
 *          "value_param": "k"
 *      };
 *  //-->
 * </script>
 *
 * @name t11e.widget.jquery.TextBoxWidget
 * @class A textbox widget for keyword searches.
 */
t11e.widget.jquery.TextBoxWidget = function ($, options) {
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
        var val = $.trim(textbox.val());
        if ('' !== val) {
            params[value_param] = [val];
        } else {
            delete params[value_param];
        }
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
};

t11e.widget.jquery.make_jquery_ui_widget(jQuery,
    't11e_text_box', t11e.widget.jquery.TextBoxWidget);

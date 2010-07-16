/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview jQuery.ui.t11e_button definition
 */

t11e.util.define_namespace('t11e.widget.jquery');
if (false) {
    t11e.widget.jquery.prototype.Eclipse__Outline__Hack = undefined;
}

/**
 * <h2>Options</h2>
 * <dl>
 *    <dt>search_group</dt>
 *    <dd>The search group this widget is associated with.</dd>
 *
 *    <dt>event_name</dt>
 *    <dd>The event_name option is a template that is filled in with the rest of
 *       the options.</dd>
 * </dl>
 *
 * <h2>Example</h2>
 * <div class="t11e-widget-example"><!--
 *   <div id="example" class="t11e-widget t11e-widget-jquery-button">
 *     <div class="t11e-hd t11e-widget-jquery-button-hd"></div>
 *     <div class="t11e-bd t11e-widget-jquery-button-bd">
 *       <a href="#">Reset</a>
 *     </div>
 *     <div class="t11e-ft t11e-widget-jquery-button-ft"></div>
 *   </div>
 *   <script type="text/javascript">
 *     $("#example").t11e_button({
 *       "search_group": "default",
 *       "event_name": "reset_search"
 *     });
 *   </script>
 * --></div>
 *
 * Also available as t11e.widget.jquery.ButtonWidget.
 *
 * @name jQuery.ui.t11e_button
 * @class Implements a button that triggers a configured event.
 */
t11e.widget.jquery.ButtonWidget = function ($, options) {
    var event_name = $.template(options.event_name).apply(options);
    var button = $(this).find('.t11e-widget-jquery-button-bd:first a');

    button.bind('click', function (event) {
        t11e.event.trigger(event_name);
        event.preventDefault();
        event.stopPropagation();
    });
};

t11e.widget.jquery.make_jquery_ui_widget(jQuery,
    't11e_button', t11e.widget.jquery.ButtonWidget);

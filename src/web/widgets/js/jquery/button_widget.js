/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview t11e.widget.jquery.ButtonWidget definition
 */

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
 * <h2>Reset Search Example</h2>
 * <pre class="brush: html">
 * &lt;div class=&quot;t11e-widget t11e-widget-jquery-button t11e-widget-id-2041&quot;&gt;
 *  &lt;div class=&quot;t11e-hd t11e-widget-jquery-button-hd&quot;&gt;&lt;/div&gt;
 *  &lt;div class=&quot;t11e-bd t11e-widget-jquery-button-bd&quot;&gt;
 *      &lt;a href=&quot;#&quot;&gt;Reset&lt;/a&gt;
 *  &lt;/div&gt;
 *  &lt;div class=&quot;t11e-ft t11e-widget-jquery-button-ft&quot;&gt;&lt;/div&gt;
 * &lt;/div&gt;
 * &lt;script type=&quot;text/javascript&quot;&gt;
 *  //&lt;!--
 *      if (&#x27;undefined&#x27; === typeof t11e) {
 *          t11e = {};
 *      }
 *      if (&#x27;undefined&#x27; === typeof t11e.widget_options) {
 *          t11e.widget_options = {};
 *      }
 *      t11e.widget_options[&#x27;2041&#x27;] = {
 *          &quot;event_name&quot;: &quot;reset_search&quot;
 *      };
 *  //--&gt;
 * &lt;/script&gt;
 * </pre>
 * <h2>Clear Search Example</h2>
 * <pre class="brush: html">
 * &lt;div class=&quot;t11e-widget t11e-widget-jquery-button t11e-widget-id-2043&quot;&gt;
 *  &lt;div class=&quot;t11e-hd t11e-widget-jquery-button-hd&quot;&gt;&lt;/div&gt;
 *  &lt;div class=&quot;t11e-bd t11e-widget-jquery-button-bd&quot;&gt;
 *      &lt;a href=&quot;#&quot;&gt;Clear&lt;/a&gt;
 *  &lt;/div&gt;
 *  &lt;div class=&quot;t11e-ft t11e-widget-jquery-button-ft&quot;&gt;&lt;/div&gt;
 * &lt;/div&gt;
 * &lt;script type=&quot;text/javascript&quot;&gt;
 *  //&lt;!--
 *      if (&#x27;undefined&#x27; === typeof t11e) {
 *          t11e = {};
 *      }
 *      if (&#x27;undefined&#x27; === typeof t11e.widget_options) {
 *          t11e.widget_options = {};
 *      }
 *      t11e.widget_options[&#x27;2043&#x27;] = {
 *          &quot;event_name&quot;: &quot;clear_search.${search_group}&quot;,
 *          &quot;search_group&quot;: &quot;realestate&quot;
 *      };
 *  //--&gt;
 * &lt;/script&gt;
 * </pre>
 * @name t11e.widget.jquery.ButtonWidget
 * @class Implements a button that triggers a configured event.
 */
t11e.util.declare('t11e.widget.jquery.ButtonWidget', function ($) {
    var options = t11e.widget_options[$(this).attr('t11e-widget-id')];
    var event_name = $.template(options.event_name).apply(options);
    var button = $(this).find('.t11e-widget-jquery-button-bd:first a');

    button.bind('click', function (event) {
        t11e.event.trigger(event_name);
        event.preventDefault();
        event.stopPropagation();
    });
});

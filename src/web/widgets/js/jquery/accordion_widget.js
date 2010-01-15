/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview t11e.widget.jquery.AccordionWidget definition.
 */
/**
 * Widget to wrap any widget or html. Adds a window-shade behavior, and keeps
 * the children at top of page when scrolled with shade open behaviors.
 *
 * <h2>Options</h2>
 *
 * <dl>
 *     <dt>css_class</dt>
 *     <dd>An option CSS class to be applied to this widget instance to facilitate custom styling.</dd>
 *     <dt>contained_widget_height</dt>
 *     <dd>
 *         Optional CSS height for the inner content of this accordion.
 *         Default is 300px.
 *     </dd>
 *
 *     <dt>animation_length_ms</dt>
 *     <dd>Optional. Milliseconds for window shade open effect. Defaults to 500 ms.</dd>
 * </dl>
 * <h2>Sample HTML</h2>
 *<pre class="brush: html">
 * &lt;div class=&quot;t11e-widget t11e-widget-jquery-accordion t11e-widget-id-2082&quot;&gt;
 *  &lt;div class=&quot;t11e-widget-jquery-accordion-bd&quot;&gt;
 *      &lt;div class=&quot;accordion-top&quot;&gt;&lt;/div&gt;
 *      &lt;ol class=&quot;t11e-list-entries accordion-body&quot;&gt;
 *          &lt;li class=&quot;t11e-list-entry&quot;&gt;
 *              &lt;!-- Contained widget --&gt;
 *          &lt;/li&gt;
 *      &lt;/ol&gt;
 *      &lt;div class=&quot;accordion-bottom&quot;&gt;&lt;/div&gt;
 *  &lt;/div&gt;
 *  &lt;div class=&quot;t11e-widget-jquery-accordion-ft&quot;&gt;&lt;/div&gt;
 * &lt;/div&gt;
 * &lt;script type=&quot;text/javascript&quot;&gt;
 *  //&lt;!--
 *      if (&#x27;undefined&#x27; === typeof t11e) {
 *          t11e = {};
 *      }
 *      if (&#x27;undefined&#x27; === typeof t11e.widget_options) {
 *          t11e.widget_options = {};
 *      }
 *      t11e.widget_options[&#x27;2082&#x27;] = {
 *          &quot;animation_length_ms&quot;: 500,
 *          &quot;contained_widget_height&quot;: null
 *      };
 *  //--&gt;
 * &lt;/script&gt;
 *</pre>
 * @name t11e.widget.jquery.AccordionWidget
 * @class Implements window shade behavior.
 *
 */
t11e.util.declare('t11e.widget.jquery.AccordionWidget', function ($) {
    /** @private */
    var options = t11e.widget_options[$(this).attr('t11e-widget-id')];
    /** @private */
    var contained_widget_height = options.contained_widget_height || '300px';
    var animation_length_ms = options.animation_length_ms || 500;
    var container = $(this);
    var accordion = $(this).find('.t11e-widget-jquery-accordion-bd:first');
    // Find the first widget contained by the accordion
    var accordion_top = accordion.find('.accordion-top:first');
    var accordion_body = accordion.find('.accordion-body:first');
    var accordion_bottom = accordion.find('.accordion-bottom:first');
    var contained_widget = accordion_body.find('.t11e-widget:first');
    var is_open = false;
    // Capture the height of the accordion so the space will be preserved
    var place_holder_height = accordion.height();
    var original_top = accordion.offset().top;

    accordion_top.bind('click', function (event) {
        toggle_accordion();
    });

    accordion_bottom.bind('click', function (event) {
        toggle_accordion();
    });

    $(window).bind('scroll', function (event) {
        if (is_open) {
            scroll_top = $(window).scrollTop();
            container_top = original_top;
            accordion.animate({
                top: (scroll_top > container_top ? scroll_top - container_top : 0)
            }, {
                duration: 500,
                easing: 'linear',
                queue: false
            });
        }
    });

    var toggle_accordion = function () {
        if (is_open) {
            accordion_body.animate(
                {
                    height: 1
                },
                Number(animation_length_ms),
                'linear',
                function () {
                    accordion_body.css({display: 'none'});
                    accordion.css({top: 0});
                });
        } else {
            accordion_body.css({display: 'block'});
            accordion_body.animate(
                {
                    height: contained_widget_height
                },
                {
                    duration: Number(animation_length_ms),
                    easing: 'linear',
                    queue: false
                });
            // Trigger the change event on the contained widget
            // so that it can get updated now that it is visible.
            contained_widget.change();
        }
        is_open = !is_open;
    };

    var init = function () {
        container.height(place_holder_height);
        accordion.css({
            position: 'absolute'
        });
        if (t11e.util.is_defined(accordion.bgiframe)) {
            accordion.bgiframe();
        }
    };
    init();
});

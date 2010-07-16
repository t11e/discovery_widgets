/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview jQuery.ui.t11e_accordion definition.
 */

t11e.util.define_namespace('t11e.widget.jquery');
if (false) {
    t11e.widget.jquery.prototype.Eclipse__Outline__Hack = undefined;
}

/**
 * Widget to wrap any widget or html. Adds a window-shade behavior, and keeps
 * the children at top of page when scrolled with shade open behaviors.
 *
 * <h2>Options</h2>
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
 *
 * Also available as t11e.widget.jquery.AccordionWidget.
 *
 * <h2>Example</h2>
 * <div class="t11e-widget-example"><!--
 *   <div id="example" class="t11e-widget t11e-widget-jquery-accordion">
 *     <div class="t11e-widget-jquery-accordion-bd">
 *        <div class="t11e-accordion-top"></div>
 *        <ol class="t11e-list-entries t11e-accordion-body">
 *            <li class="t11e-list-entry">
 *                The contained widget goes here.
 *            </li>
 *        </ol>
 *        <div class="t11e-accordion-bottom"></div>
 *     </div>
 *     <div class="t11e-widget-jquery-accordion-ft"></div>
 *   </div>
 *   <script type="text/javascript">
 *     $('#example').t11e_accordion({
 *          "animation_length_ms": 500,
 *          "contained_widget_height": "100px"
 *      });
 *   </script>
 * --></div>
 *
 * @name jQuery.ui.t11e_accordion
 * @class Implements window shade behavior.
 *
 */
t11e.widget.jquery.AccordionWidget = function ($, options) {
    var contained_widget_height = options.contained_widget_height || '300px';
    var animation_length_ms = options.animation_length_ms || 500;
    var container = $(this);
    var accordion = $(this).find('.t11e-widget-jquery-accordion-bd:first');
    // Find the first widget contained by the accordion
    var accordion_top = accordion.find('.t11e-accordion-top:first');
    var accordion_body = accordion.find('.t11e-accordion-body:first');
    var accordion_bottom = accordion.find('.t11e-accordion-bottom:first');
    var contained_widget = accordion_body.find('.t11e-widget:first');
    var is_open = false;
    // Capture the height of the accordion so the space will be preserved
    var place_holder_height = accordion.height();
    var original_position = accordion.position().top;
    var original_offset = accordion.offset().top;
    var ie6 = $.browser.msie && $.browser.version.substr(0, 1) < 7;

    accordion_top.bind('click', function (event) {
        toggle_accordion();
    });

    accordion_bottom.bind('click', function (event) {
        toggle_accordion();
    });

    $(window).bind('scroll', function (event) {
        if (is_open) {
            scroll_top = $(window).scrollTop();
            if (!ie6) {
                if (original_offset < scroll_top + 2) {
                    accordion.css({
                        top: 1,
                        position: 'fixed'
                    });
                }
                else {
                    accordion.css({
                        top: original_position,
                        position: 'absolute'
                    });
                }
            }
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
                    accordion.css({
                        position: 'absolute',
                        top: original_position
                    });
                });
        } else {
            accordion_body.css({display: 'block'});
            var scroll_top = $(window).scrollTop();

            if (!ie6 && original_offset < scroll_top + 2) {
                accordion.css({
                    top: 1,
                    position: 'fixed'
                });
            }
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
};

t11e.widget.jquery.make_jquery_ui_widget(jQuery,
    't11e_accordion', t11e.widget.jquery.AccordionWidget);

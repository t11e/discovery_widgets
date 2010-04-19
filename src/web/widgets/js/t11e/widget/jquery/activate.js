/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview activate.js
 */
t11e.util.define_namespace('t11e.widget.jquery');
if (false) {
    t11e.widget.jquery.prototype.Eclipse__Outline__Hack = undefined;
}

t11e.widget.jquery.default_mappings = {
    '.t11e-widget-jquery-faceted-slider': 't11e_faceted_slider',
    '.t11e-widget-jquery-slider': 't11e_slider',
    '.t11e-widget-jquery-dual-slider': 't11e_dual_slider',
    '.t11e-widget-jquery-faceted-dual-slider': 't11e_faceted_dual_slider',
    '.t11e-widget-jquery-response': 't11e_response',
    '.t11e-widget-jquery-results': 't11e_results',
    '.t11e-widget-jquery-pagination': 't11e_pagination',
    '.t11e-widget-jquery-select': 't11e_select',
    '.t11e-widget-jquery-faceted-checkboxes': 't11e_faceted_checkboxes',
    '.t11e-widget-jquery-textbox': 't11e_text_box',
    '.t11e-widget-jquery-params': 't11e_params',
    '.t11e-widget-jquery-faceted-flyout': 't11e_faceted_flyout',
    '.t11e-widget-jquery-google-map': 't11e_google_map',
    '.t11e-widget-jquery-button': 't11e_button',
    '.t11e-widget-jquery-accordion': 't11e_accordion',
    '.t11e-widget-jquery-breadcrumb': 't11e_breadcrumb',
    '.t11e-widget-jquery-location': 't11e_location',
    '.t11e-jquery-ui-geocode': 't11e_geocode'
};

/**
 * All jQuery widgets need to be activated prior to their use, which is
 * accomplished by a call to the {@link t11e.widget.jquery.activate_widgets}
 * function in this module.
 * <p>
 *    Hooks up all UI elements to their
 *    JavaScript counterparts and creates the various helper objects that
 *    are used to dispatch search.
 *
 * @param $ jQuery
 */
t11e.widget.jquery.activate_widgets = function ($, widget_mappings) {
    if (t11e.util.is_undefined(widget_mappings)) {
        widget_mappings = t11e.widget.jquery.default_mappings;
    }
    var widgets = $('.t11e-widget');
    widgets.each(function () {
        t11e.widget.jquery.util.bind_widget_id.call(this, $);
    });
    $.each(widget_mappings, function (selector, widget_name) {
        var widget_fn = $.fn[widget_name];
        if (t11e.util.is_undefined(widget_fn)) {
            t11e.util.error('Undefined widget', widget_name, 'for widget selector', selector);
        } else {
            widgets.filter(selector).each(function () {
                try {
                    var options;
                    var widget_id = $(this).attr('t11e-widget-id');
                    if (t11e.util.is_defined(widget_id) &&
                        t11e.util.is_defined(t11e.widget_options)) {
                        options = t11e.widget_options[widget_id];
                    }
                    if (t11e.util.is_undefined(options)) {
                        options = {};
                    }
                    var pre_init = options.pre_init;
                    if (!t11e.util.is_function(pre_init)) {
                        pre_init = t11e.util.deref(window, pre_init);
                    }
                    if (t11e.util.is_defined(pre_init)) {
                        pre_init($, options);
                    }
                    widget_fn.call($(this), options);
                } catch (e) {
                    t11e.util.error('Problem creating widget', this, fn, e);
                }
            });
        }
    });
};

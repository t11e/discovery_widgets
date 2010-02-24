/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview activate.js
 */
t11e.util.define_namespace('t11e.widget.jquery');
if (false) {
    t11e.widget.jquery.prototype.Eclipse__Outline__Hack = undefined;
}

t11e.widget.jquery.default_mappings = {
    '.t11e-widget-jquery-faceted-slider': 't11e.widget.jquery.FacetedSliderWidget',
    '.t11e-widget-jquery-slider': 't11e.widget.jquery.SliderWidget',
    '.t11e-widget-jquery-dual-slider': 't11e.widget.jquery.DualSliderWidget',
    '.t11e-widget-jquery-faceted-dual-slider': 't11e.widget.jquery.FacetedDualSliderWidget',
    '.t11e-widget-jquery-response': 't11e.widget.jquery.ResponseWidget',
    '.t11e-widget-jquery-results': 't11e.widget.jquery.ResultsWidget',
    '.t11e-widget-jquery-pagination': 't11e.widget.jquery.PaginationWidget',
    '.t11e-widget-jquery-select': 't11e.widget.jquery.SelectWidget',
    '.t11e-widget-jquery-faceted-checkboxes': 't11e.widget.jquery.FacetedCheckboxesWidget',
    '.t11e-widget-jquery-textbox': 't11e.widget.jquery.TextBoxWidget',
    '.t11e-widget-jquery-params': 't11e.widget.jquery.ParamsWidget',
    '.t11e-widget-jquery-faceted-flyout': 't11e.widget.jquery.FacetedFlyoutWidget',
    '.t11e-widget-jquery-google-map': 't11e.widget.jquery.GoogleMapWidget',
    '.t11e-widget-jquery-button': 't11e.widget.jquery.ButtonWidget',
    '.t11e-widget-jquery-accordion': 't11e.widget.jquery.AccordionWidget'
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
    widgets.each(t11e.widget.jquery.util.call_with_jquery_fn($,
            t11e.widget.jquery.util.bind_widget_id));
    $.each(widget_mappings, function (selector, orig_fn) {
        var fn = orig_fn;
        if (!t11e.util.is_function(fn)) {
            fn = t11e.util.deref(window, fn);
        }
        if (t11e.util.is_defined(fn)) {
            widgets.filter(selector).each(t11e.widget.jquery.util.call_with_jquery_fn($, fn));
        } else {
            t11e.util.error('Invalid function for widget selector', selector, orig_fn);
        }
    });
};

t11e.util.define_namespace('t11e.widget.jquery');
if (false) {
    t11e.widget.jquery.prototype.Eclipse__Outline__Hack = undefined;
}

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
t11e.widget.jquery.activate_widgets = function ($) {
    /**@scope t11e.widget.jquery.activate_widgets*/
    /**
     * Creates a 't11e-widget-id' attribute on the widgets base
     * 'div' element and sets the appropriate widget id value.
     */
    var bind_widget_id = function () {
        if (t11e.util.is_undefined($(this).attr('t11e-widget-id'))) {
            /*jslint regexp: false */
            var matches = /t11e-widget-id-([^ ]+)/.exec($(this).attr('class'));
            if (matches && matches.length === 2) {
                var fake_class = matches[0];
                var widget_id = matches[1];
                $(this).removeClass(fake_class);
                $(this).attr('t11e-widget-id', widget_id);
            }
        }
    };
    /**
    * Function to instantiate jQuery widgets that pass a reference
    * to jQuery.
    * @param {Function} fn widget constructor
    */
    var call_with_jquery = function (fn) {
        return function () {
            try {
                bind_widget_id.call(this);
                return fn.call(this, $);
            } catch (e) {
                t11e.util.error('Problem setting up widget', fn, e);
            }
        };
    };
    /**
    * Activate jQuery widgets.
    */
    $('.t11e-widget-jquery-slider').each(call_with_jquery(
        t11e.widget.jquery.SliderWidget));
    $('.t11e-widget-jquery-dual-slider').each(call_with_jquery(
        t11e.widget.jquery.DualSliderWidget));
    $('.t11e-widget-jquery-response').each(call_with_jquery(
        t11e.widget.jquery.ResponseWidget));
    $('.t11e-widget-jquery-results').each(call_with_jquery(
        t11e.widget.jquery.ResultsWidget));
    $('.t11e-widget-jquery-pagination').each(call_with_jquery(
        t11e.widget.jquery.PaginationWidget));
    $('.t11e-widget-jquery-faceted-checkboxes').each(call_with_jquery(
        t11e.widget.jquery.FacetedCheckboxesWidget));
    $('.t11e-widget-jquery-textbox').each(call_with_jquery(
        t11e.widget.jquery.TextBoxWidget));
    $('.t11e-widget-jquery-params').each(call_with_jquery(
        t11e.widget.jquery.ParamsWidget));
    $('.t11e-widget-jquery-faceted-flyout').each(call_with_jquery(
        t11e.widget.jquery.FacetedFlyoutWidget));
    $('.t11e-widget-jquery-google-map').each(call_with_jquery(
        t11e.widget.jquery.GoogleMapWidget));
    $('.t11e-widget-jquery-button').each(call_with_jquery(
        t11e.widget.jquery.ButtonWidget));
    $('.t11e-widget-jquery-accordion').each(call_with_jquery(
        t11e.widget.jquery.AccordionWidget));
};

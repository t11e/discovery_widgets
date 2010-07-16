/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview Styled Checkboxes
 * Based on: http://filamentgroup.com/lab/accessible_custom_designed_checkbox_radio_button_inputs_styled_css_jquery/
 */

/**
 * Accessible custom designed checkbox/radio button inputs.
 *
 * <h2>Example</h2>
 * <div class="t11e-widget-example"><!--
 *   <div id="example">
 *     <fieldset>
 *       <div class="t11e-input-row">
 *         <input id="cars" type="checkbox" name="c" value="cars" />
 *         <label for="cars">Cars</label>
 *       </div>
 *       <div class="t11e-input-row">
 *         <input id="motorcycles" type="checkbox" name="c" value="motorcycles" />
 *         <label for="motorcycles">Motorcycles</label>
 *       </div>
 *       <div class="t11e-input-row">
 *         <input id="suvs" type="checkbox" name="c" value="suvs" />
 *         <label for="suvs">SUV</label>
 *       </div>
 *       <div class="t11e-input-row">
 *         <input id="trucks" type="checkbox" name="c" value="trucks" />
 *         <label for="trucks">Trucks</label>
 *       </div>
 *       <div class="t11e-input-row">
 *         <input id="vans" type="checkbox" name="c" value="vans" />
 *         <label for="vans">Vans</label>
 *       </div>
 *     </fieldset>
 *   </div>
 *   <script type="text/javascript">
 *     $("#example").t11e_styled_checkboxes();
 *   </script>
 * --></div>
 *
 * @name jQuery.ui.t11e_styled_checkboxes
 * @class Accessible custom designed checkbox/radio button inputs
 */
(function ($) {
    $.t11e_widget('t11e_styled_checkboxes', {
        input_selector: 'input',
        row_class: 't11e-input-row'
    });

    /*jslint nomen: false */
    $.ui.t11e_styled_checkboxes.prototype._init = function () {
        var self = this;
        var inputs = self.element.find(self.options.input_selector);

        inputs.each(function (i, target) {

            if ($(target).is('[type="checkbox"],[type="radio"]')) {
                var input = $(target);
                // get the associated label using the input's id
                var label = self.element.find('label[for="' + input.attr('id') + '"]');

                //get type, for classname suffix
                var input_type = (input.is('[type="checkbox"]')) ? 'checkbox' : 'radio';

                // Deal with legacy faceted checkbox widget code that wraps inputs in divs.
                var parent = input.parent();
                if (parent[0].tagName === 'DIV') {
                    parent.addClass(self.options.row_class + ' t11e-' + input_type);
                } else {
                    // wrap the input + label in a div
                    parent = $('<div/>')
                        .attr('class', self.options.row_class + ' t11e-' + input_type)
                        .insertBefore(input);
                    parent.append(input);
                    parent.append(label);
                }

                // find all inputs in this set using the shared name attribute
                var all_inputs = self.element.find('input[name="' + input.attr('name') + '"]');

                // necessary for browsers that don't support the :hover pseudo class on labels
                label.hover(
                    function () {
                        label.addClass('ui-state-hover');
                        if (input_type === 'checkbox' && input.is(':checked')) {
                            label.addClass('ui-state-checked-hover');
                        }
                    },
                    function () {
                        label.removeClass('ui-state-hover ui-state-checked-hover');
                    }
                );

                // Apply classes to label tags so state can be visually represented
                input.bind('update_state', function () {
                    if (input.is(':checked')) {
                        if (input.is(':radio')) {
                            all_inputs.each(function (i, target) {
                                self.element.find('label[for="' + $(target).attr('id') + '"]')
                                    .removeClass('ui-state-checked');
                            });
                        }
                        label.addClass('ui-state-checked');
                    }
                    else {
                        label.removeClass('ui-state-checked ui-state-checked-hover ui-state-checked-focus');
                    }
                });
                input.trigger('update_state');
                input.bind('click', function () {
                    input.trigger('update_state');
                });
                input.bind('focus', function () {
                    label.addClass('ui-state-focus');
                    if (input_type === 'checkbox' && input.is(':checked')) {
                        label.addClass('ui-state-checked-focus');
                    }
                });
                input.bind('blur', function () {
                    label.removeClass('ui-state-focus ui-state-checked-focus');
                });
            }
        });
    };
}(jQuery));



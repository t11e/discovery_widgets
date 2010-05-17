/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview Geocode widget definition
 * Based on: http://filamentgroup.com/lab/accessible_custom_designed_checkbox_radio_button_inputs_styled_css_jquery/
 */
(function ($) {
    var options = {
        input_selector: 'form input',
        row_class: 't11e-input-row'
    };
    $.widget('ui.t11e_styled_checkboxes', {options: options});
    $.ui.t11e_styled_checkboxes.defaults = options;

    /*jslint nomen: false */
    $.ui.t11e_styled_checkboxes.prototype._init = function () {
        var self = this;
        var inputs = self.element.find(self.options.input_selector);

        inputs.each(function (i, target) {

            if ($(target).is('[type=checkbox],[type=radio]')) {
                var input = $(target);

                // get the associated label using the input's id
                var label = $('label[for=' + input.attr('id') + ']');

                //get type, for classname suffix
                var input_type = (input.is('[type=checkbox]')) ? 'checkbox' : 'radio';

                // Deal with legacy faceted checkbox widget code that wraps inputs in divs.
                var parent = input.parent();
                if (parent[0].tagName === 'DIV') {
                    parent.addClass(self.options.row_class + ' t11e-' + input_type);
                } else {
                    // wrap the input + label in a div
                    parent = $('<div class="' + self.options.row_class + ' t11e-' + input_type + '"></div>').insertBefore(input).append(input, label);
                }

                // find all inputs in this set using the shared name attribute
                var all_inputs = self.element.find('input[name=' + input.attr('name') + ']');

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
                                $('label[for=' + $(target).attr('id') + ']').removeClass('ui-state-checked');
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



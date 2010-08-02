/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview $.t11e_single_autocomplete definition
 */

/**
 * Autocomplete search widget that extends the t11e_textbox widget to
 * provide autocomplete functionality for a single term.
 *
 * <h2>Options</h2>
 * Passes through options to both t11e_autocomplete and t11e_textbox.
 *
 * <h2>Example</h2>
 * <div class="t11e-widget-example"><!--
 *   <input id="example" name="k">
 *   <script type="text/javascript">
 *     $('#example').t11e_single_autocomplete({
 *       'search_group': 'default',
 *       'value_param': 'myparam',
 *       'source': ['Orange', 'Apple', 'Banana', 'Pear', 'Strawberry', 'Peach', 'Kiwi', 'Mango', 'Pineapple']
 *     });
 *   </script>
 * --></div>
 *
 * @name jQuery.ui.t11e_single_autocomplete
 * @class Autocomplete search widget that extends the t11e_textbox widget to provide autocomplete functionality for a single term.
 */
(function ($) {
    var options = {
    };
    $.widget('ui.t11e_single_autocomplete', {options: options});
    $.ui.t11e_single_autocomplete.defaults = options;

    /*jslint nomen: false */
    $.ui.t11e_single_autocomplete.prototype._init = function () {
        var self = this;
        self.element.t11e_autocomplete($.extend({}, self.options, {
            'select': function (event, ui) {
                $(self.element).change();
            }
        }));
        self.element.t11e_textbox(self.options);
    };
}(jQuery));

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
 *   <div id="example" class="t11e-widget t11e-widget-jquery-single-autocomplete">
 *    <div class="t11e-hd t11e-widget-jquery-single-autocomplete-hd"></div>
 *    <div class="t11e-bd t11e-widget-jquery-single-autocomplete-bd">
 *      <form action="" onsubmit="return false;">
 *        <input name="k">
 *      </form>
 *    </div>
 *    <div class="t11e-ft t11e-widget-jquery-single-autocomplete-ft"></div>
 *   </div>
 *   <script type="text/javascript">
 *     $('#example').t11e_single_autocomplete({
 *       'search_group': 'default',
 *       'value_param': 'myparam',
 *       'source': '/autocomplete',
 *       'source_params': {'listlength': 3}
 *     });
 *   </script>
 * --></div>
 * @name jQuery.ui.t11e_single_autocomplete
 * @class A widget for single select autocomplete.
 */
(function ($) {
    $.widget('ui.t11e_single_autocomplete', {});
    $.ui.t11e_single_autocomplete.defaults = {
    };

    /*jslint nomen: false */
    $.ui.t11e_single_autocomplete.prototype._init = function () {
        var self = this;
        var autocomplete = $(self.element).find('input:first');
        autocomplete.t11e_autocomplete(self.options);
        autocomplete.bind('autocompleteselect', function (event, ui) {
            autocomplete.change();
        });
        $(self.element).t11e_textbox(self.options);
    };

    $.ui.t11e_single_autocomplete.prototype.destroy = function () {
        this.element.unbind();
        $.widget.prototype.destroy.apply(this, arguments);
    };
}(jQuery));

/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview $.t11e_autocomplete definition
 */

/**
 * Autocomplete widget, based on jQuery UI Autocomplete.
 * <h2>Example</h2>
 * <div class="t11e-widget-example"><!--
 *   <input id='exampleAutoComplete'/>
 *   <script type="text/javascript">
 *     $('#exampleAutoComplete').t11e_autocomplete({
 *       'source': '/autocomplete',
 *       'source_params': {'listlength': 3}
 *     });
 *   </script>
 * --></div>
 * @name jQuery.ui.t11e_autocomplete
 * @class A widget for single select autocomplete.
 */
(function ($) {
    $.widget('ui.t11e_autocomplete', {});
    $.ui.t11e_autocomplete.defaults = {
        'source_params': {}
    };

    /*jslint nomen: false */
    $.ui.t11e_autocomplete.prototype._init = function () {
        var self = this;
        $(self.element).autocomplete($.extend({}, self.options.source, {
            'source': $.t11e_local_caching_json_source(self.options.source, self.options.source_params)
        }));
    };

    $.ui.t11e_autocomplete.prototype.destroy = function () {
        this.element.unbind();
        $.widget.prototype.destroy.apply(this, arguments);
    };
}(jQuery));

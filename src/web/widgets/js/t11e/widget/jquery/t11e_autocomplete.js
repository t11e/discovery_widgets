/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview jQuery.ui.t11e_autocomplete definition
 */

/**
 * Autocomplete widget that extends the jQuery UI Autocomplete widget to add
 * client side caching and server side parameter pass through.
 *
 * <h2>Options</h2>
 * <dl>
 *   <dt>source</dt>
 *   <dd>
 *     The source to use, either an Array, URL or function. If this
 *     is not an array then caching is enabled.
 *   </dd>
 *   <dt>source_params</dt>
 *   <dd>
 *     Option dictionary of parameters to pass through to the original source
 *     if the source is not an Array.
 *   </dd>
 * </dl>
 *
 * For other options, see:
 * <a href="http://docs.jquery.com/UI/Autocomplete">http://docs.jquery.com/UI/Autocomplete</a>
 *
 * <h2>Example</h2>
 * <div class="t11e-widget-example"><!--
 *   <input id='example'/>
 *   <script type="text/javascript">
 *     $('#example').t11e_autocomplete({
 *       'source': ['Orange', 'Apple', 'Banana', 'Pear', 'Strawberry', 'Peach', 'Kiwi', 'Mango', 'Pineapple']
 *     });
 *   </script>
 * --></div>
 * @name jQuery.ui.t11e_autocomplete
 * @class Autocomplete widget that extends the jQuery UI Autocomplete widget to add client side caching and server side parameter pass through.
 */
(function ($) {
    var options = {
        'source_params': {}
    };
    $.widget('ui.t11e_autocomplete', {options: options});
    $.ui.t11e_autocomplete.defaults = options;

    /*jslint nomen: false */
    $.ui.t11e_autocomplete.prototype._init = function () {
        var self = this;
        $(self.element).autocomplete($.extend({}, self.options, {
            'source': $.t11e_local_caching_json_source(self.options.source, self.options.source_params)
        }));
    };
}(jQuery));

/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview jQuery.t11e_widget
 */

/**
 * Wrapper around jQuery.widget that is compatible with both jQuery UI 1.7
 * and 1.8
 *
 * @name  jQuery.t11e_widget
 * @class Transparensee specific widget factory.
 */
(function ($) {
    // 1.7 - name, prototype
    // 1.8 - name, base, prototype
    $.t11e_widget = function (name, base, options) {
        if (!options) {
            options = base;
            base = $.Widget;
        }
        if ($.ui.version === '1.7') {
            $.widget('ui.' + name, {});
            $.ui[name].defaults = options;
        } else {
            $.widget('ui.' + name, base, {'options': options});
        }
    };
}(jQuery));

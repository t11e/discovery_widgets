/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview Breadcrumb definition
 */

/**
 * Widget for displaying per search parameter breadcrumbs.
 *
 * <h2>Options</h2>
 * <dl>
 *    <dt>value_params</dt>
 *    <dd>Array of parameters that breadcrumbs should be displayed for.</dd>
 * </dl>
 *
 * <h2>Example</h2>
 * <div class="t11e-widget-example"><!--
 *   <div id="example" class="t11e-widget t11e-widget-jquery-breadcrumb">
 *     <div class="t11e-hd t11e-widget-jquery-breadcrumb-hd"></div>
 *     <div class="t11e-bd t11e-widget-jquery-breadcrumb-bd"></div>
 *     <div class="t11e-ft t11e-widget-jquery-breadcrumb-ft"></div>
 *   </div>
 *   <script type="text/javascript">
 *     $("#example").t11e_breadcrumb({
 *       "search_group": "history",
 *       "value_params": ["a", "b", "c"]
 *     });
 *     // For example purposes only, change the hash to create some
 *     // breadcrumbs.
 *     window.location.hash = "&a=example%20breadcrumb&b=another%20one";
 *   </script>
 * --></div>
 *
 * @name jQuery.ui.t11e_breadcrumb
 * @class A widget for displaying per search parameter breadcrumbs.
 */
(function ($) {
    var options = {
            search_group: 'default',
            page_param: 'page',
            value_params: [],
            close_template: '&nbsp;[<a class="t11e-close" href="#">x</a>]',
            container: '.t11e-widget-jquery-breadcrumb-bd',
            animate: false,
            animation_speed: 'fast'
        };
    $.widget('ui.t11e_breadcrumb', { options: options });
    $.ui.t11e_breadcrumb.defaults = options;

    /*jslint nomen: false */
    $.ui.t11e_breadcrumb.prototype._init = function () {
        var self = this;

        t11e.event.subscribe('request.' + self.options.search_group, function (params) {
            self._load_params(params);
        });

        t11e.event.subscribe('clear_params_from_search.' + self.options.search_group, function (params) {
            self._clear_params(params);
        });
    };

    $.ui.t11e_breadcrumb.prototype._load_params = function (params) {
        var self = this;
        if (t11e.util.is_defined(self.options.value_params)) {
            $.each(self.options.value_params, function (i, param) {
                var crumbs = self._get_breadcrumbs(param);
                values = params[param];
                if (t11e.util.is_undefined(values)) {
                    values = [];
                }
                crumbs.each(function (i, crumb) {
                    var crumb_param = $(crumb).attr('param');
                    var crumb_value = $(crumb).attr('value');
                    var remove = (-1 === $.inArray(crumb_value, values));
                    if (remove) {
                        self.remove_breadcrumb(params, crumb_param, crumb_value);
                    }
                });
                $.each(values, function (i, value) {
                    self.add_breadcrumb(param, value);
                });
            });
        }
    };

    $.ui.t11e_breadcrumb.prototype._clear_params = function (params) {
        var self = this;
        $.each(self.options.value_params, function (i, param) {
            var values = self._get_param_values(param);
            $.each(values, function (i, value) {
                self.remove_breadcrumb(params, param, value);
            });
        });
    };

    $.ui.t11e_breadcrumb.prototype._get_breadcrumb = function (param, value) {
        return this.element.find('div[param=' + param + '][value=' + value + ']');
    };

    $.ui.t11e_breadcrumb.prototype._get_breadcrumbs = function (param) {
        return this.element.find('div[param=' + param + ']');
    };

    $.ui.t11e_breadcrumb.prototype._get_param_values = function (param) {
        var crumbs = this.element.find('div[param=' + param + ']');
        var results =  $.map(crumbs, function (item, i) {
            return $(item).attr('value');
        });
        return results;
    };

    $.ui.t11e_breadcrumb.prototype.add_breadcrumb = function (param, value) {
        var self = this;
        var breadcrumb = self.element.find(self.options.container);
        var crumb = self._get_breadcrumb(param, value);
        if (crumb.size() === 0) {
            crumb = $('<div class="t11e-breadcrumb ui-state-default ui-corner-all" param="' +
                param + '" value="' + value + '">' + value + self.options.close_template + '</div> ');
            crumb.hover(
                function () {
                    $(this).addClass("ui-state-hover");
                },
                function () {
                    $(this).removeClass("ui-state-hover");
                }
            );
            if (self.options.animate) {
                crumb.hide().appendTo(breadcrumb).fadeIn(self.options.animation_speed);
            } else {
                crumb.appendTo(breadcrumb);
            }

            var crumb_anchor = crumb.find('a:first');
            crumb_anchor.bind('click', function () {
                var crumb_param = crumb.attr('param');
                var crumb_value = crumb.attr('value');
                t11e.event.trigger('update_request.' + self.options.search_group, function (params) {
                    self.remove_breadcrumb(params, crumb_param, crumb_value);
                    t11e.util.remove_param(params, self.options.page_param);
                });
                return false;
            });
        }
    };

    $.ui.t11e_breadcrumb.prototype.remove_breadcrumb = function (params, param, value) {
        var self = this;
        var crumb = self._get_breadcrumb(param, value);
        if (self.options.animate) {
            crumb.fadeOut(self.options.animation_speed, function () {
                $(self).remove();
            });
        } else {
            crumb.remove();
        }
        t11e.util.remove_param_value(params, param, value);
    };

    $.ui.t11e_breadcrumb.prototype.destroy = function () {
        var self = this;
        this.element.unbind();
        $.widget.prototype.destroy.apply(this, arguments);
    };
}(jQuery));

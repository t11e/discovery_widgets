/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview Breadcrumb definition
 */

(function ($) {
    $.widget('ui.t11e_breadcrumb', {});

    $.ui.t11e_breadcrumb.defaults = {
        search_group: 'default',
        page_param: 'page',
        value_params: [],
        close_template: '&nbsp;[<a class="t11e-close" href="#">x</a>]',
        container: '.t11e-widget-jquery-breadcrumb-bd',
        animate: false,
        animation_speed: 'fast'
    };

    /*jslint nomen: false */
    $.ui.t11e_breadcrumb.prototype._init = function () {
        var self = this;

        var add_breadcrumb = function (param, value) {
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
                        remove_breadcrumb(params, crumb_param, crumb_value);
                        t11e.util.remove_param(params, self.options.page_param);
                    });
                    return false;
                });
            }
        };

        var remove_breadcrumb = function (params, param, value) {
            var crumb = self._get_breadcrumb(param, value);
            if (self.options.animate) {
                crumb.fadeOut(self.options.animation_speed, function () {
                    $(this).remove();
                });
            } else {
                crumb.remove();
            }
            t11e.util.remove_param_value(params, param, value);
        };

        var load_from_params = function (params) {
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
                            remove_breadcrumb(params, crumb_param, crumb_value);
                        }
                    });
                    $.each(values, function (i, value) {
                        add_breadcrumb(param, value);
                    });
                });
            }
        };
        t11e.event.subscribe('request.' + self.options.search_group, load_from_params);

        var clear_params_from_search = function (params) {
            $.each(self.options.value_params, function (i, param) {
                var values = self._get_param_values(param);
                $.each(values, function (i, value) {
                    remove_breadcrumb(params, param, value);
                });
            });
        };
        t11e.event.subscribe('clear_params_from_search.' + self.options.search_group, clear_params_from_search);
    };

    $.ui.t11e_breadcrumb.prototype._get_breadcrumb = function (param, value) {
        return this.element.find('div[param=' + param + '][value=' + value + ']');
    };

    $.ui.t11e_breadcrumb.prototype._get_breadcrumbs = function (param) {
        return this.element.find('div[param=' + param + ']');
    };

    $.ui.t11e_breadcrumb.prototype._get_param_values = function (param) {
        var crumbs = this.find('div[param=' + param + ']');
        var results =  $.map(crumbs, function (item, i) {
            return $(item).attr('value');
        });
        return results;
    };

    $.ui.t11e_breadcrumb.prototype.destroy = function () {
        var self = this;
        this.element.unbind();
        $.widget.prototype.destroy.apply(this, arguments);
    };
}(jQuery));
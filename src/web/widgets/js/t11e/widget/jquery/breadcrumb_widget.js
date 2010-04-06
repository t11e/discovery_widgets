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
        animate: false,
        animation_speed: 'fast'
    };

    /*jslint nomen: false */
    $.ui.t11e_breadcrumb.prototype._init = function () {
        var self = this;
        var breadcrumb = self.element.find('.t11e-widget-jquery-breadcrumb-bd');

        var add_breadcrumb = function (param, value) {
            var crumb = self.element.find('div[param=' + param + '][value=' + value + ']');
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
                    var crumb_param = $(this).parent().attr('param');
                    var crumb_value = $(this).parent().attr('value');
                    t11e.event.trigger('update_request.' + self.options.search_group, function (params) {
                        remove_breadcrumb(params, crumb_param, crumb_value);
                        t11e.util.remove_param(params, self.options.page_param);
                    });
                    return false;
                });
            }
        };

        var remove_breadcrumb = function (params, param, value) {
            var crumb = breadcrumb.find('div[param=' + param + '][value=' + value + ']');
            if (self.options.animate) {
                crumb.fadeOut(self.options.animation_speed, function () {
                    $(this).remove();
                });
            } else {
                crumb.remove();
            }
            remove_facet_from_params(params, param, value);
        };

        var remove_facet_from_params = function (params, param, value) {
            var values = params[param];
            if (t11e.util.is_defined(values)) {
                params[param] = $.grep(values, function (v, i) {
                    return v !== value;
                });
            }
        };

        var load_from_params = function (params) {
            ignore_event = true;
            try {
                if (t11e.util.is_defined(self.options.value_params)) {
                    $.each(self.options.value_params, function (i, param) {
                        var crumbs = breadcrumb.find('div[param=' + param + ']');
                        values = params[param];
                        if (t11e.util.is_undefined(values)) {
                            values = [];
                        }
                        $.each(values, function (i, value) {
                            add_breadcrumb(param, value);
                        });
                        crumbs.each(function (i, crumb) {
                            var crumb_param = $(crumb).attr('param');
                            var crumb_value = $(crumb).attr('value');
                            var remove = (-1 === $.inArray(crumb_value, values));
                            if (remove) {
                                remove_breadcrumb(params, crumb_param, crumb_value);
                            }
                        });
                    });
                }
            } finally {
                ignore_event = false;
            }
        };
        t11e.event.subscribe('request.' + self.options.search_group, load_from_params);

        var clear_params_from_search = function (params) {
            $.each(self.options.value_params, function (i, param) {
                var values = self.param_values(param);
                $.each(values, function (i, value) {
                    remove_breadcrumb(params, param, value);
                });
            });
        };
        t11e.event.subscribe('clear_params_from_search.' + self.options.search_group, clear_params_from_search);
    };

    $.ui.t11e_breadcrumb.prototype.param_values = function (param) {
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
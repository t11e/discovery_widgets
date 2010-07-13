/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview $.t11e_local_caching_json_source definition
 */

/**
 * Caching JSON data source, useful to drive a jQuery UI Autocomplete widget.
 * e.g.
 * $(':input').autocomplete({'source': $.t11e_local_caching_json_source('/mysource')});
 */
(function ($) {
    var source_as_fn = function (source, params) {
        var result;
        if ($.isArray(source)) {
            result = undefined;
        } else if (typeof source === "string") {
            result = function (request, response) {
                var actual_request = $.extend({}, params, request);
                $.getJSON(source, actual_request, response);
            };
        } else {
            result = function (request, response) {
                var actual_request = $.extend({}, params, request);
                source(actual_request, response);
            };
        }
        return result;
    };

    $.t11e_local_caching_json_source = function (source, params) {
        var output = source;
        var fn_source = source_as_fn(source, params);
        if (t11e.util.is_defined(fn_source)) {
            var cache = {};
            output = function (request, response) {
                var term = request.term;
                if (term in cache) {
                    var hit = cache[term];
                    if (t11e.util.is_defined(response))
                    {
                        response(hit);
                    }
                } else {
                    fn_source(request, function (result) {
                        cache[term] = result;
                        if (t11e.util.is_defined(response))
                        {
                            response(result);
                        }
                    });
                }
            };
        }
        return output;
    };
}(jQuery));

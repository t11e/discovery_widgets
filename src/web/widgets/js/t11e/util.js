t11e.util.define_namespace('t11e.util');

/**
 * @name t11e.util
 * @namespace
 */

/**
 * @name t11e.util.is_defined
 * @function
 * @param {Object} arg
 */
t11e.util.is_defined = function (arg) {
    return ! t11e.util.is_undefined(arg);
};

/**
 * <p>The t11e.widget namespace encapsulates all widget implementations. The widget
 * implementations themselves are decoupled from the event handing in the {@link t11e.event}
 * module and the page controller in the {@link t11e.widget.activate_search_page} module.</p>
 *
 * <p>The current widgets are implemented using jQuery, and use the {@link t11e.widget.jquery} namespace.</p>
 *
 * @name t11e.widget
 * @namespace
 * Module that contains various Ajax based UI widgets.
 */

/**
 * <h2>Core Widget Options</h2>
 *
 * All widgets have the following options available:
 *
 * <dl>
 * <dt>name</dt>
 * <dd>Widget instances have a name, which is an identifier that is not displayed in the rendered template.</dd>
 *
 * <dt>title</dt>
 * <dd>The 'title' is used in the header of the widget template and is intended to be displayed on the page.</dd>

 * <dt>css_class</dt>
 * <dd>An option CSS class to be applied to this widget instance to facilitate custom styling. The following is
 * and example that shows where the title and css_class are placed in a standard widget template:
 *
 * <pre class="brush: html">
 * &lt;div class=&quot;t11e-widget t11e-widget-jquery-slider { css_class }
 *     t11e-widget-id-1234&quot;&gt;
 *   &lt;div class=&quot;t11e-hd t11e-widget-jquery-slider-hd&quot;&gt;{ title }
 *   &lt;div class=&quot;t11e-bd t11e-widget-jquery-slider-bd&quot;&gt;
 *       &lt;div class=&quot;amount&quot;&gt;&lt;/div&gt;
 *       &lt;div class=&quot;slider-control&quot;&gt;&lt;/div&gt;
 *   &lt;/div&gt;
 *   &lt;div class=&quot;t11e-ft t11e-widget-jquery-slider-ft&quot;&gt;&lt;/div&gt;
 * &lt;/div&gt;
 * </pre>
 * </dd>
 *
 * <dt>search_group</dt>
 * <dd>Widgets are associated with a 'search_group' and this makes it possible to have different sets of widgets on a
 *     page that are associated with different searches. Widgets use their search group when subscribing to topics, as
 *     well as when triggering events. For example, when a search widget is updated in the UI, it triggers an update_request
 *     event, passing the 'search_group' name and a callback function:
 * <pre class="code">
 *    t11e.event.trigger('update_request.' + search_group, save_to_params);
 *</pre>
 *</dd>
 *</dl>
 *
 * @name t11e.widget.jquery
 * @namespace
 * Module that contains various jQuery specific Ajax based UI widgets.
 */

/**
 * Decodes params from a query string.
 *
 * @name t11e.util.decode_params
 * @function
 * @param {Object} query_string
 * @returns {Object} parsed
 */
t11e.util.decode_params = function (query_string) {
    var parsed = {};
    var pairs = query_string.split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        var name = decodeURIComponent(pair[0]);
        if (name !== '') {
            var value = pair[1];
            value = t11e.util.is_undefined(value) ? '' : decodeURIComponent(value);
            var previous = parsed[name];
            if (t11e.util.is_undefined(previous)) {
                parsed[name] = [value];
            } else {
                previous.push(value);
            }
        }
    }
    return parsed;
};

/**
 * Encodes params from a query string.
 *
 * @name t11e.util.encode_params
 * @function
 * @param params
 * @param filter_keys
 * @returns {String} query_string
 */
t11e.util.encode_params = function (params, filter_keys) {
    var query_string = '';
    var names = t11e.internals.get_keys(params);
    if (t11e.util.is_defined(filter_keys)) {
        names = t11e.internals.intersect(names, filter_keys);
    }
    names.sort();
    for (var i = 0; i < names.length; i++) {
        var name = names[i];
        var values = params[name];
        if (!t11e.util.is_array(values)) {
            t11e.util.warn('Ignoring state entry for', name,
                'as it should be an array.', values);
        } else {
            var has_invalid_values = false;
            (function () {
                for (var j = 0; j < values.length; j++) {
                    var value = values[j];
                    if (t11e.util.is_undefined(value)) {
                        has_invalid_values = true;
                    }
                }
            }());
            if (has_invalid_values) {
                t11e.util.warn('Ignoring state entry for', name,
                    'as some values are invalid.', values);
            } else {
                (function () {
                    for (var j = 0; j < values.length; j++) {
                        var value = values[j];
                        if (query_string !== '') {
                            query_string += '&';
                        }
                        if (t11e.util.is_defined(value)) {
                            query_string += encodeURIComponent(name);
                            if ('' !== value) {
                                query_string += '=';
                                query_string += encodeURIComponent(value);
                            }
                        }
                    }
                }());
            }
        }
    }
    return query_string;
};

/**
 * Removes a parameter from the params object.
 * @name t11e.util.remove_param
 * @function
 * @param params
 * @param param
 */
t11e.util.remove_param = function (params, param) {
    if (t11e.util.is_defined(params) && t11e.util.is_defined(param)) {
        return t11e.internals.remove_from_map(params, [param]);
    }
};

/**
 * Utility function used to dereference a path, as in the following example
 * where <code>response_ids</code> are extracted from the search response object.
 *
 * <pre class="brush: js">
 *     var response_ids = t11e.util.deref(search, '_discovery.response.itemIds');
 * </pre>
 * @name t11e.util.deref
 * @function
 * @param context
 * @param path
 */
t11e.util.deref = function (context, path) {
    var output = context;
    var parts = path.split('.');
    var part;
    for (var i = 0; i < parts.length && t11e.util.is_defined(output); i++) {
        part = parts[i];
        output = output[part];
    }
    return output;
};

/**
 * @name t11e.util.get_next_number
 * @function
 */
t11e.util.get_next_number = (function () {
    var counter = 0;
    return function () {
        return counter++;
    };
}());

/**
 * Utility function that maps various strings to boolean values <code>true</code>
 * or <code>false</code>:
 *
 * <pre class="brush: js">
 *    var show_criteria_locations = t11e.util.as_boolean(options.show_criteria_locations, false);
 * </pre>
 * @name t11e.util.as_boolean
 * @function
 * @param value
 * @param defaultValue
 */
t11e.util.as_boolean = function (value, defaultValue) {
    var output = defaultValue;
    if (t11e.util.is_defined(value)) {
        if (t11e.util.is_defined(value.toLowerCase)) {
            value = value.toLowerCase();
        }
        switch (value) {
        case 'true':
        case 'yes':
        case '1':
            output = true;
            break;
        case 'false':
        case 'no':
        case '0':
            output = false;
            break;
        }
    }
    return output;
};

/**
 * Log to the console.
 * @name t11e.util.log
 * @function
 */
t11e.util.log = function () {
    t11e.internals.log('log', arguments);
};

/**
 * Log errors to the console.
 * @name t11e.util.error
 * @function
 */
t11e.util.error = function () {
    t11e.internals.log('error', arguments);
};

/**
 * Log warnings to the console.
 * @name t11e.util.warn
 * @function
 */
t11e.util.warn = function () {
    t11e.internals.log('warn', arguments);
};

/**
 * Mechanism for marking methods as deprecated.
 * Use like t11e.util.declare, but with the addition of a reason.
 * Results in the definition of old.function.name.
 * <p>
 * Note that the third argument can either be a function, function name, or undefined.
 * The dot.separated.syntax for function namespaces is supported.
 * <p>
 * Examples:
 * <pre>
 *   t11e.util.deprecated('why', 'old.function.name', 'new.function.name');
 *
 *   t11e.util.deprecated('why', 'old.function.name', function(arg1, argn) { ... });
 * </pre>
 */
t11e.util.deprecated = function (reason, old_function_name, new_function_name) {
    var decorator;
    if (t11e.util.is_undefined(new_function_name)) {
        decorator = function () {
            t11e.util.error('Deprecated method', old_function_name, 'has been removed:', reason);
        };
    } else if (t11e.util.is_function(new_function_name)) {
        /** @ignore */
        decorator = function () {
            t11e.util.warn('Deprecated method', old_function_name, 'called:', reason);
            return new_function_name.apply(this, arguments);
        };
    } else {
        var delegate = t11e.util.deref(window, new_function_name);
        if (t11e.util.is_undefined(delegate)) {
            t11e.util.error('t11e.util.deprecated called with invalid new function name', new_function_name);
        } else {
            /** @ignore */
            decorator = function () {
                t11e.util.warn('Deprecated method', old_function_name, 'called. Delegating to', new_function_name, ':', reason);
                return delegate.apply(this, arguments);
            };
        }
    }
    if (t11e.util.is_defined(decorator)) {
        t11e.util.declare(old_function_name, decorator);
    }
    return decorator;
};

/**
 * Returns true if obj is an array.
 *
 * @name t11e.util.is_array
 * @function
 * @param obj
 * @return boolean
 */
t11e.util.is_array = function (obj) {
    return obj && (obj instanceof Array || typeof obj === 'array');
};

/**
 * Returns true if obj is a function.
 *
 * @name t11e.util.is_function
 * @function
 * @param obj
 * @return boolean
 */
t11e.util.is_function = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
};

if (false) {
    t11e.util.prototype.Eclipse__Outline__Hack = undefined;
}

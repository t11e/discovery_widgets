/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview t11e.js
 */
/**
 * Global <a href="http://transparensee.com">Transparensee</a> namespace.
 *
 * @name t11e
 * @namespace
 *
 * The global transparensee namespace.
 *
 *
 */
/**
 * @name t11e.util
 * @namespace
 * Module that contains various utility functions.
 */
(function () {
    var is_undefined = function (arg) {
        return 'undefined' === typeof arg;
    };
    var declare = function (symbol, object) {
        var parts = symbol.split('.');
        var scope = window;
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (is_undefined(scope[part])) {
                if (i !== parts.length - 1) {
                    scope[part] = {};
                } else {
                    scope[part] = object;
                }
            }
            scope = scope[part];
        }
    };
    declare('t11e.util', {});
    t11e.util.declare = declare;
    t11e.util.is_undefined = is_undefined;
}());

t11e.util.define_namespace = function (namespace) {
    t11e.util.declare(namespace, {});
};

t11e.util.define_namespace('t11e.internals');

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
 * @name t11e.event
 * @namespace
 *
 * Module that provides generic publisher/subscriber functionality and is
 * used as a mechanism to hook up all the various components in a framework
 * independent fashion.
 */
t11e.event = (function () {
    /** @private */
    var empty = {};
    /** @private */
    var topics = {};

    /** @scope t11e.event */
    return {
        /**
         * Subscribe to a topic.
         *
         * Any given handler can be subscribed just once, subsequent calls
         * will be ignored.
         *
         * <pre class="brush: js">
         *     t11e.event.subscribe('perform_search', callback);
         * </pre>
         * @param topic
         *   The topic name.
         * @param handler
         *   Function which recieves events posted to the topic.
         */
        subscribe: function (topic, handler) {
            var handlers = topics[topic];
            if (t11e.util.is_undefined(handlers) || handlers === empty[topic]) {
                handlers = [];
                topics[topic] = handlers;
            }
            var found = false;
            for (var i = 0; i < handlers.length; i++) {
                if (handlers[i] === handler) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                handlers.push(handler);
            }
        },

        /**
        * Unsubscribe from a topic.
        *
        * If the handler isn't currently subscribed then this method does
        * nothing.
        *
        * @param topic
        *   The topic name.
        * @param handler
        *   Function which recieves events posted to the topic.
        */
        unsubscribe: function (topic, handler) {
            var handlers = topics[topic];
            if (t11e.util.is_defined(handlers) && handlers !== empty[topic]) {
                var new_handlers = [];
                var new_len = 0;
                for (var i = 0; i < handlers.length; i++) {
                    var old_handler = handlers[i];
                    if (old_handler !== handler) {
                        new_handlers.push(old_handler);
                        new_len++;
                    }
                }
                if (new_len > 0) {
                    topics[topic] = new_handlers;
                } else {
                    delete topics[topic];
                }
            }
        },

        /**
        * Send an event to listeners on a topic.
        *
        * Takes two mandatory arguments, anything else is passed through
        * as arguments to the handler.
        *
        * Calling <code>trigger('example', 1, 2, 3)</code> will
        * cause the handler to be called with the arguments
        * <code>1, 2, 3</code>.
        *
        * @param topic
        *   The topic on which to send the event.
        */
        trigger: function (topic) {
            if (t11e.event.debug) {
                t11e.util.log('--- BEGIN EVENT ---', topic);
            }
            var params = Array.prototype.slice.call(arguments, 1);
            var handlers = topics[topic];
            if (t11e.util.is_defined(handlers) && handlers !== empty[topic]) {
                for (var i = 0; i < handlers.length; i++) {
                    var handler = handlers[i];
                    try {
                        handler.apply(null, params);
                    } catch (e) {
                        t11e.util.error('Handler on topic', topic,
                            'threw an exception', e, '\n', e.stack);
                    }
                }
            }
            if (t11e.event.debug) {
                t11e.util.log('--- END EVENT   ---', topic);
            }
        }
    };
}());

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
 * @name t11e.util.deprecated
 * @function
 */
t11e.util.declare('t11e.util.deprecated', function (reason, old_function_name, new_function_name) {
    var decorator;
    if (t11e.util.is_undefined(new_function_name)) {
        decorator = function () {
            t11e.util.error('Deprecated method', old_function_name, 'has been removed:', reason);
        };
    } else if (t11e.util.is_function(new_function_name)) {
        decorator = function () {
            t11e.util.warn('Deprecated method', old_function_name, 'called:', reason);
            return new_function_name.apply(this, arguments);
        };
    } else {
        var delegate = t11e.util.deref(window, new_function_name);
        if (t11e.util.is_undefined(delegate)) {
            t11e.util.error('t11e.util.deprecated called with invalid new function name', new_function_name);
        } else {
            decorator = function () {
                t11e.util.warn('Deprecated method', old_function_name, 'called. Delegating to', new_function_name, ':', reason);
                return delegate.apply(this, arguments);
            };
        }
    }
    if (t11e.util.is_defined(decorator)) {
        t11e.util.declare(old_function_name, decorator);
    }
});

/**
 * Internal logger function that can dispatch to window.console.log,
 * window.console.warn and window.console.error. Has special logic
 * to deal with IE8 and gracefully handles the case that window.console
 * doesn't exist.
 */
t11e.internals.log = function (type, params) {
    if (t11e.util.is_defined(window.console)) {
        var logger = window.console[type];
        if (t11e.util.is_defined(logger)) {
            if (t11e.util.is_defined(logger.apply)) {
                logger.apply(window.console, params);
            } else {
                // IE8 implements console.log differently.
                params = Array.prototype.slice.call(params, 0);
                logger(params.join(" "));
            }
        }
    }
};

/**
 * @name t11e.internals
 * @namespace
 */
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
t11e.util.declare('t11e.util.is_function', function (obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
});

/**
 * @name t11e.internals.get_keys
 * @function
 * @param map
 * @returns Array
 */
t11e.internals.get_keys = function (map) {
    var keys = [];
    var empty = {};
    for (var key in map) {
        var value = map[key];
        if (t11e.util.is_defined(value) && value !== empty[key]) {
            keys.push(key);
        }
    }
    return keys;
};

/**
 * @name t11e.internals.contains_value
 * @function
 * @param array
 * @param value
 * @return boolean
 */
t11e.internals.contains_value = function (array, value) {
    var result = false;
    var test;
    for (var i = 0; i < array.length && !result; i++) {
        test = array[i];
        if (value === test) {
            result = true;
        }
    }
    return result;
};

/**
 * @name t11e.internals.intersect
 * @function
 * @param array1
 * @param array2
 */
t11e.internals.intersect = function (array1, array2) {
    var result = [];
    var value;
    var contains_value = t11e.internals.contains_value;
    for (var i = 0; i < array1.length; i++) {
        value = array1[i];
        if (contains_value(array2, value)) {
            result.push(value);
        }
    }
    return result;
};

/**
 * @name t11e.internals.update_map
 * @function
 * @param target
 * @param source
 * @return target
 */
t11e.internals.update_map = function (target, source) {
    var keys = t11e.internals.get_keys(source);
    var key;
    for (var i = 0; i < keys.length; i++) {
        key = keys[i];
        target[key] = source[key];
    }
    return target;
};

/**
 * @name t11e.internals.remove_from_map
 * @function
 * @param target
 * @param keys
 */
t11e.internals.remove_from_map = function (target, keys) {
    var key;
    for (var i = 0; i < keys.length; i++) {
        key = keys[i];
        delete target[key];
    }
    return target;
};

/**
 * @name t11e.internals.is_empty
 * @function
 * @param map
 * @return boolean
 */
t11e.internals.is_empty = function (map) {
    return t11e.internals.get_keys(map).length === 0;
};

if (false) {
    t11e.util.prototype.Eclipse__Outline__Hack = undefined;
    t11e.internals.prototype.Eclipse__Outline__Hack = undefined;
}

t11e.util.define_namespace('t11e.internals');

/**
 * @name t11e.internals
 * @namespace
 */

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
    t11e.internals.prototype.Eclipse__Outline__Hack = undefined;
}

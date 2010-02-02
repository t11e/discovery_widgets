/**
 * @name t11e
 * @namespace
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

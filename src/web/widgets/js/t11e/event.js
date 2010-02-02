t11e.util.define_namespace('t11e.event');
/**
 * @name t11e.event
 * @namespace
 *
 * Module that provides generic publisher/subscriber functionality and is
 * used as a mechanism to hook up all the various components in a framework
 * independent fashion.
 */
(function () {
    /** @private */
    var empty = {};
    /** @private */
    var topics = {};

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
    t11e.event.subscribe = function (topic, handler) {
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
    };

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
    t11e.event.unsubscribe = function (topic, handler) {
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
    };

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
    t11e.event.trigger = function (topic) {
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
    };
}());

if (false) {
    t11e.event.prototype.Eclipse__Outline__Hack = undefined;
}

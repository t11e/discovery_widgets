/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview t11e.widget.jquery.history_plugin
 *
 * <p>jQuery based history plugin for the search controller. It uses the
 * AjaxSoft history plugin.</p>
 */

/**
 * Returns a history object that manages search history and provides
 * back-button support.
 *
 * @name t11e.widget.jquery.history_plugin
 * @class
 */
t11e.util.declare('t11e.widget.jquery.history_plugin', function ($) {

    /**
     * Listen to url hash changes, don't worry about propagating the same
     * change multiple times as the search controller will check that for
     * us.
     *
     * When we see a change we trigger the update_request event and then
     * the perform_search event.
     */
    $.history(function (e, ui) {
        t11e.event.trigger('update_request', function (state) {
            var new_state = t11e.util.decode_params(ui.value.replace(/^&/, ''));
            return new_state;
        }, true);
        t11e.event.trigger('perform_search', true);
    });

    var plugin = {
        /**
         * Whenever a search is about to be performed that should be
         * recorded in history this function is called. It alters the
         * url hash and thus hashchanged will get fired but the controller
         * will correctly work around that.
         * @function
         * @param state
         */
        'update': function (state) {
            var serialized_state = '&' + t11e.util.encode_params(state);
            // TODO On IE6 do a check here to make sure the generated URL
            // isn't so long that it crashes the browser.
            $.history('add', serialized_state);
        },

        /**
         * The controller calls this during the initial page load to extract
         * any pre-existing search state from the history plugin. Should
         * return the empty map if there is none.
         * @function
         */
        'get_initial_state': function () {
            var initial_hash = window.top.location.hash.replace('#', '').replace(/^&/, '');
            var state = t11e.util.decode_params(initial_hash);
            if ($.browser.msie && parseInt($.browser.version, 10) < 8) {
                plugin.update(state);
            }
            return state;
        }
    };
    return plugin;
});

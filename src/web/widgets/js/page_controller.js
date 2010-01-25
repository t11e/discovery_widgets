/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview page_controller.js
 */
t11e.util.define_namespace('t11e.widget');
if (false) {
    t11e.widget.prototype.Eclipse__Outline__Hack = undefined;
}

/**
 * Simple search controller class that performs search, communicating with
 * all the other widgets via the {@link t11e.event} module.
 *
 * Initializing the widgets and page controller is a two step process, as the
 * example below illustrates. In the first step, the widgets themselves are
 * activated by calling {@link t11e.widget.jquery.activate_widgets}. Afterwards
 * the page controller is activated by calling {@link t11e.widget.activate_search_page}
 * is called, along with it's configuration options.
 *
 *<pre class="brush: js">
 * &lt;script type=&quot;text/javascript&quot;&gt;//&lt;![CDATA[
 *     (function ($) {
 *         t11e.widget.jquery.activate_widgets($);
 *         var options = {
 *                      &quot;search_groups&quot;: {
 *                          &quot;vehicle&quot;: {
 *                              &quot;url&quot;: &quot;/discovery_search/30/search/50&quot;
 *                          }
 *                      }
 *                  };
 *         options.history_plugin = t11e.widget.jquery.history_plugin($);
 *         options.search_plugin = t11e.widget.jquery.search_plugin($);
 *         t11e.widget.activate_search_page(options);
 *     }(jQuery));
 * //]]&gt;&lt;/script&gt;
 * </pre>
 *
 * <h2>Events:</h2>
 * The search controller manages the search request/response process by
 * implementing the following events.
 *
 * <dl>
 * <dt>perform_search</dt>
 * <dd>
 * The <code>perform_search</code> is usually triggered by the page controller
 *  when the search parameters have been updated, requiring a
 * new search to be executed. It does not guarantee that a search will be
 * executed, because it checks certain conditions to see if it actually needs to
 * perform a new search (for example, if the search parameters haven't
 * actually changed).
 *
 * <pre class="brush: js">
 *     t11e.event.subscribe('perform_search', callback);
 *     t11e.event.trigger('perform_search');
 * </pre>
 * </dd>
 * <dt>searching.{search_group}</dt>
 * <dd>The <code>searching</code> event is triggered after the <code>perform_search</code>
 * only when a search is actually going to be executed (see
 * <a href="src/discovery_widget_media_apps_discovery_widget_js_jquery_search_plugin.js.html">
 * search_plugin.js</a>).The {@link t11e.widget.jquery.ResultsWidget} subscribes
 * to this event in order to display a 'loading' spinner when the search starts.
 *
 * <pre class="brush: js">
 *     t11e.event.subscribe('searching.' + search_group, show_loading);
 *     t11e.event.trigger('searching.' + group_name);
 * </pre>
 * </dd>
 *
 * <dt>request.{search_group}</dt>
 * <dd>Widget's subscribe to this event in order to update their state based upon
 * the current search parameters. This allows the widget to update itself when
 * the back button is pushed, or if it's listening for the same parameter as
 * another widget.
 *
 * <pre class="brush: js">
 *     t11e.event.subscribe('request.' + search_group, callback);
 *     t11e.event.trigger('request.' + group_name, copy_of_request);
 * </pre>
 *
 * See {@link t11e.widget.jquery.SliderWidget-load_from_params} for an example
 * callback function used with the <code>request</code> event.
 * </dd>
 *
 * <dt>update_request.{search_group}</dt>
 * <dd>Widgets trigger <code>update_request</code> when their values have
 * changed. For example, when a slider has been slid to a new value, the
 * <code>update_request</code> event is triggered. The
 * <code>perform_search</code> event is subsequently called by the page
 * controller (
 * <a href="src/discovery_widget_media_apps_discovery_widget_js_page_controller.js.html">
 * page_controller.js</a>).
 *<pre class="brush: js">
 *     t11e.event.subscribe('update_request',
 *         make_group_update_request_handler());
 *     t11e.event.trigger('update_request.' + search_group, save_to_params);
 *</pre>
 * See {@link t11e.widget.jquery.SliderWidget-save_to_params} for an example
 * callback function used with the <code>update_request</code> event.
 * </dd>
 * <dt>response.{search_group}
 * response_error.{search_group}</dt>
 * <dd>The search plugin
 * (<a href="src/discovery_widget_media_apps_discovery_widget_js_jquery_search_plugin.js.html">
 * search_plugin.js</a>) triggers a
 * <code>response.{search_group}</code> event when a response to a search is
 * received and a <code>response_error.{search_group}</code> when the search
 * fails for any reason. The {@link t11e.widgets.jquery.ResultsWidget}
 * subscribes to these events in order to display the search results.
 * <pre class="brush: js">
 *    t11e.event.subscribe('response.' + search_group, update_from_response);
 *    t11e.event.subscribe('response_error.' + search_group,
 *        function (error) {});
 *    t11e.event.trigger('response.' + group_name, response);
 *    t11e.event.trigger('response_error.' + group_name, event);
 * </pre>
 * See {@link t11e.widget.jquery.ResultsWidget-update_from_response} for an example
 * callback function used with the <code>response</code> event.
 * </dd>
 * <dt>reset_search,
 * clear_search,
 * clear_params_from_search.{search_group}
 * <dd>These two events are defined in page_controller.js. They are used in
 * {@link t11e.widget.jquery.ButtonWidget} to create "clear search" buttons and
 * "reset search" buttons. Resetting the search causes it to revert to its
 * previous state whereas clearing the search removes all the parameters. These
 * events trigger the <code>clear_params_from_search.{search_group}</code>
 * event, which widgets should subscribe to in order to clear their values when
 * either of these events are triggered.
 *
 * <pre class="brush: js">
 *    t11e.event.subscribe('reset_search', function (do_not_search) {});
 *    t11e.event.subscribe('clear_search.' + group_name,
 *    t11e.event.subscribe('clear_params_from_search.' + search_group,
 *        clear_params_from_search);
 *    t11e.event.trigger('clear_params_from_search.' + group_name,
 *        filtered_copy_of_pending_request);
 * </dd>
 * </dl>
 *
 * @param {Object} options Configuration options for search_groups,
 * history_plugin and search_plugin.
 */
t11e.widget.activate_search_page = function (/**Object*/options) {
    /**
     * Setup initial state.
     */
    var history_plugin = options.history_plugin || {
        'get_initial_state': function () {
            return {};
        },
        'update': function (state) {
            // Do nothing
        }
    };
    /**
     * Set up search plugin
     */
    var search_plugin = options.search_plugin || {
        'search': function (group_name, options, state) {
            // Do nothing
        }
    };
    /** search params object, retrieved from the history plugin.*/
    var pending_request = history_plugin.get_initial_state();
    var debug_state = options.debug_state || /debug_state/.test(window.location.search);
    if (debug_state) {
        t11e.util.log('[DEBUG_STATE] State from history',
            pending_request, t11e.util.encode_params(pending_request));
    }
    var last_searched = '';
    var initial_search;
    var searchers = [];

    var perform_search = function (from_history) {
        if (!from_history) {
            var copy_of_request =
                t11e.util.decode_params(t11e.util.encode_params(pending_request));
            history_plugin.update(copy_of_request);
        }
        var encoded_request = t11e.util.encode_params(pending_request);
        if (last_searched !== encoded_request) {
            last_searched = encoded_request;
            for (var i = 0; i < searchers.length; i++) {
                var searcher = searchers[i];
                try {
                    searcher(pending_request, true);
                } catch (e) {
                    t11e.util.error('Problem performing search.', searcher, e);
                }
            }
        }
    };

    var make_group_searcher = function (group_name, options) {
        var last_group_search = undefined;
        t11e.event.subscribe('response_error.' + group_name, function () {
            last_group_search = undefined;
        });
        return function (request, performSearch) {
            var new_search = t11e.util.encode_params(request, options.param_names);
            if (new_search !== last_group_search) {
                last_group_search = new_search;
                var copy_of_request = t11e.util.decode_params(new_search);
                t11e.event.trigger('request.' + group_name, copy_of_request);
                if (performSearch) {
                    copy_of_request = t11e.util.decode_params(new_search);
                    search_plugin.search(group_name, options, copy_of_request);
                }
            }
        };
    };

    var update_group_request = function (updated_request, param_names) {
        updated_request = t11e.util.decode_params(
            t11e.util.encode_params(updated_request, param_names));

        // Purpose: Keep parameters from other search groups in the
        // global history.
        var new_request;
        if (t11e.util.is_undefined(param_names)) {
            new_request = {};
        } else {
            new_request = t11e.util.decode_params(
                t11e.util.encode_params(pending_request));
            t11e.internals.remove_from_map(new_request, param_names);
        }
        t11e.internals.update_map(new_request, updated_request);
        pending_request = new_request;
    };

    var make_group_update_request_handler = function (param_names) {
        return function (callback, do_not_search) {
            var filtered_copy_of_pending_request = t11e.util.decode_params(
              t11e.util.encode_params(pending_request, param_names));
            var updated_request = callback(filtered_copy_of_pending_request);
            if (t11e.util.is_undefined(updated_request)) {
                // Callback didn't return a dictionary so assume it modified the
                // state inplace.
                updated_request = filtered_copy_of_pending_request;
            }
            update_group_request(updated_request, param_names);
            if (!do_not_search) {
                t11e.event.trigger('perform_search');
            }
        };
    };

    var make_group_clear_search_handler = function (group_name, param_names) {
        return function (do_not_search) {
            var filtered_copy_of_pending_request = t11e.util.decode_params(
                    t11e.util.encode_params(pending_request, param_names));
            t11e.event.trigger('clear_params_from_search.' + group_name, filtered_copy_of_pending_request);
            update_group_request(filtered_copy_of_pending_request, param_names);
            if (!do_not_search) {
                t11e.event.trigger('perform_search');
            }
        };
    };

    t11e.event.subscribe('reset_search', function (do_not_search) {
        pending_request = t11e.util.decode_params(initial_search);
        if (!do_not_search) {
            t11e.event.trigger('perform_search');
        }
    });

    /**
     * Hook up all the event handling.
     */
    (function () {
        if (t11e.util.is_defined(options.search_groups)) {
            var group_names = t11e.internals.get_keys(options.search_groups);
            var search_opts, group_name;
            for (var i = 0; i < group_names.length; ++i) {
                group_name = group_names[i];
                search_opts = options.search_groups[group_name];
                searchers.push(make_group_searcher(group_name, search_opts));
                t11e.event.subscribe('update_request.' + group_name,
                    make_group_update_request_handler(search_opts.param_names));
                t11e.event.subscribe('clear_search.' + group_name,
                        make_group_clear_search_handler(group_name, search_opts.param_names));

            }
        }
    }());
    t11e.event.subscribe('update_request', make_group_update_request_handler());
    t11e.event.subscribe('perform_search', perform_search);
    /**
     * Fire events for initial page load.
     */
    var ajax_history_state = t11e.util.encode_params(pending_request);
    if (debug_state) {
        t11e.util.log('[DEBUG_STATE] ajax_history_state:', ajax_history_state);
    }

    (function () {
        if (t11e.util.is_defined(options.search_groups)) {
            var make_identity_callback = function (a) {
                return function () {
                    return a;
                };
            };
            var group_names = t11e.internals.get_keys(options.search_groups);
            var group_name, parameters;
            for (var i = 0; i < group_names.length; ++i) {
                group_name = group_names[i];
                parameters = options.search_groups[group_name].parameters;
                if (t11e.util.is_defined(parameters)) {
                    t11e.event.trigger('update_request.' + group_name,
                        make_identity_callback(parameters), true);
                }
            }
        }
    }());

    if (debug_state) {
        t11e.util.log('[DEBUG_STATE] After processing search group options',
            pending_request, t11e.util.encode_params(pending_request));
    }
    initial_search = t11e.util.encode_params(pending_request);
    if (ajax_history_state !== '') {
        if (debug_state) {
            t11e.util.log('[DEBUG_STATE] from ajax history, so setting empty previous search');
        }
        pending_request = t11e.util.decode_params(ajax_history_state);
        last_searched = '';
        t11e.event.trigger('perform_search', true);
    } else {
        if (debug_state) {
            t11e.util.log('[DEBUG_STATE] not from ajax history, so calling searchers');
        }
        last_searched = initial_search;
        (function () {
            for (var j = 0; j < searchers.length; j++) {
                searchers[j](pending_request, false);
            }
            if (t11e.util.is_defined(options.search_groups)) {
                var group_names = t11e.internals.get_keys(options.search_groups);
                var group_name, response;
                for (var i = 0; i < group_names.length; ++i) {
                    group_name = group_names[i];
                    response = options.search_groups[group_name].response;
                    if (t11e.util.is_defined(response) && response !== null) {
                        t11e.event.trigger('response.' + group_name, response);
                    }
                }
            }
        }());
    }
    if (debug_state) {
        t11e.util.log('[DEBUG_STATE] initial_search', initial_search);
    }
};

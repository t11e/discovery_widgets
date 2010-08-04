/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview t11e.widget.jquery.ResultsWidget definition
 */

t11e.util.define_namespace('t11e.widget.jquery');
if (false) {
    t11e.widget.jquery.prototype.Eclipse__Outline__Hack = undefined;
}

/**
 * Widget that displays AJAX rendered HTML search results.
 * <h2>Options</h2>
 *
 *<dl>
 *    <dt>search_group</dt>
 *    <dd>The search group this widget is associated with.</dd>
 *
 *    <dt>base_url</dt>
 *    <dd>The url the results widget uses to request the rendered search results. The url
 *    is appended with the 'results_query_params' value from the search response.</dd>
 *
 *    <dt>render_params_paths</dd>
 *    <dd>Array of paths under the JSON AJAX response to look for the render parameters.
 *    Defaults to ['results_query_params', '_discovery.response.renderParameters'].</dd>
 *
 *    <dt>animation_length_ms</dt>
 *    <dd>The number of milliseconds to fade in and out the 'loading' message.
 *    Defaults to 150.</dd>
 *
 *    <dt>container_opacity</dt>
 *    <dd>The opacity (between 0 and 1) of the results content area during a search.
 *    Defaults to 0.5.</dd>
 *
 *    <dt>center_horizontally</dt>
 *    <dd>Centers the 'loading' message horizontally relative to the view port. Otherwise
 *    the 'loading' message is centered relative to the widget. Defaults to false.</dd>
 *
 *    <dt>center_vertically</dt>
 *    <dd>Centers the 'loading' message vertically in the view port. Otherwise, it is
 *    displayed at the top of the view port. Defaults to true.</dd>
 *
 *    <dt>z_index</dt>
 *    <dd>The z-index of the 'loading' message to insure it displays on top of other
 *    elements. Defaults to 1000.</dd>
 *
 *</dl>
 *
 * <h2>Example</h2>
 * <div class="t11e-widget t11e-widget-jquery-results t11e-widget-id-2088">
 *  <div class="t11e-hd t11e-widget-jquery-results-hd"></div>
 *  <div class="t11e-bd t11e-widget-jquery-results-bd">
 *      <div class="t11e-results"></div>
 *      <div class="t11e-widget-jquery-results-loading">
 *      </div>
 *  </div>
 *  <div class="t11e-ft t11e-widget-jquery-results-ft"></div>
 * </div><script type="text/javascript">
 *  //<!--
 *      if ('undefined' === typeof t11e) { t11e = {}; }
 *      if ('undefined' === typeof t11e.widget_options) { t11e.widget_options = {}; }
 *      t11e.widget_options['2088'] = {
 *          "search_group": "vehicle",
 *          "base_url": "/proxy/results"
 *      };
 *  //-->
 * </script>
 *
 * @name t11e.widget.jquery.ResultsWidget
 * @class Executes Ajax request and renders search results.
 */
t11e.widget.jquery.ResultsWidget = function ($, options) {
    var search_group = options.search_group;
    var base_url = options.base_url;
    var render_params_paths = options.render_params_paths;
    if ((!t11e.util.is_array(render_params_paths)) || render_params_paths.length === 0) {
        render_params_paths = ['results_query_params', '_discovery.response.renderParameters'];
    }
    var animation_length_ms = options.animation_length_ms || 150;
    var container_opacity = options.container_opacity || 0.5;
    var center_horizontally = options.center_horizontally || false;
    var center_vertically = options.center_vertically || true;
    var z_index = options.z_index || 1000;
    var highlight_template = options.highlight_template || '<span class="highlight"/>';
    var results_callback = options.results_callback;
    if (!t11e.util.is_function(results_callback)) {
        results_callback = t11e.util.deref(window, results_callback);
    }

    var target = $(this).find('.t11e-results:first');
    var container = $(this).find('.t11e-widget-jquery-results-bd:first');
    var loading = $(this).find('.t11e-widget-jquery-results-loading:first');

    var update_from_error = function (title, error) {
        if (t11e.util.is_defined(target) && target.length !== 0) {
            target.html('<div class="t11e-error">' +
            '<div class="t11e-error-title">' +
            title +
            '</div>' +
            '<div class="t11e-error-message">' +
            error.status +
            ' ' +
            error.statusText +
            '</div>' +
            '<div class="t11e-error-text">' +
            error.responseText +
            '</div>' +
            '</div>');
        } else {
            t11e.util.error(error.status + ' ' +
                error.statusText + ' ' +
                error.responseText);
        }
    };
    t11e.event.subscribe('response_error.' + search_group, function (error) {
        update_from_error('Problem performing search.', error);
        hide_loading();
    });

    /** @scope t11e.widget.jquery.ResultsWidget */
   /**
    * This function is used as a callback for the <code>response</code> event. It takes
    * one parameter, the search response object. The search response object
    * consists of the original request, the response from the Discovery Engine&trade;
    * and <code>search.results_query_params</code>, which is a query string that contains
    * the itemIds of the items returned in the response. The query string is appended
    * to the <code>base_url</code> variable to form the URL for a second HTTP request to the
    * server to retrieve the displayed results of the response. See
    * {@link t11e.widget.activate_search_page } for a complete list of events.
    *
    * @function
    * @param search The search response object
    */
    var update_from_response = function (search) {
        var query_params;
        $.each(render_params_paths, function (idx, value) {
            query_params = t11e.util.deref(search, value);
            return t11e.util.is_undefined(query_params);
        });
        if (t11e.util.is_undefined(target) ||
            target.length === 0) {
            t11e.util.error('No element has been defined to display results.');
            hide_loading();
        } else if (t11e.util.is_undefined(query_params)) {
            t11e.util.error('query_params cannot be deterimined from', render_params_paths);
            hide_loading();
        } else {
            var url = base_url + '?' + query_params;
            target.load(url, null, function (responseText, statusText, xhr) {
                if (xhr.status < 200 || xhr.status >= 300) {
                    update_from_error('Problem rendering results.', {
                        status: xhr.status,
                        statusText: xhr.statusText,
                        responseText: responseText
                    });
                }
                else
                {
                    highlight_text(target, t11e.util.deref(search, '_discovery.response'));
                    if (t11e.util.is_defined(results_callback)) {
                        results_callback(target, search);
                    }
                }
                hide_loading();
            });
        }
    };
    t11e.event.subscribe('response.' + search_group, update_from_response);

    /**
     * Shows the loading popup if the widget contains a div of
     * class <code>t11e-widget-jquery-results-loading</code>.
     */
    var show_loading = function () {
        if (t11e.util.is_defined(loading) && loading.length !== 0 &&
            t11e.util.is_defined(container) && container.length !== 0) {
            /**
             * Position the 'loading' display horizontally relative to the
             * document or the container element.
             */
            var center;
            if (center_horizontally) {
                center = $(document).width() / 2;
            }
            else {
                center = container.offset().left + (container.width() / 2);
            }
            var left = center - (loading.width() / 2);

            /**
             * Position the 'loading' display vertically either at the center
             * of the viewport, or at the top of the viewport.
             */
            var top;
            if (center_vertically) {
                var viewport = $(window).height();
                var doc_offset = $(document).scrollTop();
                top = (viewport / 2 + doc_offset) - (loading.height() / 2);
            } else {
                top = $(document).scrollTop();
            }
            var zIndex = z_index;
            if ('undefined' === typeof zIndex) {
                zIndex = 1000;
            }
            loading.appendTo('body');
            loading.css({
                display: 'block',
                position: 'absolute',
                top: top,
                left: left,
                zIndex: zIndex
            });

            // Fix ie 6 bug
            if ('undefined' !== typeof $.bgiframe) {
                loading.bgiframe();
            }
            loading.animate(
                {
                    opacity: 1
                },
                {
                    duration: animation_length_ms,
                    easing: 'linear'
                }
            );
            container.animate(
                {
                    opacity: container_opacity
                },
                {
                    duration: animation_length_ms,
                    easing: 'linear'
                }
            );
        }
    };
    t11e.event.subscribe('searching.' + search_group, show_loading);

    /**
     * Hides the loading popup.
     */
    var hide_loading = function () {
        if (t11e.util.is_defined(loading) && loading.length !== 0 &&
            t11e.util.is_defined(container) && container.length !== 0) {
            loading.animate(
                {
                    opacity: 0
                },
                {
                    duration: animation_length_ms,
                    easing: 'linear',
                    complete: function () {
                        loading.css(
                            {
                                display: 'none'
                            }
                        );
                    }
                }
            );
            container.animate(
                {
                    opacity: 1
                },
                {
                    duration: animation_length_ms,
                    easing: 'linear'
                }
            );
        }
    };

    var highlight_text = function (target, discoveryResponse) {
        if (t11e.util.is_array(options.highlight_filter)) {
            var explanation = t11e.util.deref(discoveryResponse, 'explanation');
            if (t11e.util.is_defined(explanation)) {
                var tokens = [];
                $(explanation).each(function (i, explain) {
                    var currentTokens = explain.textTokens;
                    if (t11e.util.is_defined(currentTokens)) {
                        tokens = tokens.concat(tokens, currentTokens);
                    }
                });
                if (tokens.length > 0) {
                    var sections = [];
                    $(options.highlight_filter).each(function (i, filter) {
                        $.merge(sections, target.find(filter));
                    });
                    $(sections).each(function (i, section) {
                        t11e.widget.jquery.text_highlighter($, section, highlight_template,
                            t11e.widget.jquery.text_token_filter_factory($, tokens));
                    });
                }
            }
        }
    };
};

t11e.widget.jquery.make_jquery_ui_widget(jQuery,
    't11e_results', t11e.widget.jquery.ResultsWidget);

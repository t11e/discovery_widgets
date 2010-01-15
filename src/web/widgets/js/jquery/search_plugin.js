/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview t11e.widget.jquery.search_plugin
 *
 * <p>jQuery ajax search request</p>
 */
/**
 * Returns a search object that manages Ajax search requests. It triggers
 * either a response event or a response_error event.
 * @name t11e.widget.jquery.search_plugin
 * @class Search plugin that uses jQuery to execute the Ajax search request.
 */
t11e.util.declare('t11e.widget.jquery.search_plugin', function ($) {
    return {
        'search': function (group_name, options, state) {
            t11e.event.trigger('searching.' + group_name);
            $.ajax({
                url: options.url,
                data: t11e.util.encode_params(state),
                dataType: 'json',
                success: function (response, status) {
                    t11e.event.trigger('response.' + group_name, response);
                },
                error: function (response, status, error) {
                    var data = {
                        status: response.status,
                        statusText: response.statusText,
                        responseText: response.responseText
                    };
                    t11e.event.trigger('response_error.' + group_name, data);
                }
            });
        }
    };
});

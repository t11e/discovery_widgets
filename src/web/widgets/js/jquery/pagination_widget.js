/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview t11e.widget.jquery.PaginationWidget definition
 */

t11e.util.define_namespace('t11e.widget.jquery');
if (false) {
    t11e.widget.jquery.prototype.Eclipse__Outline__Hack = undefined;
}

/**
 * Widget that displays pagination controls for the search results.
 *
 * <h2>Options</h2>
 *
 * <dl>
 *     <dt>css_class</dt>
 *     <dd>An optional CSS class to be applied to this widget instance to facilitate custom styling.</dd>
 *
 *     <dt>search_group</dt>
 *     <dd>The search group for whom the pagination widget displays pagination results.</dd>
 *
 *     <dt>page_param</dt>
 *     <dd>The search parameter that represents the current page number. Search
 *     widgets reset the <code>page_param</code> parameter when a search is updated
 *     so that the new search results will start on the first page.</dd>
 *
 *     <dt>page_size</dt>
 *     <dd>The number of result items per page.</dd>
 * </dl>
 * <h2>Example</h2>
 * <div class="t11e-widget t11e-widget-jquery-pagination t11e-widget-id-2089">
 *  <div class="t11e-hd t11e-widget-jquery-pagination-hd"></div>
 *  <div class="t11e-bd t11e-widget-jquery-pagination-bd">
 *      <div class="pagination">
 *          <a href="#" class="prev">Prev</a>
 *          <a href="#">1</a>
 *          <a href="#" class="next">Next</a>
 *      </div>
 *  </div>
 *  <div class="t11e-ft t11e-widget-jquery-pagination-ft"></div>
 * </div>
 * <script type="text/javascript">
 * //<!--
 *   if ('undefined' === typeof t11e) { t11e = {}; }
 *   if ('undefined' === typeof t11e.widget_options) { t11e.widget_options = {}; }
 *   t11e.widget_options['2089'] = {
 *       "search_group": "vehicle",
 *       "page_param": "page"
 *   };
 * //-->
 * </script>
 *
 * @name t11e.widget.jquery.PaginationWidget
 * @class Displays pagination navigation links for search results.
 */
t11e.widget.jquery.PaginationWidget = function ($) {
    var options = t11e.widget_options[$(this).attr('t11e-widget-id')];
    var search_group = options.search_group;
    var page_param = options.page_param;
    var pagination = $(this).find(".pagination:first");

    var change_page = function (page_id, panel) {
        t11e.event.trigger('update_request.' + search_group, function (params) {
            params[page_param] = [page_id + 1];
        });
        return false;
    };
    var update_from_response = function (search) {
        var page_size = t11e.util.deref(search, '_discovery.response.pageSize');
        var page_id = t11e.util.deref(search, '_discovery.response.startIndex') / page_size;
        var result_count = t11e.util.deref(search, '_discovery.response.totalSize');
        pagination.pagination(result_count, {
            current_page: page_id,
            items_per_page: page_size,
            callback: change_page
        });
    };
    t11e.event.subscribe('response.' + search_group, update_from_response);

    var clear_params_from_search = function (params) {
        t11e.util.remove_param(params, page_param);
    };
    t11e.event.subscribe('clear_params_from_search.' + search_group, clear_params_from_search);
};

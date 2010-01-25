/**
 * @copyright Transparensee Systems, Inc.
 * @fileOverview t11e.widget.jquery.GoogleMapWidget definition
 */

t11e.util.define_namespace('t11e.widget.jquery');
if (false) {
    t11e.widget.jquery.prototype.Eclipse__Outline__Hack = undefined;
}

/**
 * Widget for displaying geocoded results on a Google map.
 *
 * <h2>Options</h2>
 *
 * <dl>
 *    <dt>css_class</dt>
 *    <dd>An optional CSS class to be applied to this widget instance to facilitate custom styling.</dd>
 *
 *    <dt>search_group</dt>
 *    <dd>The search group whose results this map widget displays.</dd>
 *
 *    <dt>dimension</dt>
 *    <dd></dd>
 *
 *    <dt>center_latitude, center_longitude</dt>
 *    <dd>The default latitude and longitude values used to center the map when there
 *    are no search results to display.</dd>
 *
 *    <dt>zoom_level</dt>
 *    <dd>The default zoom_level for the map. When there are search results, the map
 *    automatically resizes to include all of the results.</dd>
 *
 *    <dt>close_match_icon</dt>
 *    <dd>Template string used to construct a url to the image used in the marker that
 *    represents a close, or 'fuzzy', match.</dd>
 *
 *    <dt>exact_match_icon</dt>
 *    <dd>Template string used to construct a url to the image used in the marker that
 *    represents an exact match.</dd>
 *
 *    <dt>icon_height, icon_width</dt>
 *    <dd>Pixel height and width of the map icon image.</dd>
 *
 *    <dt>icon_anchor_x, icon_anchor_y</dt>
 *    <dd>The pixel coordinates used to position map icons, relative to the top left
 *    corner of the icon image where the icon will be anchored to the map</dd>
 *
 *    <dt>icon_shadow</dt>
 *    <dd>Url for the shadow image icon.</dd>
 *
 *    <dt>icon_shadow_height, icon_shadow_width</dt>
 *    <dd>Pixel height and width of the icon shadow image.</dd>
 *
 *    <dt>item_info_url</dt>
 *    <dd>Template string used to retrieve content for the map's info windows, e.g.:
 *    <pre>
 *        /info_window/${id}/
 *    </pre>
 *    </dd>
 *
 *    <dt>map_height</dt>
 *    <dd>The display height of the map. The default is '300px'.</dd>
 *</dl>
 *<h2>Sample HTML</h2>
 *<pre class="brush: html">
 * &lt;div class=&quot;t11e-widget t11e-widget-jquery-google-map t11e-widget-id-2083&quot;&gt;
 *  &lt;div class=&quot;t11e-hd t11e-widget-jquery-google-map-hd&quot;&gt;&lt;/div&gt;
 *  &lt;div class=&quot;t11e-bd t11e-widget-jquery-google-map-bd&quot;&gt;
 *      &lt;div class=&quot;google-map&quot;&gt;&lt;/div&gt;
 *  &lt;/div&gt;
 *  &lt;div class=&quot;t11e-ft t11e-widget-jquery-google-map-ft&quot;&gt;&lt;/div&gt;
 * &lt;/div&gt;
 * &lt;script type=&quot;text/javascript&quot;&gt;
 *  //&lt;!--
 *      if (&#x27;undefined&#x27; === typeof t11e) {
 *          t11e = {};
 *      }
 *      if (&#x27;undefined&#x27; === typeof t11e.widget_options) {
 *          t11e.widget_options = {};
 *      }
 *      t11e.widget_options[&#x27;2083&#x27;] = {
 *          &quot;item_info_url&quot;: &quot;/info_window/${id}/&quot;,
 *          &quot;map_height&quot;: 250,
 *          &quot;icon_height&quot;: 20,
 *          &quot;center_latitude&quot;: 40.777900699999996,
 *          &quot;close_match_icon&quot;: &quot;/images/google_map_markers/largeTDYellowIcons/marker${index}.png&quot;,
 *          &quot;zoom_level&quot;: 13,
 *          &quot;center_longitude&quot;: -73.9634018,
 *          &quot;icon_shadow&quot;: &quot;/images/google_map_markers/shadow50.png&quot;,
 *          &quot;icon_width&quot;: 34,
 *          &quot;icon_shadow_width&quot;: 27,
 *          &quot;exact_match_icon&quot;: &quot;/images/google_map_markers/largeTDRedIcons/marker${index}.png&quot;,
 *          &quot;icon_anchor_y&quot;: 34,
 *          &quot;icon_anchor_x&quot;: 9,
 *          &quot;search_group&quot;: &quot;vehicle&quot;,
 *          &quot;dimension&quot;: &quot;latlon&quot;,
 *          &quot;icon_shadow_height&quot;: 34,
 *          &quot;media_url&quot;: &quot;/media/&quot;
 *      };
 *  //--&gt;
 * &lt;/script&gt;
 * </pre>
 * @name t11e.widget.jquery.GoogleMapWidget
 * @class A widget for displaying search results on a Google map.
 */
t11e.widget.jquery.GoogleMapWidget = function ($) {
    var options = t11e.widget_options[$(this).attr('t11e-widget-id')];
    var search_group = options.search_group;
    var dimension = options.dimension;
    var map_widget = $(this);
    var map_container = $(this).find('.t11e-widget-jquery-google-map-bd:first > div.google-map');
    var item_info_url = options.item_info_url;
    var icon_shadow = options.icon_shadow;
    var exact_match_icon = options.exact_match_icon;
    var close_match_icon = options.close_match_icon;
    var show_criteria_locations = t11e.util.as_boolean(options.show_criteria_locations, false);
    var criteria_icon = options.criteria_icon;
    var previous_map_items;

    var map;

    if (t11e.util.is_defined(options.map_height)) {
        map_container.css({
            height: options.map_height
        });
    }

    map_widget.bind('change', function () {
        if (t11e.util.is_defined(previous_map_items) && null !== previous_map_items) {
            update_map(previous_map_items);
        } else {
            center_map();
        }
    });

    var create_marker = function (map_item) {
        var marker;
        var image_template;
        var image;
        var latlng = new GLatLng(map_item.latitude, map_item.longitude);
        var icon = get_base_icon();
        if (map_item.type === 'criteria') {
            image_template = criteria_icon;
        } else if (map_item.exactMatch === true) {
            image_template = exact_match_icon;
        } else {
            image_template = close_match_icon;
        }
        image = t11e.widget.jquery.util.apply_template($, image_template, map_item);
        if (t11e.util.is_defined(image)) {
            icon.image = image;
            var marker_options = {'icon': icon};
            marker = new GMarker(latlng, marker_options);
        } else {
            marker = new GMarker(latlng);
        }
        marker.map_item = map_item;
        GEvent.addListener(marker, 'click', function (latlng) {
            get_info_window_content(marker);
        });
        return marker;
    };

    var update_from_response = function (search) {
        if (t11e.util.is_defined(search)) {
            var responses = [];
            var criteria_locations = [];
            var map_items = {
                'responses' : responses,
                'criteria_locations': criteria_locations
            };

            (function () {
                var response_ids = t11e.util.deref(search, '_discovery.response.itemIds');
                var response_locations = t11e.util.deref(search, '_discovery.response.values.' + dimension);
                var response_exact = t11e.util.deref(search, '_discovery.response.exactMatches');
                var start_index = t11e.util.deref(search, '_discovery.response.startIndex');
                if (t11e.util.is_defined(response_ids) &&
                t11e.util.is_defined(response_locations) &&
                t11e.util.is_defined(response_exact) &&
                t11e.util.is_defined(start_index)) {
                    for (var i = 0; i < response_ids.length; i++) {
                        var location = response_locations[i];
                        if (t11e.util.is_defined(location) && null !== location) {
                            location = location.split(',');
                            var latitude = parseFloat(location[0]);
                            var longitude = parseFloat(location[1]);
                            var exact = response_exact[i];
                            var response = {
                                'id': response_ids[i],
                                'type': 'result',
                                'latitude': latitude,
                                'longitude': longitude,
                                'exactMatch': exact,
                                'index0': i,
                                'index1': i + 1
                            };
                            responses.push(response);
                        }
                    }
                }
            }());

            (function () {
                if (show_criteria_locations) {
                    var criteria = t11e.util.deref(search, '_discovery.request.criteria');
                    if (t11e.util.is_defined(criteria)) {
                        for (var i = 0; i < criteria.length; ++i) {
                            if (criteria[i].dimension === dimension) {
                                var lats = t11e.util.deref(criteria[i], 'latitude');
                                var longs = t11e.util.deref(criteria[i], 'longitude');
                                if (t11e.util.is_defined(lats) && t11e.util.is_defined(longs)) {
                                    var minLen = Math.min(lats.length, longs.length);
                                    for (var posIdx = 0; posIdx < minLen; ++posIdx) {
                                        criteria_locations.push({
                                            'id': criteria[i].locationId,
                                            'type': 'criteria',
                                            'latitude': lats[posIdx],
                                            'longitude': longs[posIdx]
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }());
            create_map();
            update_map(map_items);
            previous_map_items = map_items;
        }
    };
    t11e.event.subscribe('response.' + search_group, update_from_response);

    var create_map = function () {
        if (t11e.util.is_defined(window.GBrowserIsCompatible) &&
            window.GBrowserIsCompatible() &&
            t11e.util.is_defined(window.GMap2) &&
            t11e.util.is_undefined(map) &&
            page_load_complete) {
            map = new GMap2(map_container.get(0));
            map.addControl(new GSmallMapControl());
            map.addControl(new GMapTypeControl());
            map.enableContinuousZoom();
        }
    };

    var map_not_ready_items;

    var update_map = function (map_items) {
        if (t11e.util.is_defined(map)) {
            map.clearOverlays();
            map.checkResize();
            var bounds = new GLatLngBounds();
            var markers_exist = false;
            if (t11e.util.is_defined(map_items)) {
                markers_exist = create_markers(map_items.responses, bounds) || markers_exist;
                markers_exist = create_markers(map_items.criteria_locations, bounds) || markers_exist;
            }
            if (markers_exist) {
                map.setCenter(bounds.getCenter(), map.getBoundsZoomLevel(bounds));
            } else {
                center_map();
            }
        } else {
            map_not_ready_items = map_items;
        }
    };

    var create_markers = function (items, bounds) {
        var output = false;
        var i, map_item, marker, latlng;
        if (t11e.util.is_defined(items) && null !== items) {
            for (i = 0; i < items.length; i++) {
                map_item = items[i];
                marker = create_marker(map_item);
                latlng = new GLatLng(map_item.latitude, map_item.longitude);
                bounds.extend(latlng);
                map.addOverlay(marker);
                output = true;
            }
        }
        return output;
    };

    var center_map = function () {
        // Center the map on the default center point
        if (t11e.util.is_defined(map) &&
            t11e.util.is_defined(options.center_latitude) &&
            t11e.util.is_defined(options.center_longitude) &&
            t11e.util.is_defined(options.zoom_level)) {
            var latitude = parseFloat(options.center_latitude);
            var longitude = parseFloat(options.center_longitude);
            var zoom_level = options.zoom_level;
            if (t11e.util.is_defined(latitude) && t11e.util.is_defined(longitude)) {
                map.checkResize();
                var latlng = new GLatLng(latitude, longitude);
                map.setCenter(latlng, zoom_level);
            }
        }
    };

    var get_base_icon = function () {
        var base_icon = new GIcon(G_DEFAULT_ICON);
        if (t11e.util.is_defined(icon_shadow) &&
            '' !== $.trim(icon_shadow)) {
            base_icon.shadow = t11e.widget.jquery.util.apply_template($, icon_shadow, options);
        }
        if (t11e.util.is_defined(options.icon_height) &&
            t11e.util.is_defined(options.icon_width)) {
            base_icon.iconSize = new GSize(options.icon_height, options.icon_width);
        }
        if (t11e.util.is_defined(options.icon_shadow_height) &&
            t11e.util.is_defined(options.icon_shadow_width)) {
            base_icon.shadowSize = new GSize(options.icon_shadow_height, options.icon_shadow_width);
        }
        if (t11e.util.is_defined(options.icon_anchor_x) &&
            t11e.util.is_defined(options.icon_anchor_y)) {
            base_icon.iconAnchor = new GPoint(options.icon_anchor_x, options.icon_anchor_y);
        }
        return base_icon;
    };

    var get_info_window_content = function (marker) {
        if (t11e.util.is_defined(item_info_url) &&
            '' !== $.trim(item_info_url)) {
            var url = t11e.widget.jquery.util.apply_template($, item_info_url, marker.map_item);
            $.ajax({
                url: url,
                dataType: 'html',
                success: function (data, status) {
                    if (t11e.util.is_defined(marker.openInfoWindowHtml)) {
                        marker.openInfoWindowHtml(data);
                    }
                },
                error: function (response, status, error) {
                    // Should an error message be displayed?
                }
            });
        }
    };

    var page_load_complete = false;

    $(document).ready(function () {
        page_load_complete = true;
        create_map();
        center_map();
        update_map(map_not_ready_items);
    });

};

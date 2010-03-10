<?php
require("php/t11e.inc");

/**
* Perform initial search to populate drillDown counts
*/
$url = 'http://tutorial2.discoverysearchengine.com:8090/json/query';
$request = array(
    'drillDown' => array(
        array(
            'dimension' => 'style',
            'ids' => array(
                'multi-family', 'apartment', 'condo', 'co-op', 'townhome',
                'single-family', 'colonial', 'new england', 'cape cod',
                'classical', 'federal', 'greek revival', 'tidewater',
                'antebellum', 'victorian', 'gothic', 'second empire',
                'queen anne', 'contemporary', 'ranch', 'raised ranch',
                'split-level', 'bauhaus', 'art moderne', 'transitional'
            )
        )
    )
);

$initial = t11e_initial_request($url, $request);

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en-us" xml:lang="en-us">
    <head>
        <title>
            Test Search Page
        </title>
        <link href="build/yui-2.7.0.min.css" rel="stylesheet" type="text/css" />
        <link href="build/jquery-ui-1.7.2.min.css" rel="stylesheet" type="text/css" />
        <link href="build/widgets.min.css" rel="stylesheet" type="text/css" />
        <link href="build/widgets-theme-advanced.css" rel="stylesheet" type="text/css" />
        <style>
            .t11e-widget-jquery-results .t11e-fuzzy { background: #DDD }
        </style>
    </head>
    <body>
<script type="text/javascript">
//<!--
    if ('undefined' === typeof t11e) { t11e = {}; }
    if ('undefined' === typeof t11e.widget_options) { t11e.widget_options = {}; }
//-->
</script>
        <div id="doc4" class="yui-t2">
            <div id="hd" role="banner">
              <h1>Tutorial Search Page</h1>
            </div>
            <div id="bd" role="main">
                <div id="yui-main">
                    <div class="yui-b">
                        <div class="yui-gc">
                            <div class="t11e-widget yui-u first">
<div id="tabs">
  <ul>
    <li><a href="#tab-results" onclick="javascript:return false;"><span>Results</span></a></li>
    <li><a href="#tab-debug" onclick="javascript:return false;"><span>Debug</span></a></li>
  </ul>
  <div id="tab-results">


<div class="t11e-widget t11e-widget-jquery-pagination t11e-widget-id-pagination1">
    <div class="t11e-hd t11e-widget-jquery-pagination-hd"></div>
    <div class="t11e-bd t11e-widget-jquery-pagination-bd">
        <div class="pagination">
            <a href="#" class="prev">Prev</a><a href="#">1</a><a href="#" class="next">Next</a>
        </div>
    </div>
    <div class="t11e-ft t11e-widget-jquery-pagination-ft"></div>
</div>
<script type="text/javascript">
//<!--
    t11e.widget_options['pagination1'] = {
        "search_group": "default",
        "page_param": "page"
    };
//-->
</script>

<div class="t11e-widget t11e-widget-jquery-results t11e-widget-id-results">
    <div class="t11e-hd t11e-widget-jquery-results-hd"></div>
    <div class="t11e-bd t11e-widget-jquery-results-bd">
        <div class="t11e-results"></div>
        <div class="t11e-widget-jquery-results-loading">
            Searching...
        </div>
    </div>
    <div class="t11e-ft t11e-widget-jquery-results-ft"></div>
</div>
<script type="text/javascript">
//<!--
    t11e.widget_options['results'] = {
        "search_group": "default",
        "base_url": "php/t11e_tutorial_results.php"
    };
//-->
</script>

<div class="t11e-widget t11e-widget-jquery-pagination t11e-widget-id-pagination2">
    <div class="t11e-hd t11e-widget-jquery-pagination-hd"></div>
    <div class="t11e-bd t11e-widget-jquery-pagination-bd">
        <div class="pagination">
            <a href="#" class="prev">Prev</a><a href="#">1</a><a href="#" class="next">Next</a>
        </div>
    </div>
    <div class="t11e-ft t11e-widget-jquery-pagination-ft"></div>
</div><script type="text/javascript">
//<!--
    t11e.widget_options['pagination2'] = {
        "search_group": "default",
        "page_param": "page"
    };
//-->
</script>
  </div>
  <div id="tab-debug">
<div class="t11e-widget t11e-widget-jquery-response t11e-widget-id-response">
    <div class="t11e-hd t11e-widget-jquery-response-hd">JSON Response</div>
    <div class="t11e-bd t11e-widget-jquery-response-bd">
        <div class="response"></div>
    </div>
    <div class="t11e-ft t11e-widget-jquery-response-ft"></div>
</div>
<script type="text/javascript">
//<!--
    t11e.widget_options['response'] = {
        "search_group": "default"
    };
//-->
</script>
  </div>
</div>
                            </div>
                            <div class="yui-u">

                            </div>
                        </div>
                    </div>
                </div>
                <div class="yui-b">

<div class="t11e-widget t11e-widget-jquery-button t11e-widget-id-clear">
    <div class="t11e-hd t11e-widget-jquery-button-hd"></div>
    <div class="t11e-bd t11e-widget-jquery-button-bd">
        <a class="ui-state-default ui-corner-all" href="#">Clear</a>
     </div>
    <div class="t11e-ft t11e-widget-jquery-button-ft"></div>
</div>
<script type="text/javascript">
//<!--
   t11e.widget_options['clear'] = {
       "search_group": "default",
       "event_name": "clear_search.${search_group}"
   };
//-->
</script>

<div class="t11e-widget t11e-widget-jquery-select t11e-widget-id-type">
    <div class="t11e-hd t11e-widget-jquery-select-hd"><h1>Type</h1></div>
    <div class="t11e-bd t11e-widget-jquery-select-bd">
        <form action="">
            <select name="type">
                <option value="">--Select One--</option>
                <option value="sales">Sales</option>
                <option value="rentals">Rentals</option>
            </select>
        </form>
     </div>
    <div class="t11e-ft t11e-widget-jquery-select-ft"></div>
</div>
<script type="text/javascript">
//<!--
   t11e.widget_options['type'] = {
       "search_group": "default",
       "value_param": "type"
   };
//-->
</script>

<div class="t11e-widget t11e-widget-jquery-faceted-slider t11e-widget-id-bedrooms">
    <div class="t11e-hd t11e-widget-jquery-faceted-slider-hd"><h1>Bedrooms</h1></div>
    <div class="t11e-bd t11e-widget-jquery-faceted-slider-bd">
        <div class="t11e-sparkline"></div>
        <div class="t11e-facets"></div>
        <div class="t11e-slider-control"></div>
        <div class="t11e-amount"></div>
    </div>
    <div class="t11e-ft t11e-widget-jquery-faceted-slider-ft"></div>
</div>
<script type="text/javascript">
//<!--
    t11e.widget_options['bedrooms'] = {
        "search_group": "default",
        "dimension": "bedroom",
        "page_param": "page",
        "min_value": 0,
        "max_value": 6,
        "param": "bedroom",
        "min_is_any": true,
        "value_to_param": function ($, value) {
            var value = Number(value) - 1;
            return value;
        },
        "param_to_value": function ($, value) {

            var value = Number(value) + 1;
            return value;
        },
        "format": function ($, amount, value){
            var display;
            if (value === '') {
                amount.html('--');
            } else {
                if (t11e.util.is_defined(value)) {
                    display = Number(value);
                    switch (value) {
                        case 0:
                            display = 'Studio';
                            break;
                        default:
                            display = display + ' BR';
                    }
                } else {
                    display = '--';
                }
                amount.html(display);
            }
        }
    };
//-->
</script>

<div class="t11e-widget t11e-widget-jquery-faceted-slider t11e-widget-id-bath">
    <div class="t11e-hd t11e-widget-jquery-faceted-slider-hd"><h1>Baths</h1></div>
    <div class="t11e-bd t11e-widget-jquery-faceted-slider-bd">
        <div class="t11e-sparkline"></div>
        <div class="t11e-facets"></div>
        <div class="t11e-slider-control"></div>
        <div class="t11e-amount"></div>
    </div>
    <div class="t11e-ft t11e-widget-jquery-faceted-slider-ft"></div>
</div>
<script type="text/javascript">
//<!--
    t11e.widget_options['bath'] = {
        "search_group": "default",
        "dimension": "bath",
        "page_param": "page",
        "min_value": 0,
        "max_value": 5,
        "param": "bath",
        "min_is_any": true,
        "format": function ($, amount, value){
            var display;
            if (value === '') {
                amount.html('--');
            } else {
                if (t11e.util.is_defined(value)) {
                    display = value + ' BA';
                } else {
                    display = '--';
                }
                amount.html(display);
            }
        }
    };
//-->
</script>

<div class="t11e-widget t11e-widget-jquery-faceted-dual-slider t11e-widget-id-price">
    <div class="t11e-hd t11e-widget-jquery-faceted-dual-slider-hd"><h1>Price</h1></div>
    <div class="t11e-bd t11e-widget-jquery-faceted-dual-slider-bd">
        <div class="t11e-slider-control"></div>
        <div class="t11e-amount"></div>
    </div>
    <div class="t11e-ft t11e-widget-jquery-faceted-dual-slider-ft">
    </div>
</div>
<script type="text/javascript">
//<!--
    t11e.widget_options['price'] = {
        "search_group": "default",
        "dimension": "price",
        "page_param": "page",
        "min_param": "price_min",
        "max_param": "price_max",
        "min_value": 0,
        "max_value": 1000000,
        "step": 25000,
        "min_is_any": true,
        "max_is_any": true,
        "format": function ($, amount, min_value, max_value) {
            if ('' === min_value) {min_value = ' any'} else { min_value = min_value/1000 + 'K' }
            if ('' === max_value) {max_value = ' any'} else { max_value = max_value/1000 + 'K' }
            amount.html('$' + min_value + ' - $' + max_value);
        }
    };
//-->
</script>

<div class="t11e-widget t11e-widget-jquery-faceted-dual-slider t11e-widget-id-lease">
    <div class="t11e-hd t11e-widget-jquery-faceted-dual-slider-hd"><h1>Lease</h1></div>
    <div class="t11e-bd t11e-widget-jquery-faceted-dual-slider-bd">
        <div class="t11e-slider-control"></div>
        <div class="t11e-amount"></div>
    </div>
    <div class="t11e-ft t11e-widget-jquery-faceted-dual-slider-ft">
    </div>
</div>
<script type="text/javascript">
//<!--
    t11e.widget_options['lease'] = {
        "search_group": "default",
        "dimension": "lease",
        "page_param": "page",
        "min_param": "lease_min",
        "max_param": "lease_max",
        "min_value": 0,
        "max_value": 11000,
        "min_is_any": true,
        "max_is_any": true,
        "step": 1000,
        "format": function ($, amount, min_value, max_value) {
            if ('' === min_value) {min_value = ' any'}
            if ('' === max_value) {max_value = ' any'}
            amount.html('$' + min_value + ' - $' + max_value);
        }
    };
//-->
</script>

<div class="t11e-widget t11e-widget-jquery-faceted-checkboxes t11e-widget-id-style">
    <div class="t11e-hd t11e-widget-jquery-faceted-checkboxes-hd"><h1>Style</h1></div>
    <div class="t11e-bd t11e-widget-jquery-faceted-checkboxes-bd">
        <form action="">
            <ol>
                <li>
                    <div class="row">
                        <input type="checkbox" id="style_0" name="style" value="multi-family"/>
                        <label for="style_0">multi-family</label>
                        <span class="facet-count">
                            <?php echo $initial["style"]["multi-family"] ?>
                        </span>
                        <ol>
                            <li>
                                <div class="row">
                                    <input type="checkbox" id="style_1" name="style" value="apartment"/>
                                    <label for="style_1">apartment</label>
                                    <span class="facet-count">
                                        <?php echo $initial["style"]["apartment"] ?>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div class="row">
                                    <input type="checkbox" id="style_2" name="style" value="condo"/>
                                    <label for="style_2">condo</label>
                                    <span class="facet-count">
                                        <?php echo $initial["style"]["condo"] ?>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div class="row">
                                    <input type="checkbox" id="style_3" name="style" value="co-op"/>
                                    <label for="style_3">co-op</label>
                                    <span class="facet-count">
                                        <?php echo $initial["style"]["co-op"] ?>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div class="row">
                                    <input type="checkbox" id="style_4" name="style" value="townhome"/>
                                    <label for="style_4">townhome</label>
                                    <span class="facet-count">
                                        <?php echo $initial["style"]["townhome"] ?>
                                    </span>
                                </div>
                            </li>
                        </ol>
                    </div>
                </li>
                <li>
                    <div class="row">
                        <input type="checkbox" id="style_5" name="style" value="single-family"/>
                        <label for="style_5">single-family</label>
                        <span class="facet-count">
                            <?php echo $initial["style"]["single-family"] ?>
                        </span>
                        <ol>
                            <li>
                                <div class="row">
                                    <input type="checkbox" id="style_6" name="style" value="colonial"/>
                                    <label for="style_6">colonial</label>
                                    <span class="facet-count">
                                        <?php echo $initial["style"]["colonial"] ?>
                                    </span>
                                    <ol>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" id="style_7" name="style" value="new england"/>
                                                <label for="style_7">new england</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["new england"] ?>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" id="style_8" name="style" value="cape cod"/>
                                                <label for="style_8">cape cod</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["cape cod"] ?>
                                                </span>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                            </li>
                            <li>
                                <div class="row">
                                    <input type="checkbox" id="style_9" name="style" value="classical"/>
                                    <label for="style_9">classical</label>
                                    <span class="facet-count">
                                        <?php echo $initial["style"]["classical"] ?>
                                    </span>
                                    <ol>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" id="style_10" name="style" value="federal"/>
                                                <label for="style_10">federal</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["federal"] ?>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" id="style_11"name="style" value="greek revival"/>
                                                <label for="style_11">greek revival</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["greek revival"] ?>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" id="style_12" name="style" value="tidewater"/>
                                                <label for="style_12">tidewater</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["tidewater"] ?>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" id="style_13" name="style" value="antebellum"/>
                                                <label for="style_13">antebellum</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["antebellum"] ?>
                                                </span>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                            </li>
                            <li>
                                <div class="row">
                                    <input type="checkbox" id="style_14" name="style" value="victorian"/>
                                    <label for="style_14">victorian</label>
                                    <span class="facet-count">
                                        <?php echo $initial["style"]["victorian"] ?>
                                    </span>
                                    <ol>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" id="style_15" name="style" value="gothic"/>
                                                <label for="style_15">gothic</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["gothic"] ?>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" id="style_16" name="style" value="second empire"/>
                                                <label for="style_16">second empire</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["second empire"] ?>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" id="style_17" name="style" value="queen anne"/>
                                                <label for="style_17">queen anne</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["queen anne"] ?>
                                                </span>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                            </li>
                            <li>
                                <div class="row">
                                    <input type="checkbox" id="style_18" name="style" value="contemporary"/>
                                    <label for="style_18">contemporary</label>
                                    <span class="facet-count">
                                        <?php echo $initial["style"]["contemporary"] ?>
                                    </span>
                                    <ol>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" id="style_19" name="style" value="ranch"/>
                                                <label for="style_19">ranch</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["ranch"] ?>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" id="style_20" name="style" value="raised ranch"/>
                                                <label for="style_20">raised ranch</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["raised ranch"] ?>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" id="style_21" name="style" value="split-level"/>
                                                <label for="style_21">split-level</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["split-level"] ?>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" id="style_22" name="style" value="bauhaus"/>
                                                <label for="style_22">bauhaus</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["bauhaus"] ?>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" id="style_23" name="style" value="art moderne"/>
                                                <label for="style_23">art moderne</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["art moderne"] ?>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" id="style_24" name="style" value="transitional"/>
                                                <label for="style_24">transitional</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["transitional"] ?>
                                                </span>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                            </li>
                        </ol>
                    </div>
                </li>
            </ol>
        </form>
    </div>
    <div class="t11e-ft t11e-widget-jquery-faceted-checkboxes-ft"></div>
</div>
<script type="text/javascript">
 //<!--
     t11e.widget_options['style'] = {
         "search_group": "default",
         "value_param": "style",
         "dimension": "style"
     };
 //-->
</script>
                </div>
            </div>

            <div id="ft" role="contentinfo">
            </div>
        </div>
        <script type="text/javascript" src="build/jquery-1.3.2.min.js" charset="utf-8"></script>
        <script type="text/javascript" src="build/jquery-ui-1.7.2.min.js" charset="utf-8"></script>
        <script type="text/javascript" src="build/widgets.js" charset="utf-8"></script>
        <script type="text/javascript">//<![CDATA[
        (function ($) {
            t11e.widget.jquery.activate_widgets($);
            $('#tabs').tabs();

            $('.t11e-widget-jquery-button a').hover(
                function () {
                    $(this).addClass("ui-state-hover");
                },
                function () {
                    $(this).removeClass("ui-state-hover");
                }
            );
            var options = {"search_groups": {"default": {"url": "php/t11e_tutorial.php"}}};
            options.history_plugin = t11e.widget.jquery.history_plugin($);
            options.search_plugin = t11e.widget.jquery.search_plugin($);
            t11e.widget.activate_search_page(options);
        }(jQuery));
        //]]></script>
    </body>
</html>

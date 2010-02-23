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
        <link href="build/widgets-theme-simple.min.css" rel="stylesheet" type="text/css" />
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
        <div id="doc3" class="yui-t3">
            <div id="hd" role="banner">
              <h1>Tutorial Search Page</h1>
            </div>
            <div id="bd" role="main">
                <div id="yui-main">
                    <div class="yui-b">
                        <div class="yui-g">
                            <div class="yui-u first">

<div class="t11e-widget t11e-widget-jquery-pagination t11e-widget-id-1">
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
    t11e.widget_options['1'] = {
        "search_group": "default",
        "page_param": "page"
    };
//-->
</script>

<div class="t11e-widget t11e-widget-jquery-results t11e-widget-id-2">
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
    t11e.widget_options['2'] = {
        "search_group": "default",
        "base_url": "php/t11e_tutorial_results.php"
    };
//-->
</script>

<div class="t11e-widget t11e-widget-jquery-pagination t11e-widget-id-3">
    <div class="t11e-hd t11e-widget-jquery-pagination-hd"></div>
    <div class="t11e-bd t11e-widget-jquery-pagination-bd">
        <div class="pagination">
            <a href="#" class="prev">Prev</a><a href="#">1</a><a href="#" class="next">Next</a>
        </div>
    </div>
    <div class="t11e-ft t11e-widget-jquery-pagination-ft"></div>
</div><script type="text/javascript">
//<!--
    t11e.widget_options['3'] = {
        "search_group": "default",
        "page_param": "page"
    };
//-->
</script>

<div class="t11e-widget t11e-widget-jquery-response t11e-widget-id-4">
    <div class="t11e-hd t11e-widget-jquery-response-hd">JSON Response</div>
    <div class="t11e-bd t11e-widget-jquery-response-bd">
        <div class="response"></div>
    </div>
    <div class="t11e-ft t11e-widget-jquery-response-ft"></div>
</div>
<script type="text/javascript">
//<!--
    t11e.widget_options['4'] = {
        "search_group": "default"
    };
//-->
</script>

                            </div>
                            <div class="yui-u">

                            </div>
                        </div>
                    </div>
                </div>
                <div class="yui-b">

<div class="t11e-widget t11e-widget-jquery-button t11e-widget-id-5">
    <div class="t11e-hd t11e-widget-jquery-button-hd"></div>
    <div class="t11e-bd t11e-widget-jquery-button-bd">
        <a href="#">Clear</a>
     </div>
    <div class="t11e-ft t11e-widget-jquery-button-ft"></div>
</div>
<script type="text/javascript">
//<!--
   t11e.widget_options['5'] = {
       "search_group": "default",
       "event_name": "clear_search.${search_group}"
   };
//-->
</script>

<div class="t11e-widget t11e-widget-jquery-select t11e-widget-id-6">
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
   t11e.widget_options['6'] = {
       "search_group": "default",
       "value_param": "type"
   };
//-->
</script>

<div class="t11e-widget t11e-widget-jquery-faceted-slider t11e-widget-id-7">
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
    t11e.widget_options['7'] = {
        "search_group": "default",
        "dimension": "bedroom",
        "page_param": "page",
        "min_value": 0,
        "max_value": 5,
        "param": "bedroom",
        "format": function ($, amount, value){
            var display;
            if ('undefined' !== typeof value) {
                display = value;
                switch (value) {
                    case 0:
                        display = 'Studio';
                        break;
                    case 5:
                        display = value + '+ BR';
                        break;
                    default:
                        display = value + ' BR';
                }
            } else {
                display = '--';
            }
            amount.html(display);
        }
    };
//-->
</script>

<div class="t11e-widget t11e-widget-jquery-faceted-slider t11e-widget-id-8">
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
    t11e.widget_options['8'] = {
        "search_group": "default",
        "dimension": "bath",
        "page_param": "page",
        "min_value": 1,
        "max_value": 5,
        "param": "bath",
        "value_to_param": function ($, value) {
            var param;
            if (t11e.util.is_defined(value)) {
                switch (value) {
                    case 0:
                        param = "[0,1)";
                        break;
                    case 1:
                        param = "[1,2)";
                        break;
                    case 2:
                        param = "[2,3)";
                        break;
                    case 3:
                        param = "[3,4)";
                        break;
                    case 4:
                        param = "[4,5)";
                        break;
                    case 5:
                        param = "[5,]";
                        break;
                }
            }
            return param;
        },
        "param_to_value": function ($, param) {
            var value = 0;
            if (t11e.util.is_defined(param)) {
                switch (param) {
                    case "[0,1)":
                        value = 0;
                        break;
                    case "[1,2)":
                        value = 1;
                        break;
                    case "[2,3)":
                        value = 2;
                        break;
                    case "[3,4)":
                        value = 3;
                        break;
                    case "[4,5)":
                        value = 4;
                        break;
                    case "[5,]":
                        value = 5;
                        break;
                }
            }
            return value;
        },
        "format": function ($, amount, value){
            var display;
            if ('undefined' !== typeof value) {
                display = value;
                switch (value) {
                    case 0:
                        display = '--';
                        break;
                    case 5:
                        display = value + '+ BA';
                        break;
                    default:
                        display = value + ' BA';
                }
            } else {
                display = '--';
            }
            amount.html(display);
        }
    };
//-->
</script>

<div class="t11e-widget t11e-widget-jquery-faceted-dual-slider t11e-widget-id-9">
    <div class="t11e-hd t11e-widget-jquery-faceted-dual-slider-hd"><h1>Price</h1></div>
    <div class="t11e-bd t11e-widget-jquery-faceted-dual-slider-bd">
        <div class="t11e-amount"></div>
        <div class="t11e-slider-control"></div>
    </div>
    <div class="t11e-ft t11e-widget-jquery-faceted-dual-slider-ft">
    </div>
</div>
<script type="text/javascript">
//<!--
    t11e.widget_options['9'] = {
        "search_group": "default",
        "dimension": "price",
        "page_param": "page",
        "min_param": "price_min",
        "max_param": "price_max",
        "min_value": 0,
        "max_value": 1000000,
        "step": 25000,

        "format": function ($, amount, min_value, max_value) {
            amount.html('$' + (min_value/1000) + 'K - $' + (max_value/1000) +'K');
        }
    };
//-->
</script>

<div class="t11e-widget t11e-widget-jquery-faceted-dual-slider t11e-widget-id-10">
    <div class="t11e-hd t11e-widget-jquery-faceted-dual-slider-hd"><h1>Lease</h1></div>
    <div class="t11e-bd t11e-widget-jquery-faceted-dual-slider-bd">
        <div class="t11e-amount"></div>
        <div class="t11e-slider-control"></div>
    </div>
    <div class="t11e-ft t11e-widget-jquery-faceted-dual-slider-ft">
    </div>
</div>
<script type="text/javascript">
//<!--
    t11e.widget_options['10'] = {
        "search_group": "default",
        "dimension": "lease",
        "page_param": "page",
        "min_param": "lease_min",
        "max_param": "lease_max",
        "min_value": 0,
        "max_value": 10000,
        "step": 100,
        "format": function ($, amount, min_value, max_value) {
            amount.html('$' + min_value + ' - $' + max_value);
        }
    };
//-->
</script>

<div class="t11e-widget t11e-widget-jquery-faceted-checkboxes t11e-widget-id-11">
    <div class="t11e-hd t11e-widget-jquery-faceted-checkboxes-hd"><h1>Style</h1></div>
    <div class="t11e-bd t11e-widget-jquery-faceted-checkboxes-bd">
        <form action="">
            <ol>
                <li>
                    <div class="row">
                        <input type="checkbox" name="style" value="multi-family"/>
                        <label>multi-family</label>
                        <span class="facet-count">
                            <?php echo $initial["style"]["multi-family"] ?>
                        </span>
                        <ol>
                            <li>
                                <div class="row">
                                    <input type="checkbox" name="style" value="apartment"/>
                                    <label>apartment</label>
                                    <span class="facet-count">
                                        <?php echo $initial["style"]["apartment"] ?>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div class="row">
                                    <input type="checkbox" name="style" value="condo"/>
                                    <label>condo</label>
                                    <span class="facet-count">
                                        <?php echo $initial["style"]["condo"] ?>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div class="row">
                                    <input type="checkbox" name="style" value="co-op"/>
                                    <label>co-op</label>
                                    <span class="facet-count">
                                        <?php echo $initial["style"]["co-op"] ?>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div class="row">
                                    <input type="checkbox" name="style" value="townhome"/>
                                    <label>townhome</label>
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
                        <input type="checkbox" name="style" value="single-family"/>
                        <label>single-family</label>
                        <span class="facet-count">
                            <?php echo $initial["style"]["single-family"] ?>
                        </span>
                        <ol>
                            <li>
                                <div class="row">
                                    <input type="checkbox" name="style" value="colonial"/>
                                    <label>colonial</label>
                                    <span class="facet-count">
                                        <?php echo $initial["style"]["colonial"] ?>
                                    </span>
                                    <ol>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" name="style" value="new england"/>
                                                <label>new england</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["new england"] ?>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" name="style" value="cape cod"/>
                                                <label>cape cod</label>
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
                                    <input type="checkbox" name="style" value="classical"/>
                                    <label>classical</label>
                                    <span class="facet-count">
                                        <?php echo $initial["style"]["classical"] ?>
                                    </span>
                                    <ol>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" name="style" value="federal"/>
                                                <label>federal</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["federal"] ?>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" name="style" value="greek revival"/>
                                                <label>greek revival</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["greek revival"] ?>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" name="style" value="tidewater"/>
                                                <label>tidewater</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["tidewater"] ?>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" name="style" value="antebellum"/>
                                                <label>antebellum</label>
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
                                    <input type="checkbox" name="style" value="victorian"/>
                                    <label>victorian</label>
                                    <span class="facet-count">
                                        <?php echo $initial["style"]["victorian"] ?>
                                    </span>
                                    <ol>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" name="style" value="gothic"/>
                                                <label>gothic</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["gothic"] ?>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" name="style" value="second empire"/>
                                                <label>second empire</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["second empire"] ?>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" name="style" value="queen anne"/>
                                                <label>queen anne</label>
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
                                    <input type="checkbox" name="style" value="contemporary"/>
                                    <label>contemporary</label>
                                    <span class="facet-count">
                                        <?php echo $initial["style"]["contemporary"] ?>
                                    </span>
                                    <ol>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" name="style" value="ranch"/>
                                                <label>ranch</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["ranch"] ?>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" name="style" value="raised ranch"/>
                                                <label>raised ranch</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["raised ranch"] ?>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" name="style" value="split-level"/>
                                                <label>split-level</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["split-level"] ?>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" name="style" value="bauhaus"/>
                                                <label>bauhaus</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["bauhaus"] ?>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" name="style" value="art moderne"/>
                                                <label>art moderne</label>
                                                <span class="facet-count">
                                                    <?php echo $initial["style"]["art moderne"] ?>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row">
                                                <input type="checkbox" name="style" value="transitional"/>
                                                <label>transitional</label>
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
     t11e.widget_options['11'] = {
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
        <script type="text/javascript" src="build/jquery.sparkline-1.4.3.js" charset="utf-8"></script>
        <script type="text/javascript" src="build/widgets.js" charset="utf-8"></script>
        <script type="text/javascript">//<![CDATA[
        (function ($) {
            t11e.widget.jquery.activate_widgets($);
            var options = {"search_groups": {"default": {"url": "php/t11e_tutorial.php"}}};
            options.history_plugin = t11e.widget.jquery.history_plugin($);
            options.search_plugin = t11e.widget.jquery.search_plugin($);
            t11e.widget.activate_search_page(options);
        }(jQuery));
        //]]></script>
    </body>
</html>

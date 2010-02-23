<?php
require("t11e.inc");

/**
* Use of the getProperties method is for testing purposes only
* and not to be used in a production setting.
*/
$url = 'http://tutorial2.discoverysearchengine.com:8090/json/getProperties';

if (array_key_exists('itemIds', $_GET)) {
    $itemIds = explode(',', $_GET['itemIds']);
}
if (array_key_exists('exactMatches', $_GET)) {
    $exactMatches = str_split($_GET['exactMatches']);
}
if (array_key_exists('totalSize', $_GET)) {
    $totalSize = (int) $_GET['totalSize'];
}
if (array_key_exists('exactSize', $_GET)) {
    $exactSize = (int) $_GET['exactSize'];
}
if (array_key_exists('startIndex', $_GET)) {
    $startIndex = (int) $_GET['startIndex'];
}
if (array_key_exists('pageSize', $_GET)) {
    $pageSize = (int) $_GET['pageSize'];
}

$request = array( 'ids' => $itemIds );
$response = t11e_json_post($url, $request);
$properties = $response['properties'];

?>
<p>Your search returned <strong><?php echo $exactSize ?></strong> exact matches.</p>
<?php
if ($totalSize > 0) {
    for ($i=0; $i < count($itemIds); $i++) {
?>
<div style="border-top: 1px solid #ddd;" class="t11e-item <?php echo $exactMatches[$i] ? 't11e-exact' : 't11e-fuzzy' ?>">
<?php
        foreach ($properties[$i] as $key => $value) {
?>
<p><strong><?php echo $key ?>:</strong>&nbsp;<?php echo $value ?></p>
<?php
        }
?>
</div>
<?php

    }
}

?>

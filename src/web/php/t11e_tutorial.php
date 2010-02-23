<?php
require('t11e.inc');

//$url = 'http://localhost:8090/json/query';
$url = 'http://tutorial2.discoverysearchengine.com:8090/json/query';
$pageSize = 10;

if (array_key_exists('page', $_GET)) {
     $page = (int)  $_GET['page'];
     $startIndex = ($page - 1) * $pageSize;
} else {
    $startIndex = 0;
}

$request = array(
    'startIndex' => $startIndex,
    'pageSize' => $pageSize
);

$drillDown = array(
    array('dimension' => 'bath'),
    array('dimension' => 'bedroom'),
    array('dimension' => 'condition'),
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
);

$criteria = array();

if (array_key_exists('type', $_GET)) {
    $criteria[] = array(
        'dimension' => 'type',
        'value' => $_GET['type']
    );
};

if (array_key_exists('bath', $_GET)) {
    $criteria[] = array(
        'dimension' => 'bath',
        'value' => $_GET['bath']
    );
};

if (array_key_exists('bedroom', $_GET)) {
    $criteria[] = array(
        'dimension' => 'bedroom',
        'value' => $_GET['bedroom']
    );
};

if (array_key_exists('condition', $_GET)) {
    $criteria[] = array(
        'dimension' => 'condition',
        'id' => $_GET['condition']
    );
};

if (array_key_exists('style', $_GET)) {
    $criteria[] = array(
        'dimension' => 'style',
        'id' => $_GET['style']
    );
};

if (array_key_exists('price_min', $_GET) &&
    array_key_exists('price_max', $_GET)) {
    $criteria[] = array(
        'dimension' => 'price',
        'value' => '['. $_GET['price_min'] . ',' . $_GET['price_max'] . ']'
    );
};

if (array_key_exists('lease_min', $_GET) &&
    array_key_exists('lease_max', $_GET)) {
    $criteria[] = array(
        'dimension' => 'lease',
        'value' => '['. $_GET['lease_min'] . ',' . $_GET['lease_max'] . ']'
    );
};

if (!empty($criteria)) {
    $request['criteria'] = $criteria;
}

if (!empty($drillDown)) {
    $request['drillDown'] = $drillDown;
}

echo t11e_query($url, $request);

?>

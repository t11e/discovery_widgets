<?php

function t11e_fix_get() {
    /**
    * From http://php.net/manual/en/reserved.variables.get.php
    * Adds support for retrieving arrays from $_GET.
    */
    $query_string = $_SERVER['QUERY_STRING'];
    $params = array();
    $pairs = explode('&', $query_string);

    foreach ($pairs as $i) {
        if (!empty($i)) {
            list($name, $value) = explode('=', $i, 2);
            $name = rawurldecode($name);
            $value = rawurldecode($value);
            if (isset($params[$name]) ) {
                if (is_array($params[$name]) ) {
                    $params[$name][] = $value;
                } else {
                    $params[$name] = array($params[$name], $value);
                }
            } else {
                $params[$name] = $value;
            }
        }
    }

    foreach ( $_GET as $key => $value ) {
        if (is_array($params[$key]) ) {
            $_GET[$key] = $params[$key];
            $_REQUEST[$key] = $params[$key];
        }
    }

    return $params;
}
t11e_fix_get();

function t11e_initial_request($url, $data) {
    /**
    * Generates drillDown counts for the initial page load.
    */
    $response = t11e_json_post($url, $data);

    $drillDowns = $response['drillDown'];
    $initial = array();

    foreach ($drillDowns as $drillDown) {
        $dimension = $drillDown['dimension'];
        $exactCounts = $drillDown['exactCounts'];
        $ids = $drillDown['ids'];
        $initial[$dimension] = array();
        for ($i=0; $i < count($ids); $i++) {
            $initial[$dimension][$ids[$i]] = $exactCounts[$i];
        }
    }
    return $initial;
}

function t11e_query($url, $request) {
    $response = t11e_json_post($url, $request);
    if (is_array($response)) {
        $query_params = array(
            'totalSize' => (int) $response['totalSize'],
            'exactSize' => (int) $response['exactSize'],
            'startIndex' => (int) $response['startIndex'],
            'pageSize' => (int) $response['pageSize']
        );
        if (!empty($response['itemIds'])) {
            $query_params['itemIds'] = implode(',', $response['itemIds']);
        }
        if (!empty($response['exactMatches'])) {
            $query_params['exactMatches'] = implode($response['exactMatches'],'');
        }

        $results = array(
            'results_query_params' => http_build_query($query_params),
            '_discovery' => array(
                'request' => $request,
                'response' => $response
            )
        );
        return json_encode($results);
    } else {
        return $response;
    }
}

function t11e_json_post($url, $data) {
    /**
    * Posts $data to $url and expects JSON data in return
    */
    $json_data = json_encode($data);
    $c = curl_init($url);
    curl_setopt($c, CURLOPT_RETURNTRANSFER,true);
    curl_setopt($c, CURLOPT_POST, true);
    curl_setopt($c, CURLOPT_POSTFIELDS, $json_data);
    curl_setopt($c, CURLOPT_FAILONERROR,true);
    curl_setopt($c, CURLOPT_HTTPHEADER,array('Content-Type: application/json'));

    $response = curl_exec($c);
    $http_status = curl_getinfo($c, CURLINFO_HTTP_CODE);
    $error = curl_error($c);
    curl_close($c);

    if ($http_status == 200) {
        return json_decode($response, true);
    } else {
        return $error;
    }
}

?>

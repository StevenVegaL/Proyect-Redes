<?php
$url = "http://localhost:3002/api/pedidos"; // URL del servicio de pedidos
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
if($e = curl_error($ch)){
    echo $e;
} else {
    $decoded = json_decode($response, true);
    echo '<pre>'; print_r($decoded); echo '</pre>';
}
curl_close($ch);
?>

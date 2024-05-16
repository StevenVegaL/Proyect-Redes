<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $pedidoId = $_POST['pedidoId'];
    $url = "http://localhost:3002/api/pedidos/" . $pedidoId;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    if($e = curl_error($ch)){
        echo $e;
    } else {
        $decoded = json_decode($response, true);
        echo '<pre>'; print_r($decoded); echo '</pre>';
    }
    curl_close($ch);
}
?>

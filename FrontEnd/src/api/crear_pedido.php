<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $data = array(
        'cliente_id' => $_POST['cliente_id'],
        'fechaPedido' => $_POST['fechaPedido'],
        'estadoPedido' => $_POST['estadoPedido'],
        'numeroFactura' => $_POST['numeroFactura'],
        'fechaEnvio' => $_POST['fechaEnvio'],
        'estadoEnvio' => $_POST['estadoEnvio'],
        'detalle' => $_POST['detalle'] // Asegúrate de que esto se envíe correctamente desde el frontend
    );
    $url = "http://localhost:3002/api/pedidos";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
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

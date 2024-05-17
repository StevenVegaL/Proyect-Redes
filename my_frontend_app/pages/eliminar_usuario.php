<?php
session_start();
include '../includes/functions.php';  // Incluir funciones para hacer solicitudes HTTP

// Verificar si la ID está establecida en la URL
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Realizar una solicitud DELETE al microservicio de usuarios
    $url = 'http://localhost:3001/api/users/' . $id;
    $response = makeRequest($url, 'DELETE');

    if ($response['code'] == 200) {
        // Redirigir al panel de administración con un mensaje de éxito
        header("Location: admin_panel.php?msg=Cliente eliminado con éxito");
    } else {
        // Redirigir al panel de administración con un mensaje de error
        header("Location: admin_panel.php?msg=Error al eliminar el cliente");
    }
} else {
    // Si no se proporciona un ID, redirigir al panel de administración
    header("Location: admin_panel.php?msg=ID de cliente no proporcionado");
}
?>

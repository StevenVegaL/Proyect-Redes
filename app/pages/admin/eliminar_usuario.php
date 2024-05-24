<?php
    session_start();
    include '../../includes/functions.php';

    if (!isset($_SESSION['admin_id'])) {
        header('Location: ../session.html');
    }

    // Verificar si la ID está establecida en la URL
    if (isset($_GET['ClienteID'])) {
        $id = $_GET['ClienteID'];

        // Realizar una solicitud DELETE al microservicio de usuarios
        $url = 'http://microuser:3001/api/users/delete/' . $id;
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

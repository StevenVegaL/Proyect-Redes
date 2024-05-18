<?php
include '../includes/functions.php';

$message = ''; // Aquí guardaremos el mensaje

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre_cliente = $_POST['nombre_cliente'];
    $direccion = $_POST['direccion'];
    $telefono = $_POST['telefono'];
    $email = $_POST['email'];
    $password = $_POST['password']; // Debes considerar encriptar esta contraseña

    // Depuración: mostrar datos enviados
    echo '<pre>';
    print_r($_POST);
    echo '</pre>';

    $url = 'http://localhost:3001/api/users/new'; // Actualizamos la URL de la API para registrar un nuevo usuario
    $data = [
        'nombre' => $nombre_cliente,
        'direccion' => $direccion,
        'telefono' => $telefono,
        'email' => $email,
        'password' => $password,
        'userType' => 'cliente'
    ];

    $response = makeRequest($url, 'POST', $data);

    // Depuración: mostrar respuesta de la API
    echo '<pre>';
    print_r($response);
    echo '</pre>';

    if ($response['code'] == 201) {
        $message = '<input type="checkbox" id="close-alert" style="display: none;">
        <div class="alert">
          ¡Te has registrado correctamente!
          <br>
          <a href="index.php" class="close-alert">Iniciar Sesión</a>
        </div>';
    } elseif ($response['code'] == 409) { // Asumiendo que el código 409 es para conflictos (duplicado de email)
        $message = '<input type="checkbox" id="close-alert" style="display: none;">
        <div class="alert">
          El correo electrónico ya existe
          <br>
          <a href="index.php" class="close-alert">Cerrar</a>
        </div>';
    } else {
        $message = "Error desconocido: " . $response['response']['error'];
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css"> <!-- Ruta al archivo CSS correspondiente -->
    <title>Registro - Sabor Tostado</title>
    <style>
        .alert {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            font-size: 16px;
            background-color: #2b657c; /* Color azul */
            color: white;
            border-radius: 8px;
            z-index: 1000; /* Asegura que la alerta esté por encima de otros elementos */
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
            text-align: center;
        }

        .close-alert {
            display: inline-block;
            margin-top: 10px;
            background-color: white;
            color: #2b657c;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 4px;
            transition: background-color 0.3s;
            text-decoration: none; /* Esto quitará el subrayado */
        }

        .close-alert:hover {
            background-color: #f5f5f5;
        }

        #close-alert:checked + .alert {
            display: none; /* Oculta la alerta cuando el checkbox está marcado */
        }
    </style>
</head>
<body>
    <div class="container">
        <?php echo $message; ?>
    </div>
</body>
</html>

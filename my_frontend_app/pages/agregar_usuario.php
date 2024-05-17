<?php
session_start();
include '../includes/functions.php';

// Verificar si el administrador ha iniciado sesión
if (!isset($_SESSION['admin_id'])) {
    header('Location: ../index.php');
    exit();
}

// Si se envía el formulario, procesa e inserta a través del microservicio
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $newUser = [
        'nombre' => $_POST['nombre_cliente'],
        'direccion' => $_POST['direccion'],
        'telefono' => $_POST['telefono'],
        'email' => $_POST['email'],
        'password' => $_POST['password'],  // No se hashea aquí, se debería hashear en el microservicio
        'userType' => 'cliente'  // O el tipo de usuario que corresponda
    ];
    
    $url = 'http://localhost:3001/api/users';
    $response = makeRequest($url, 'POST', $newUser);

    if ($response['code'] == 201) {
        header("Location: admin_panel.php?msg=Cliente agregado con éxito");
    } else {
        header("Location: admin_panel.php?msg=Error al agregar el cliente");
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administración - Sabor Tostado</title>
    <link rel="stylesheet" href="../css/styles_editar_user.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap">
</head>
<body>
    <!-- Header -->
    <header>
        <!-- Menú Hamburguesa -->
        <div class="hamburger-menu">
            <i class="fas fa-bars"></i>
            <div class="dropdown-menu">
                <a href="foro.php">Foro</a>
                <a href="asesoramiento.php">Asesoramiento</a>
            </div>
        </div>
        <a href="admin_panel.php" class="logo">Sabor Tostado</a>
        <div class="header-right">
            <form action="resultados.php" method="get" class="search-form">
                <input type="text" name="query" placeholder="Buscar producto..." required>
                <input type="submit" value="Buscar">
            </form>
            <div class="cart-icon">
                <i class="fas fa-shopping-cart fa-lg"></i>
            </div>
        </div>
        <a href="logout.php" class="logout-button">Cerrar Sesión</a>
    </header>
    <h2>Agregar Usuarios</h2>

    <form action="agregar_usuario.php" method="post" class="user-edit-form">
        <label for="nombre_cliente">Nombre:</label>
        <input type="text" name="nombre_cliente" required>
        
        <label for="direccion">Dirección:</label>
        <input type="text" name="direccion" required>

        <label for="telefono">Teléfono:</label>
        <input type="text" name="telefono" required>
        
        <label for="email">Correo Electrónico:</label>
        <input type="email" name="email" required>
        
        <label for="password">Contraseña:</label>
        <input type="password" name="password" required>
        
        <input type="submit" value="Agregar">
    </form>

    <!-- Footer -->
    <footer>
        <h2>El arte del café</h2>
        <p>Disfruta de los mejores sabores y aromas que te ofrece Sabor Tostado.</p>
        <div class="social-icons">
            <!-- Inserta tus íconos de redes sociales aquí -->
        </div>
    </footer>
    <script src="js/main.js"></script>
</body>
</html>

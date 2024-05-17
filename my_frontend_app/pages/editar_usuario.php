<?php
session_start();
include '../includes/functions.php';

// Verifica si se ha pasado un ID en la URL
if(isset($_GET['id'])) {
    $id = $_GET['id'];
} else {
    header("Location: admin_panel.php?msg=ID de cliente no proporcionado");
    exit;
}

// Si se envía el formulario, procesa y actualiza a través del microservicio
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $updatedUser = [
        'nombre' => $_POST['Nombre_cliente'],
        'direccion' => $_POST['Dirección'],
        'telefono' => $_POST['Teléfono'],
        'email' => $_POST['Email']
    ];

    // Solo actualizar la contraseña si se proporciona una nueva
    if (!empty($_POST['password'])) {
        $updatedUser['password'] = $_POST['password'];
    }
    
    $url = 'http://localhost:3001/api/users/' . $id;
    $response = makeRequest($url, 'PATCH', $updatedUser);

    if ($response['code'] == 200) {
        header("Location: admin_panel.php?msg=Cliente actualizado con éxito");
    } else {
        header("Location: admin_panel.php?msg=Error al actualizar el cliente");
    }
}

// Obtener los datos del cliente para rellenar el formulario
$url = 'http://localhost:3001/api/users/' . $id;
$response = makeRequest($url);

if ($response['code'] == 200) {
    $cliente = $response['response']['usuario'];
} else {
    header("Location: admin_panel.php?msg=Error al obtener los datos del cliente");
    exit;
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
    <h2>Editar Usuarios</h2>

    <!-- Formulario para editar usuario -->
    <form action="editar_usuario.php?id=<?= htmlspecialchars($id) ?>" method="post" class="user-edit-form">
        <label for="Nombre_cliente" class="form-label">Nombre:</label>
        <input type="text" name="Nombre_cliente" value="<?= htmlspecialchars($cliente['nombre']) ?>" required class="form-input">

        <label for="Dirección" class="form-label">Dirección:</label>
        <input type="text" name="Dirección" value="<?= htmlspecialchars($cliente['direccion']) ?>" required class="form-input">

        <label for="Teléfono" class="form-label">Teléfono:</label>
        <input type="text" name="Teléfono" value="<?= htmlspecialchars($cliente['telefono']) ?>" required class="form-input">

        <label for="Email" class="form-label">Correo Electrónico:</label>
        <input type="email" name="Email" value="<?= htmlspecialchars($cliente['email']) ?>" required class="form-input">

        <label for="password" class="form-label">Contraseña:</label>
        <input type="password" name="password" value="" placeholder="Dejar vacío para no cambiar" class="form-input">

        <input type="submit" value="Actualizar" class="button">
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

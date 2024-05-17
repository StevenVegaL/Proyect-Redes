<?php
session_start();
include '../includes/functions.php';  // Incluir funciones para hacer solicitudes HTTP
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administracion - Sabor Tostado</title>
    <link rel="stylesheet" href="../css/styles_admin.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
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
<h2>Gestión de Inventario</h2>

<form action="inventario.php" method="GET" class="search-form">
    <h2><label for="nombre_producto">Buscar producto por nombre:</label></h2>
    <input type="text" name="nombre_producto" required>
    <input type="submit" value="Buscar">
</form>
<script src="../js/main_user.js"></script>

<?php
$url = 'http://localhost:3003/api/productos';

if (isset($_GET['nombre_producto']) && !empty($_GET['nombre_producto'])) {
    $nombre_producto = urlencode($_GET['nombre_producto']);
    $url .= '?nombre=' . $nombre_producto;

    $response = makeRequest($url);

    if ($response['code'] == 200 && count($response['response']['productos']) > 0) {
        echo "<h2>Resultados de la búsqueda</h2>";
    } else {
        echo "No se encontraron productos con el nombre: " . htmlspecialchars($_GET['nombre_producto']);
    }
} else {
    $response = makeRequest($url);
    echo "<h2>Stock de Productos</h2>";
}

if ($response['code'] == 200) {
    $productos = $response['response']['productos'];
    echo "<table>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>ID Proveedor</th>
            <th>Stock</th>
        </tr>";

    foreach ($productos as $producto) {
        echo "<tr>
            <td>{$producto['ProductoID']}</td>
            <td>{$producto['nombre']}</td>
            <td>{$producto['descripcion']}</td>
            <td>{$producto['ProveedorID']}</td>
            <td>{$producto['stock']}</td>
        </tr>";
    }
    echo "</table>";
} else {
    echo "<p>Error al obtener los productos.</p>";
}
?>

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

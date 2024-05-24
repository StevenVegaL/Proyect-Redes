<?php
    session_start();
    include '../../includes/functions.php';
    
    if (!isset($_SESSION['admin_id'])) {
        header('Location: ../session.html');
    }
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administracion - Sabor Tostado</title>
    <link rel="stylesheet" href="../../css/styles_admin.css">
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
                <a href="agregar_usuario.php">Agregar Nuevo Usuario</a>
                <a href="historial_pedidos.php">Historial de pedidos</a>
                <a href="inventario.php">Inventario de productos</a>
                <a href="#">Foro</a>
                <a href="#">Asesoramiento</a>
            </div>
        </div>
        <a href="admin_panel.php" class="logo">Sabor Tostado</a>
        <div class="header-right">
            <form action="resultados_admin.php" method="get" class="search-form">
                <input type="text" name="query" placeholder="Buscar producto..." required>
                <input type="submit" value="Buscar">
            </form>
            <div class="cart-icon">
                <i class="fas fa-shopping-cart fa-lg"></i>
            </div>
        </div>
        <a href="../logout.php" class="logout-button">Cerrar Sesión</a>
    </header>
    
    <h2>Gestión de Inventario</h2>

    <form id="formProducto" class="search-form">
        <h2><label for="nombre_producto">Buscar producto por nombre:</label></h2>
        <input type="text" name="nombre_producto" required>
        <input type="submit" value="Buscar">
    </form>

    <?php
    $url = 'http://microproduct:3003/api/productos';

    $response = makeRequest($url);

    if ($response['code'] == 200) {
        $productos = $response['response']['products'];
        echo "<h2>Stock de Productos</h2>";
        echo "<table id='productosTable'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>ID Proveedor</th>
                    <th>Stock</th>
                </tr>
            </thead>
            <tbody>";
        foreach ($productos as $producto) {
            echo "<tr>
                <td>{$producto['_id']}</td>
                <td>{$producto['nombreProducto']}</td>
                <td>{$producto['descripcion']}</td>
                <td>{$producto['proveedorId']}</td>
                <td>{$producto['stock']}</td>
            </tr>";
        }
        echo "<tr id='noMatchRow' style='display:none;'>
            <td colspan='5'>No se encontraron productos con ese nombre.</td>
        </tr>";
        echo "</tbody></table>";
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
 
<script src="../../js/main.js"></script>
<script src="../../js/filterInventario.js"></script>

</body>
</html>

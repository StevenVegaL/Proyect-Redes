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

    <!-- Buscar por número de factura -->
    <form action="historial_pedidos.php" method="GET" class="search-form">
        <h2><label for="numero_factura">Buscar por número de factura:</label></h2>
        <input type="text" name="numero_factura" required>
        <input type="submit" value="Buscar factura">
    </form>

    <!-- Buscar por ClienteID -->
    <form action="historial_pedidos.php" method="GET" class="search-form">
        <h2><label for="ClienteID">Buscar pedidos por ClienteID:</label></h2>
        <input type="text" name="ClienteID" required>
        <input type="submit" value="Buscar pedidos de clientes">
    </form>
    <script src="../js/main_user.js"></script>

    <h2>Historial de Pedidos</h2>

    <?php
    $url = 'http://localhost:3002/api/pedidos';

    if (isset($_GET['numero_factura'])) {
        $numero_factura = urlencode($_GET['numero_factura']);
        $url .= '/numero-factura/' . $numero_factura;
    } elseif (isset($_GET['ClienteID'])) {
        $ClienteID = urlencode($_GET['ClienteID']);
        $url .= '?ClienteID=' . $ClienteID;
    }

    $response = makeRequest($url);

    if ($response['code'] == 200) {
        $pedidos = $response['response']['pedidos'];
        echo "<table>
            <tr>
                <th>ID</th>
                <th>ID Cliente</th>
                <th>Numero Factura</th>
                <th>Nombre Cliente</th>
                <th>Correo Electrónico</th>
                <th>Teléfono</th>
                <th>Calle</th>
                <th>Ciudad</th>
                <th>Región</th>
                <th>País</th>
                <th>Fecha Pedido</th>
                <th>Producto ID</th>
                <th>Nombre Producto</th>
                <th>Precio Producto</th>
            </tr>";

        foreach ($pedidos as $pedido) {
            echo "<tr>
                <td>{$pedido['PedidoID']}</td>
                <td>{$pedido['ClienteID']}</td>
                <td>{$pedido['numero_factura']}</td>
                <td>{$pedido['Nombre_cliente']}</td>
                <td>{$pedido['Correo_electronico']}</td>
                <td>{$pedido['Telefono']}</td>
                <td>{$pedido['Calle']}</td>
                <td>{$pedido['Ciudad']}</td>
                <td>{$pedido['Region']}</td>
                <td>{$pedido['Pais']}</td>
                <td>{$pedido['Fecha_pedido']}</td>
                <td>{$pedido['ProductoID']}</td>
                <td>{$pedido['Nombre_producto']}</td>
                <td>{$pedido['Precio_producto']}</td>
            </tr>";
        }
        echo "</table>";
    } else {
        echo "<p>Error al obtener el historial de pedidos.</p>";
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

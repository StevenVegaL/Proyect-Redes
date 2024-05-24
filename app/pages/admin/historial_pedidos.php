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

    <!-- Buscar por número de factura -->
    <form name="formFactura" class="search-form">
        <h2><label for="numero_factura">Buscar por número de factura:</label></h2>
        <input type="text" name="numero_factura" required>
        <input type="submit" value="Buscar factura">
    </form>

    <!-- Buscar por ClienteID -->
    <form name="formCliente" class="search-form">
        <h2><label for="ClienteID">Buscar pedidos por ClienteID:</label></h2>
        <input type="text" name="ClienteID" required>
        <input type="submit" value="Buscar pedidos de clientes">
    </form>

    <h2>Historial de Pedidos</h2>
    
    <?php
        $response = makeRequest($url);

        if ($response['code'] == 200) {
            $pedidos = $response['response']['pedidos'];
            echo "<table id='pedidosTable'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ID Cliente</th>
                        <th>Numero Factura</th>
                        <th>Fecha Pedido</th>
                        <th>Estado Pedido</th>
                        <th>Fecha Envio</th>
                        <th>Estado Envio</th>
                        <th>Proveedor ID</th>
                        <th>Producto ID</th>
                        <th>Nombre Producto</th>
                        <th>Cantidad</th>
                        <th>Coste Pedido</th>
                    </tr>
                </thead>
                <tbody>";

            foreach ($pedidos as $pedido) {
                foreach ($pedido['detalle'] as $detalle) {
                    echo "<tr>
                        <td>{$pedido['_id']}</td>
                        <td>{$pedido['cliente_id']}</td>
                        <td>{$pedido['numeroFactura']}</td>
                        <td>{$pedido['fechaPedido']}</td>
                        <td>{$pedido['estadoPedido']}</td>
                        <td>{$pedido['fechaEnvio']}</td>
                        <td>{$pedido['estadoEnvio']}</td>
                        <td>{$detalle['proveedor_id']}</td>
                        <td>{$detalle['producto_id']}</td>
                        <td>{$detalle['nombreProducto']}</td>
                        <td>{$detalle['cantidad']}</td>
                        <td>{$detalle['costePedido']}</td>
                    </tr>";
                }
            }
            echo "<tr id='noMatchRow' style='display:none;'>
                    <td colspan='12' style='text-align:center;'>No hay coincidencias</td>
                </tr>";
            echo "</tbody></table>";
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

    <script src="../../js/main.js"></script>
    <script src="../../js/filterPedidos.js"></script>
</body>
</html>

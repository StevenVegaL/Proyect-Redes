<?php
    session_start();
    if (!isset($_SESSION['user_id'])) {
        header('Location: ../session.html');
    }
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel del Usuario - Sabor Tostado</title>
    <link rel="stylesheet" href="../../css/styles_carrito.css">
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
                <a href="#">Foro</a>
                <a href="../asesoramiento.php">Asesoramiento</a>
            </div>
        </div>
        <a href="user_panel.php" class="logo">Sabor Tostado</a>
        <div class="header-right">
            <form action="resultados_cliente.php" method="get" class="search-form">
                <input type="text" name="query" placeholder="Buscar producto..." required>
                <input type="submit" value="Buscar">
            </form>
            <div class="cart-icon">
                <i class="fas fa-shopping-cart fa-lg"></i>
            </div>
        </div>
        <a href="../logout.php" class="logout-button">Cerrar Sesión</a>
    </header>

    <div class="order-checkout-container">
        <!-- Sección de Resumen del Pedido (Carrito) -->
        <div class="order-section">
            <h2 style="padding-left: 20px">Resumen de tu pedido</h2>
            <hr class="decorative-line">
            <?php
            include '../../includes/functions.php';

            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                $producto_id = $_POST['producto_id'];

                // Guarda esta información en una sesión
                $_SESSION['carrito'] = [
                    'producto_id' => $producto_id
                ];
            }

            if (isset($_SESSION['carrito'])) {
                $producto_id = $_SESSION['carrito']['producto_id'];
                $url = 'http://microproduct:3003/api/productos/' . $producto_id;
                $response = makeRequest($url);

                if ($response['code'] == 200) {
                    $producto = $response['response']['product'];
                    // Mostrar información del producto
                    echo "<h2 style='padding-left: 20px;'>" . htmlspecialchars($producto['nombreProducto']) . "</h2>";
                    echo "<img src='../../images/producto.jpeg' alt='" . htmlspecialchars($producto['nombreProducto']) . "' style='width:100%; max-width:300px; padding-left: 20px;'>";

                    echo "<p class='order-detail'>Precio: $" . number_format($producto['precioVenta'], 0, ',', '.') . "</p>";

                    // Guardar los detalles del producto para el formulario de checkout
                    $nombre_producto = $producto['nombreProducto'];
                    $precio_producto = $producto['precioVenta'];
                } else {
                    die("Error al consultar el producto: " . htmlspecialchars($response['response']['error']));
                }
            }
            ?>
        </div>

        <!-- Sección de Checkout -->
        <div class="checkout-section">
            <h2>Checkout</h2>
            <hr class="decorative-line">

            <div class="checkout-message">
                Nuestros despachos se realizan desde el origen. El corazón de Colombia, por esto los tiempos de entrega son de 3-6 días hábiles.
                <br>
                ¡Gracias por tu compra!
            </div>

            <!-- Formulario de Checkout -->
            <form class="checkout-form" action="procesar_compra.php" method="post">
                <h2>Detalles de facturación</h2>

                <label for="nombre">Nombre *</label>
                <input type="text" id="nombre" name="nombre" required>

                <label for="apellidos">Apellidos *</label>
                <input type="text" id="apellidos" name="apellidos" required>

                <label for="empresa">Nombre de la empresa (opcional)</label>
                <input type="text" id="empresa" name="empresa">

                <label for="cedula">Cédula/NIT *</label>
                <input type="text" id="cedula" name="cedula" required>

                <label for="pais">País / Región *</label>
                <select id="pais" name="pais" required>
                    <option value="Colombia">Colombia</option>
                    <!-- Puedes agregar más opciones si es necesario -->
                </select>

                <label for="direccion">Dirección de la calle *</label>
                <input type="text" id="direccion" name="direccion" placeholder="Número de la casa y nombre de la calle" required>

                <label for="apartamento">Apartamento, habitación, etc. (opcional)</label>
                <input type="text" id="apartamento" name="apartamento">

                <label for="ciudad">Ciudad *</label>
                <input type="text" id="ciudad" name="ciudad" required>

                <label for="region">Región / Provincia *</label>
                <input type="text" id="region" name="region" required>

                <label for="codigo_postal">Código postal (opcional)</label>
                <input type="text" id="codigo_postal" name="codigo_postal">

                <label for="telefono">Teléfono *</label>
                <input type="text" id="telefono" name="telefono" required>

                <label for="email">Dirección de correo electrónico *</label>
                <input type="email" id="email" name="email" required>

                <input type="hidden" name="producto_id" value="<?php echo htmlspecialchars($producto_id); ?>">
                <input type="hidden" name="nombre_producto" value="<?php echo htmlspecialchars($nombre_producto); ?>">
                <input type="hidden" name="precio_producto" value="<?php echo htmlspecialchars($precio_producto); ?>">
                
                <button class="button large-btn">Pagar</button>
            </form>
        </div>
    </div>

    <!-- Footer -->
    <footer>
        <h2>El arte del café</h2>
        <p>Disfruta de los mejores sabores y aromas que te ofrece Sabor Tostado.</p>
        <div class="social-icons">
            <!-- Inserta tus íconos de redes sociales aquí -->
        </div>
    </footer>

    <script src="../../js/main.js"></script>

</body>

</html>

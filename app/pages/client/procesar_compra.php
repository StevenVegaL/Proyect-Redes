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
    <link rel="stylesheet" href="css/styles_compras.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap">
</head>

<body>
    <!-- Header -->
    <header>
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
        <div class="order-section">
            <h2 style="padding-left: 20px;"></h2>
            <hr class="decorative-line">
            <script src="js/main_user.js"></script>
            <?php
                $host = 'localhost';
                $username = 'root';
                $password = '';
                $dbname = 'sabor_tostado';

                $conn = new mysqli($host, $username, $password, $dbname);

                if ($conn->connect_error) {
                    die("Conexión fallida: " . $conn->connect_error);
                }

                $nombre_cliente = $_POST['nombre'] . " " . $_POST['apellidos'];
                $correo_electronico = $_POST['email'];
                $telefono = $_POST['telefono'];
                $calle = $_POST['direccion'];
                $ciudad = $_POST['ciudad'];
                $region = $_POST['region'];
                $codigo_postal = $_POST['codigo_postal'];
                $pais = $_POST['pais'];
                $producto_id = $_POST['producto_id'];
                $nombre_producto = $_POST['nombre_producto'];
                $precio_producto = $_POST['precio_producto'];

                $query_cliente_id = "SELECT ClienteID FROM clientes WHERE Email = '{$correo_electronico}'";
                $resultado = $conn->query($query_cliente_id);

                if ($resultado->num_rows > 0) {
                    $cliente = $resultado->fetch_assoc();
                    $cliente_id = $cliente['ClienteID'];
                } else {
                    die("El correo electrónico ingresado no corresponde a un cliente registrado.");
                }

                $numero_random = mt_rand(100000, 999999);
                $numero_factura = "ST-" . $numero_random;

                do {
                    $numero_random = mt_rand(100000, 999999);
                    $numero_factura = "ST-" . $numero_random;
                    $query_check = "SELECT numero_factura FROM pedidos WHERE numero_factura = '{$numero_factura}'";
                    $result = $conn->query($query_check);
                } while ($result->num_rows > 0);

                $success_payment = true;

                if ($success_payment) {
                    $query = "SELECT Stock FROM producto WHERE ProductoID = $producto_id";
                    $result = mysqli_query($conn, $query);

                    if (!$result) {
                        die("Error al consultar el stock del producto: " . mysqli_error($conn));
                    }

                    $producto = mysqli_fetch_assoc($result);
                    $current_stock = $producto['Stock'];
                    $new_stock = $current_stock - 1;

                    $query = "UPDATE producto SET Stock = $new_stock WHERE ProductoID = $producto_id";
                    if (!mysqli_query($conn, $query)) {
                        die("Error al actualizar el stock: " . mysqli_error($conn));
                    }
                }

                $query_insert = "INSERT INTO pedidos (Nombre_cliente, Correo_electronico, Telefono, Calle, Ciudad, Region, Codigo_postal, Pais, ProductoID, Nombre_producto, Precio_producto, ClienteID, numero_factura) 
                                 VALUES ('{$nombre_cliente}', '{$correo_electronico}', '{$telefono}', '{$calle}', '{$ciudad}', '{$region}', '{$codigo_postal}', '{$pais}', '{$producto_id}', '{$nombre_producto}', '{$precio_producto}', '{$cliente_id}', '{$numero_factura}')";

                if ($conn->query($query_insert) === TRUE) {
                    echo '
                    <div class="center">
                        <button class="btn btn-primary">¡Pedido añadido con éxito! Número de factura: ' . $numero_factura . '</button>
                        <br>
                        <a href="user_panel.php" class="btn btn-secondary">Volver a la página principal</a>
                    </div>
                    ';
                } else {
                    echo "Error: " . $query_insert . "<br>" . $conn->error;
                }
            ?>
        </div>

        <div class="checkout-section">
            <h2>Checkout</h2>
            <hr class="decorative-line">
            <div class="checkout-message">
                Nuestros despachos se realizan desde el origen. El corazón de Colombia, por esto los tiempos de entrega son de 3-6 días hábiles.
                <br>
                ¡Gracias por tu compra!
            </div>
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
                <input type="hidden" name="producto_id" value="<?php echo $producto_id; ?>">
                <input type="hidden" name="nombre_producto" value="<?php echo $nombre_producto; ?>">
                <input type="hidden" name="precio_producto" value="<?php echo $precio_producto; ?>">
                <input type="hidden" name="cliente_id" value="<?php echo $cliente_id; ?>">
                <button class="button large-btn">Pagar</button>
            </form>
        </div>
    </div>

    <footer>
        <h2>El arte del café</h2>
        <p>Disfruta de los mejores sabores y aromas que te ofrece Sabor Tostado.</p>
        <div class="social-icons">
            <!-- Inserta tus íconos de redes sociales aquí -->
        </div>
    </footer>

    <script src="js/main_user.js"></script>
</body>
</html>

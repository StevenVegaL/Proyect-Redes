<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel del Usuario - Sabor Tostado</title>
    <link rel="stylesheet" href="../css/styles_users.css">
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
        <a href="user_panel.php" class="logo">Sabor Tostado</a>
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

    <!-- Carrito -->
    <aside class="cart">
        <h2>Tu carrito</h2>
        <img src="../img/cart_empty_icon.png" alt="Carrito vacío">
        <h3>¡Tu carrito está vacío!</h3>
        <p>Parece que todavía no has agregado ningún artículo a tu carrito.</p>
        <button class="large-btn" onclick="window.location.href='user_panel.php'">Buscar productos</button>
    </aside>

    <!-- Productos -->
    <main>
        <h2>Nuestros productos</h2>
        <hr class="decorative-line">
        <div class="products">
            <?php
            include '../includes/functions.php';

            // Petición al microservicio de productos
            $url = 'http://localhost:3003/api/productos';
            $response = makeRequest($url);

            if ($response['code'] == 200) {
                foreach ($response['response']['products'] as $producto) {
                    echo '<div class="product">
                            <img src="../img/producto.jpeg" alt="' . htmlspecialchars($producto["nombreProducto"]) . '" width="300" height="300">
                            <h3>' . htmlspecialchars($producto["nombreProducto"]) . '</h3>
                            <span style="display: block; font-size: 24px; color: black; text-shadow: 1px 1px 2px rgba(0,0,0,0.1); margin: 10px 0; font-weight: bold;">$' . number_format($producto["precioVenta"], 0, ',', '.') . '</span>
                            <a href="opciones_producto.php?ProductoID=' . $producto["_id"] . '" class="button">SELECCIONAR OPCIONES</a>
                          </div>';
                }
            } else {
                echo '<p>Error al cargar los productos: ' . htmlspecialchars($response['response']['error']) . '</p>';
            }
            ?>
        </div>
    </main>

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

<?php
include '../includes/functions.php';

// Verifica si ProductoID está en la URL y si no es nulo o vacío
if (isset($_GET['ProductoID']) && !empty($_GET['ProductoID'])) {
    $producto_id = $_GET['ProductoID'];

    $url = 'http://localhost:3003/api/productos/' . $producto_id;
    $response = makeRequest($url);

    if ($response['code'] == 200) {
        $producto = $response['response']['product'];
    } else {
        die("Error al consultar el producto: " . htmlspecialchars($response['response']['error']));
    }
} else {
    die("ProductoID no especificado.");
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seleccionar Opciones - Sabor Tostado</title>
    <link rel="stylesheet" href="../css/styles_opciones.css">
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

    <!-- Contenido Principal -->
    <main>
        <div class="product-detail">
            <img src="../img/producto.jpeg" class="large-image">
            <div class="product-info">
                <h2><?php echo htmlspecialchars($producto['nombreProducto']); ?></h2>
                <p><?php echo htmlspecialchars($producto['descripcion']); ?></p>

                <form action="carrito.php" method="post">
                    <div class="options">
                        <h4>Presentación</h4>
                        <label class="radio-label">
                            <input type="radio" name="presentacion" value="Pequeño">
                            <span class="fake-radio"></span>
                            500 G
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="presentacion" value="Mediano">
                            <span class="fake-radio"></span>
                            1 KG
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="presentacion" value="Grande">
                            <span class="fake-radio"></span>
                            5 KG
                        </label>
                    </div>

                    <div class="options">
                        <h4>Tipo de molido</h4>
                        <label class="radio-label">
                            <input type="radio" name="molido" value="Fino">
                            <span class="fake-radio"></span>
                            Fino
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="molido" value="Medio">
                            <span class="fake-radio"></span>
                            Medio
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="molido" value="Grueso">
                            <span class="fake-radio"></span>
                            Grueso
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="molido" value="Entero">
                            <span class="fake-radio"></span>
                            Entero
                        </label>
                    </div>
                    <input type="hidden" name="producto_id" value="<?php echo htmlspecialchars($producto_id); ?>">
                    <button type="submit" class="button">Añadir al carrito</button>
                </form>

                <span id="productoPrecio" style="font-size: 1.5em; font-weight: bold; display: block; margin-bottom: 10px;"></span>
            </div>
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

    <script>
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const dropdown = document.querySelector('.dropdown-menu');

        hamburgerMenu.addEventListener('click', function () {
            if (dropdown.classList.contains('show-dropdown')) {
                dropdown.classList.remove('show-dropdown');
            } else {
                dropdown.classList.add('show-dropdown');
            }
        });

        let presentacionSeleccionada = null;
        let molidoSeleccionado = null;

        document.querySelectorAll("input[name='presentacion']").forEach(input => {
            input.addEventListener("change", function () {
                presentacionSeleccionada = this.value;
                actualizarPrecio();
            });
        });

        document.querySelectorAll("input[name='molido']").forEach(input => {
            input.addEventListener("change", function () {
                molidoSeleccionado = this.value;
                actualizarPrecio();
            });
        });

        function actualizarPrecio() {
            if (presentacionSeleccionada && molidoSeleccionado) {
                let precio = 0;
                switch (presentacionSeleccionada) {
                    case "Pequeño":
                        precio = "<?php echo "$" . number_format($producto['precioVenta1'], 0, ',', '.'); ?>";
                        break;
                    case "Mediano":
                        precio = "<?php echo "$" . number_format($producto['precioVenta2'], 0, ',', '.'); ?>";
                        break;
                    case "Grande":
                        precio = "<?php echo "$" . number_format($producto['precioVenta3'], 0, ',', '.'); ?>";
                        break;
                }
                document.getElementById("productoPrecio").innerText = precio;
            } else {
                document.getElementById("productoPrecio").innerText = "";
            }
        }
    </script>
    <script src="js/main.js"></script>
</body>
</html>

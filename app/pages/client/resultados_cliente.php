<?php
    include '../../includes/functions.php';
    
    session_start();
    if (!isset($_SESSION['user_id'])) {
        header('Location: ../session.html');
    }

    $query = isset($_GET['query']) ? $_GET['query'] : '';
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultados para "<?= htmlspecialchars($query) ?>" - Sabor Tostado</title>
    <link rel="stylesheet" href="../../css/styles_resultados.css">
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
            <form id="search-form" class="search-form">
                <input type="text" name="query" placeholder="Buscar producto..." required>
                <input type="submit" value="Buscar">
            </form>
            <div class="cart-icon">
                <i class="fas fa-shopping-cart fa-lg"></i>
            </div>
        </div>
        <a href="../logout.php" class="logout-button">Cerrar Sesión</a>
    </header>

    <!-- Carrito -->
    <aside class="cart">
        <h2>Tu carrito</h2>
        <?php
        if (isset($_SESSION['carrito']) && !empty($_SESSION['carrito'])):
            $total = 0;
            $items = 0;
        ?>
        <div class="cart-products">
            <?php foreach ($_SESSION['carrito'] as $producto):
                $total += $producto['precio'] * $producto['cantidad'];
                $items += $producto['cantidad'];
            ?>
            <div class="cart-product">
                <img src="ruta" alt="<?= htmlspecialchars($producto['nombre']) ?>" width="100" height="100">
                <div class="product-info">
                    <h3><?= htmlspecialchars($producto['nombre']) ?></h3>
                    <p>Presentación: <?= htmlspecialchars($producto['presentacion']) ?></p>
                    <p>Tipo de Molido: <?= htmlspecialchars($producto['tipo_molido']) ?></p>
                    <p>Cantidad: <?= htmlspecialchars($producto['cantidad']) ?></p>
                    <p>Precio: $<?= number_format($producto['precio'] * $producto['cantidad'], 2) ?></p>
                </div>
            </div>
            <?php endforeach; ?>
        </div>

        <div class="cart-summary">
            <p>Total estimado - <?= $items ?> artículo(s)</p>
            <p>Impuestos y envío calculados al finalizar la compra.</p>
            <h3>Total: $<?= number_format($total, 2) ?></h3>
        </div>

        <button class="large-btn" onclick="window.location.href='pagina_pago.php'">Ordenar Ahora</button>
        <?php else: ?>
        <img src="../img/cart_empty_icon.png" alt="Carrito vacío">
        <h3>¡Tu carrito está vacío!</h3>
        <p>Parece que todavía no has agregado ningún artículo a tu carrito.</p>
        <button class="large-btn" onclick="window.location.href='user_panel.php'">Buscar productos</button>
        <?php endif; ?>
    </aside>

    <!-- Resultados de Búsqueda -->
    <main>
        <h2>Resultados para "<?= htmlspecialchars($query) ?>"</h2>
        <hr class="decorative-line">
        <div id="results-container" class="products"></div>
        <div id="no-results" class="no-results" style="display:none;">
            <p>No se encontraron resultados.<br>La página solicitada no pudo encontrarse. Trate de perfeccionar su búsqueda o utilice la navegación para localizar la entrada.</p>
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
    <script src="../../js/main.js"></script>
    <script src="../../js/filterResultados.js"></script>
</body>
</html>

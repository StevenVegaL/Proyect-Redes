<?php
session_start();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio - Sabor Tostado</title>
    <link rel="stylesheet" href="./css/styles.css">
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
                <a href="./pages/foro.php">Foro</a>
                <a href="./pages/asesoramiento.php">Asesoramiento</a>
            </div>
        </div>
        <a href="index.php" class="logo">Sabor Tostado</a>
        <div class="header-right">
            <a href="./pages/session.html" class="login-button">Iniciar Sesión</a>
        </div>
    </header>


    <!-- Contenido Principal -->
    <main>
        <h1 class="main-title">Bienvenidos a Sabor Tostado</h1>
        <p class="sub-title">Disfruta de los mejores sabores y aromas que te ofrece Sabor Tostado.</p>

        <div class="image-container">
            <img src="./images/principal.webp" alt="Taza de café">
        </div>

        <div class="container">
            <h2>Explora Nuestros Productos</h2>
            <p>Navega a través de nuestra selección de los mejores cafés colombianos. Calidad y sabor incomparables, directamente a tu puerta.</p>
            <button onclick="window.location.href='./pages/client/user_panel.php'">Ver Productos</button>
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

    <script src="./js/main.js"></script>
</body>
</html>

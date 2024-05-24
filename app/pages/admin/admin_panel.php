<?php
    session_start();
    
    if (!isset($_SESSION['admin_id'])) {
        header('Location: ../session.html');
    }
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administración - Sabor Tostado</title>
    <link rel="stylesheet" href="../../css/styles_admin.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
    <!-- Header -->
    <header>
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

    <h2>Gestión de Usuarios</h2>
    <a href="agregar_usuario.php">
        <h2>Agregar Nuevo Usuario</h2>
    </a>

    <a href="historial_pedidos.php">
        <h2>Historial de pedidos</h2>
    </a>

    <a href="inventario.php">
        <h2>Inventario de productos</h2>
    </a>

    <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
        <?php
            // URL de la API
            $url = 'http://microuser:3001/api/users/todos';

            // Realizar la solicitud a la API
            $response = file_get_contents($url);

            // Decodificar la respuesta JSON
            $data = json_decode($response, true);

            // Verificar si la respuesta contiene usuarios
            if (isset($data['usuarios']) && is_array($data['usuarios'])) {
                foreach ($data['usuarios'] as $user) {
                    echo "<tr>";
                    echo "<td>" . $user['_id'] . "</td>";
                    echo "<td>" . $user['nombre'] . "</td>";
                    echo "<td>" . (isset($user['direccion']) ? $user['direccion'] : '-') . "</td>";
                    echo "<td>" . (isset($user['telefono']) ? $user['telefono'] : '-') . "</td>";
                    echo "<td>" . $user['email'] . "</td>";
                    echo "<td>";
                    echo "<a href='editar_usuario.php?ClienteID=" . $user['_id'] . "'>Editar</a> | ";
                    echo "<a href='#' onclick='confirmarEliminacion(" . $user['_id'] . ")'>Eliminar</a>";
                    echo "</td>";
                    echo "</tr>";
                }
            } else {
                echo "<tr><td colspan='6'>No se encontraron usuarios.</td></tr>";
            }
        ?>
        </tbody>
    </table>

    <footer>
        <h2>El arte del café</h2>
        <p>Disfruta de los mejores sabores y aromas que te ofrece Sabor Tostado.</p>
        <div class="social-icons">
            <!-- Inserta tus íconos de redes sociales aquí -->
        </div>
    </footer>

    <script>
        function confirmarEliminacion(id) {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¿Deseas eliminar este usuario?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "eliminar_usuario.php?ClienteID=" + id;
                }
            });
        }
    </script>
    <script src="../../js/main.js"></script>
</body>
</html>

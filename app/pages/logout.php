<?php
// Iniciar la sesión si aún no está iniciada
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Destruir todas las variables de sesión.
$_SESSION = array();

// Si se desea destruir completamente la sesión, también se debe eliminar la cookie de sesión.
// Nota: ¡Esto destruirá la sesión y no la información de la sesión!
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Finalmente, destruir la sesión.
session_destroy();

// Redirigir al usuario a la página de inicio o a la página de inicio de sesión.
header("Location: ../index.php");
exit();
?>

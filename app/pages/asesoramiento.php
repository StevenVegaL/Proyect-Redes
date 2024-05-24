<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Asesoramiento - Sabor Tostado</title>
    <link rel="stylesheet" href="../css/styles_users.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap">
</head>
<body>

<header>
    <a href="../index.php" class="logo">Sabor Tostado</a>
    </header>

<main>
    <section class="intro-section">
        <p>Para gestionar un local como el tuyo hay que saber mucho. Gracias a nuestra dilatada experiencia y a la intervención de profesionales especializados podemos incrementar y actualizar tus competencias en cada ámbito de la actividad, desde la preparación del café hasta la contratación y gestión del personal, desde la mejora de los márgenes al diseño de escaparates. Nuestras asesorías personalizadas te ayudan a orientarte en los negocios.</p>
    </section>

    <section class="details-section">
        <img src="../images/cafe_1.jpg" alt="Descripción de la imagen" class="hover-img">

        <div class="right-content">
            <h2 style="color:#2b657c;">EL SERVICIO DE FORMACIÓN Y ASISTENCIA EN RESUMEN</h2>

            <h3>¿Para qué sirve?</h3>
            <p>La formación puede mejorar todas las competencias necesarias para gestionar un bar, restaurante, pastelería u hotel, completando las posibles habilidades del profesional o aportando conocimientos sobre temas específicos.</p>

            <h3>¿Cómo funciona?</h3>
            <p>La Università del Caffè es el centro internacional de conocimiento creado por illy para promover la cultura del café de calidad en el mundo, ofreciendo un amplio abanico de propuestas de formación para los profesionales. Los cursos se centran en dos áreas de especialización: el café y todas sus preparaciones y la gestión del negocio.</p>
        </div>
    </section>

    <!-- La sección invertida -->
    <section class="details-section inverted">
        <!-- Aquí puedes colocar otro contenido similar al anterior, con la imagen a la derecha -->
        <div class="left-content">
        <h2 style="color:#2b657c;">EL SERVICIO DE FORMACIÓN Y ASISTENCIA EN RESUMEN</h2>

<h3>¿Para qué sirve?</h3>
<p>La formación puede mejorar todas las competencias necesarias para gestionar un bar, restaurante, pastelería u hotel, completando las posibles habilidades del profesional o aportando conocimientos sobre temas específicos.</p>

<h3>¿Cómo funciona?</h3>
<p>La Università del Caffè es el centro internacional de conocimiento creado por illy para promover la cultura del café de calidad en el mundo, ofreciendo un amplio abanico de propuestas de formación para los profesionales. Los cursos se centran en dos áreas de especialización: el café y todas sus preparaciones y la gestión del negocio.</p>        </div>
        <img src="../images/cafe_2.jpg" alt="Descripción de la imagen" class="hover-img">
    </section>

    <section class="contact-section">
        <button class="large-btn">¡CONTACTANOS!</button>
    </section>
</main>

    <!-- Footer -->
    <footer>
        <h2>El arte del café</h2>
        <p>Disfruta de los mejores sabores y aromas que te ofrece Sabor Tostado.</p>
        <div class="social-icons">
            <!-- Inserta tus íconos de redes sociales aquí -->
        </div>
    </footer>

    <script src="../js/main_user.js"></script>

<!-- Estilos necesarios para el diseño que has especificado y la animación -->
<style>
    body {
        font-family: Arial, sans-serif;
    }

    .intro-section {
        padding: 20px;
        text-align: justify;
    }

    .details-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        max-width: 80%;
        margin-left: auto;
        margin-right: auto;
    }

    .details-section img {
        max-width: 50%;
    }

    .right-content, .left-content {
        width: 50%;
        padding: 0 20px;
    }

    .large-btn {
        display: block;
        width: 100%;
        padding: 10px;
        background-color: #2b657c;
        color: white;
        border: none;
        cursor: pointer;
        text-align: center;
        margin: 20px 0;
    }

    .hover-img {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .hover-img:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
</style>

</body>
</html>

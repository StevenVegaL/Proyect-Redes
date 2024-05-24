// main.js

// Toggle del carrito de compras
document.querySelector('.cart-icon').addEventListener('click', function() {
    document.querySelector('.cart').classList.toggle('show');
});

// Menú desplegable (hamburguesa)
const hamburgerMenu = document.querySelector('.hamburger-menu');
const dropdown = document.querySelector('.dropdown-menu');

hamburgerMenu.addEventListener('click', function() {
    if (dropdown.classList.contains('show-dropdown')) {
        dropdown.classList.remove('show-dropdown');
    } else {
        dropdown.classList.add('show-dropdown');
    }
});
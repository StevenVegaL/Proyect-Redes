document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form');
    const query = new URLSearchParams(window.location.search).get('query');
    if (query) {
        fetchProducts(query);
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = new URLSearchParams(new FormData(form)).get('query');
        fetchProducts(query);
    });

    function fetchProducts(query) {
        const url = `http://localhost:3003/api/productos/`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (!data.ok || !Array.isArray(data.products)) {
                    throw new TypeError('Expected data.products to be an array');
                }

                const products = data.products.filter(product =>
                    product.nombreProducto.toLowerCase().includes(query.toLowerCase())
                );
                displayProducts(products);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }

    function displayProducts(products) {
        const container = document.getElementById('results-container');
        const noResults = document.getElementById('no-results');
        container.innerHTML = '';

        if (products.length > 0) {
            noResults.style.display = 'none';
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <img src="../../images/producto.jpeg" alt="${product.nombreProducto}" width="300" height="300">
                    <h3>${product.nombreProducto}</h3>
                    <span style="display: block; font-size: 24px; color: black; text-shadow: 1px 1px 2px rgba(0,0,0,0.1); margin: 10px 0; font-weight: bold;">$${product.precioVenta.toLocaleString('es-ES', { minimumFractionDigits: 0 })}</span>
                `;
                container.appendChild(productElement);
            });
        } else {
            noResults.style.display = 'block';
        }
    }
});

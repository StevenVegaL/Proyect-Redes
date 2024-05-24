
// Filtrar tabla de inventario por nombre de producto

document.forms['formProducto'].addEventListener('submit', function(event) {
    event.preventDefault();
    const nombreProducto = this.nombre_producto.value.trim().toLowerCase();
    filterTable(nombreProducto);
});

function filterTable(value) {
    const rows = document.querySelectorAll('#productosTable tbody tr:not(#noMatchRow)');
    let found = false;

    if (value === "") {
        // Mostrar todas las filas si el campo de búsqueda está vacío
        rows.forEach(row => {
            row.style.display = '';
            found = true;
        });
    } else {
        rows.forEach(row => {
            const nombreCell = row.querySelector('td:nth-child(2)');
            if (nombreCell) {
                const nombreProducto = nombreCell.textContent.trim().toLowerCase();
                if (nombreProducto.includes(value)) {
                    row.style.display = '';
                    found = true;
                } else {
                    row.style.display = 'none';
                }
            }
        });
    }

    const noMatchRow = document.querySelector('#noMatchRow');
    if (!found) {
        noMatchRow.style.display = '';
    } else {
        noMatchRow.style.display = 'none';
    }
}

// Verificar campos de búsqueda en tiempo real para restablecer la tabla si están vacíos
document.querySelectorAll('.search-form input[type="text"]').forEach(input => {
    input.addEventListener('input', function() {
        if (this.value.trim() === "") {
            filterTable('');
        }
    });
});

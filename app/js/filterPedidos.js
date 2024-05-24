
// Filtrar tabla de pedidos por número de factura o ID de cliente

document.forms['formFactura'].addEventListener('submit', function(event) {
    event.preventDefault();
    const numeroFactura = this.numero_factura.value.trim();
    filterTable('numeroFactura', numeroFactura);
});

document.forms['formCliente'].addEventListener('submit', function(event) {
    event.preventDefault();
    const clienteID = this.ClienteID.value.trim();
    filterTable('clienteID', clienteID);
});

function filterTable(type, value) {
    const rows = document.querySelectorAll('#pedidosTable tbody tr:not(#noMatchRow)');
    let found = false;

    if (value === "") {
        // Mostrar todas las filas si el campo de búsqueda está vacío
        rows.forEach(row => {
            row.style.display = '';
            found = true;
        });
    } else {
        rows.forEach(row => {
            const columns = row.querySelectorAll('td');
            const idCliente = columns[1].textContent.trim();
            const numeroFactura = columns[2].textContent.trim();

            if ((type === 'numeroFactura' && numeroFactura === value) || (type === 'clienteID' && idCliente === value)) {
                row.style.display = '';
                found = true;
            } else {
                row.style.display = 'none';
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
            filterTable('', '');
        }
    });
});

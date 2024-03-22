import React, { useState, useEffect } from 'react';
import { deletePedido } from '../api/pedidosApi';

const EliminarPedido = () => {
    const [pedidoId, setPedidoId] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleInputChange = (event) => {
        setPedidoId(event.target.value);
    };

    const handleEliminarPedido = async () => {
        try {
            await deletePedido(pedidoId);
            setMensaje('Pedido eliminado correctamente');
            setPedidoId('');
        } catch (error) {
            setMensaje('Error al eliminar el pedido');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Eliminar Pedido</h2>
            <label htmlFor="pedidoId">ID del Pedido:</label>
            <input
                type="text"
                id="pedidoId"
                name="pedidoId"
                value={pedidoId}
                onChange={handleInputChange}
                required
            />
            <button onClick={handleEliminarPedido}>Eliminar Pedido</button>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export { EliminarPedido };

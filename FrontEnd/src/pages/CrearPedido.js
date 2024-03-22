import React, { useState } from 'react';
import { createPedido } from '../api/pedidosApi';

const CrearPedido = () => {
    const [pedidoData, setPedidoData] = useState({
        cliente_id: '',
        fechaPedido: '',
        estadoPedido: '',
        numeroFactura: '',
        fechaEnvio: '',
        estadoEnvio: '',
        detalle: []
    });

    const handleChange = (e) => {
        setPedidoData({ ...pedidoData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await createPedido(pedidoData);
            console.log('Pedido creado:', data.pedido);
            // Limpia el formulario o redirige al usuario según sea necesario
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Crear Pedido</h1>
            <form onSubmit={handleSubmit}>
                <label>Cliente ID:</label>
                <input type="text" name="cliente_id" value={pedidoData.cliente_id} onChange={handleChange} />

                <label>Fecha Pedido:</label>
                <input type="date" name="fechaPedido" value={pedidoData.fechaPedido} onChange={handleChange} />

                <label>Estado Pedido:</label>
                <input type="text" name="estadoPedido" value={pedidoData.estadoPedido} onChange={handleChange} />

                <label>Número de Factura:</label>
                <input type="text" name="numeroFactura" value={pedidoData.numeroFactura} onChange={handleChange} />

                <label>Fecha de Envío:</label>
                <input type="date" name="fechaEnvio" value={pedidoData.fechaEnvio} onChange={handleChange} />

                <label>Estado de Envío:</label>
                <input type="text" name="estadoEnvio" value={pedidoData.estadoEnvio} onChange={handleChange} />

                {/* Aquí puedes agregar más campos para el detalle del pedido si es necesario */}

                <button type="submit">Crear Pedido</button>
            </form>
        </div>
    );
};

export default CrearPedido;

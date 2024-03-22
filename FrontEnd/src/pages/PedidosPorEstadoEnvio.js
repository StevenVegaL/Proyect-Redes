import React, { useState, useEffect } from 'react';
import { getPedidosPorEstadoEnvio } from '../api/pedidosApi';

const PedidosPorEstadoEnvio = () => {
    const [estadoEnvio, setEstadoEnvio] = useState('');
    const [pedidos, setPedidos] = useState([]);
    const [mensaje, setMensaje] = useState('');

    const handleInputChange = (event) => {
        setEstadoEnvio(event.target.value);
    };

    const handleBuscarPedidos = async () => {
        try {
            const response = await getPedidosPorEstadoEnvio(estadoEnvio);
            setPedidos(response.pedidos);
            setMensaje('');
        } catch (error) {
            setMensaje('No se pudieron obtener los pedidos por estado de envío');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Pedidos por Estado de Envío</h2>
            <label htmlFor="estadoEnvio">Estado de Envío:</label>
            <input
                type="text"
                id="estadoEnvio"
                name="estadoEnvio"
                value={estadoEnvio}
                onChange={handleInputChange}
                required
            />
            <button onClick={handleBuscarPedidos}>Buscar Pedidos</button>
            {mensaje && <p>{mensaje}</p>}
            <ul>
                {pedidos.map((pedido) => (
                    <li key={pedido._id}>
                        Pedido ID: {pedido._id}, Estado de Envío: {pedido.estadoEnvio}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { PedidosPorEstadoEnvio };

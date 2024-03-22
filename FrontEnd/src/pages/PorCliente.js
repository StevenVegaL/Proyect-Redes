import React, { useState } from 'react';
import { getPedidosPorCliente } from '../api/pedidosApi';

const PedidosPorCliente = () => {
    const [clienteId, setClienteId] = useState('');
    const [pedidos, setPedidos] = useState([]);
    const [mensaje, setMensaje] = useState('');

    const handleInputChange = (event) => {
        setClienteId(event.target.value);
    };

    const handleBuscarPedidos = async () => {
        try {
            const response = await getPedidosPorCliente(clienteId);
            setPedidos(response.pedidos);
            setMensaje('');
        } catch (error) {
            setMensaje('No se encontraron pedidos para el cliente con el ID proporcionado');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Buscar Pedidos por ID de Cliente</h2>
            <label htmlFor="clienteId">ID de Cliente:</label>
            <input
                type="text"
                id="clienteId"
                name="clienteId"
                value={clienteId}
                onChange={handleInputChange}
                required
            />
            <button onClick={handleBuscarPedidos}>Buscar Pedidos</button>
            {mensaje && <p>{mensaje}</p>}
            {pedidos.length > 0 && (
                <div>
                    <h3>Pedidos Encontrados</h3>
                    <ul>
                        {pedidos.map((pedido) => (
                            <li key={pedido._id}>
                                Número de Factura: {pedido.numeroFactura}, Cliente ID: {pedido.cliente_id}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export { PedidosPorCliente };

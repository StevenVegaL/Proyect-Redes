import React, { useEffect, useState } from 'react';
import { getPedidoById } from '../api/pedidosApi';

const PedidoPorId = ({ id }) => {
    const [pedido, setPedido] = useState(null);

    useEffect(() => {
        const fetchPedido = async () => {
            try {
                const data = await getPedidoById(id);
                setPedido(data.pedido);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPedido();
    }, [id]);

    if (!pedido) {
        return <p>Cargando pedido...</p>;
    }

    return (
        <div>
            <h1>Pedido ID: {pedido._id}</h1>
            <p>Cliente ID: {pedido.cliente_id}</p>
            <p>Fecha del Pedido: {new Date(pedido.fechaPedido).toLocaleDateString()}</p>
            <p>Estado del Pedido: {pedido.estadoPedido}</p>
            <h2>Detalle del Pedido:</h2>
            <table>
                <thead>
                    <tr>
                        <th>Proveedor ID</th>
                        <th>Producto ID</th>
                        <th>Nombre del Producto</th>
                        <th>Cantidad</th>
                        <th>Coste del Pedido</th>
                    </tr>
                </thead>
                <tbody>
                    {pedido.detalle.map((detalle, index) => (
                        <tr key={index}>
                            <td>{detalle.proveedor_id}</td>
                            <td>{detalle.producto_id}</td>
                            <td>{detalle.nombreProducto}</td>
                            <td>{detalle.cantidad}</td>
                            <td>{detalle.costePedido}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PedidoPorId;

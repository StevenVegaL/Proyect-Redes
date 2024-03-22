import React, { useEffect, useState } from 'react';
import { getAllPedidos } from '../api/pedidosApi';

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const data = await getAllPedidos();
                setPedidos(data.pedidos);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPedidos();
    }, []);

    return (
        <div>
            <h1>Lista de Pedidos</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente ID</th>
                        <th>Fecha del Pedido</th>
                        <th>Estado del Pedido</th>
                        <th>Detalle</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map((pedido) => (
                        <tr key={pedido._id}>
                            <td>{pedido._id}</td>
                            <td>{pedido.cliente_id}</td>
                            <td>{new Date(pedido.fechaPedido).toLocaleDateString()}</td>
                            <td>{pedido.estadoPedido}</td>
                            <td>
                                {/* Aquí puedes agregar un enlace o botón para ver el detalle del pedido */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Pedidos;


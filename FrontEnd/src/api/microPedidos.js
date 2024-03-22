const BASE_URL = 'http://localhost:3002/api/pedidos'; // Asegúrate de que la URL base sea correcta

// Obtener todos los pedidos
export const getAllPedidos = async () => {
  const response = await fetch(`${BASE_URL}`);
  if (!response.ok) {
    throw new Error('No se pudieron obtener los pedidos');
  }
  return response.json();
};

// Obtener un pedido por su ID
export const getPedidoById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('No se pudo obtener el pedido');
  }
  return response.json();
};

// Crear un nuevo pedido
export const createPedido = async (pedidoData) => {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pedidoData),
  });
  if (!response.ok) {
    throw new Error('Error al crear el pedido');
  }
  return response.json();
};

// Actualizar un pedido existente por su ID
export const updatePedido = async (id, pedidoData) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pedidoData),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar el pedido');
  }
  return response.json();
};

// Eliminar un pedido por su ID
export const deletePedido = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error al eliminar el pedido');
  }
  return response.json();
};

// Obtener pedidos por estado de envío
export const getPedidosPorEstadoEnvio = async (estado) => {
  const response = await fetch(`${BASE_URL}/estado-envio/${estado}`);
  if (!response.ok) {
    throw new Error('No se pudieron obtener los pedidos por estado de envío');
  }
  return response.json();
};

// Obtener un pedido por número de factura
export const getPedidoPorNumeroFactura = async (numeroFactura) => {
  const response = await fetch(`${BASE_URL}/numero-factura/${numeroFactura}`);
  if (!response.ok) {
    throw new Error('Pedido con el número de factura proporcionado no encontrado');
  }
  return response.json();
};

// Obtener pedidos por ID de cliente
export const getPedidosPorCliente = async (clienteId) => {
  const response = await fetch(`${BASE_URL}/cliente/${clienteId}`);
  if (!response.ok) {
    throw new Error('No se encontraron pedidos para el cliente con el ID proporcionado');
  }
  return response.json();
};

// OrderList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderList = () => {
  const { email } = useParams(); // Obtén el email de la URL
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No se encontró el token. Por favor, inicia sesión.');
          return;
        }

        const { data } = await axios.get(`http://localhost:4000/api/orders/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [email]);

  return (
    <div className="container mt-5">
      <h2>Órdenes de {email}</h2>
      {orders.length === 0 ? (
        <p>No hay órdenes para este usuario.</p>
      ) : (
        <ul className="list-group">
          {orders.map(order => (
            <li key={order._id} className="list-group-item">
              <h5>Pedido {order._id}</h5>
              <p><strong>Nombre:</strong> {order.name}</p>
              <p><strong>Dirección:</strong> {order.address}</p>
              <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
              <h6>Productos:</h6>
              <ul>
                {order.products.map((product, index) => (
                  <li key={index}>
                    {product.name} - ${product.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <p><small>Fecha de creación: {new Date(order.createdAt).toLocaleDateString()}</small></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;

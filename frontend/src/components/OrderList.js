import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Badge, Accordion } from 'react-bootstrap';

const OrderList = () => {
  const { email } = useParams();
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
        <div className="d-flex flex-wrap">
          {orders.map(order => (
            <Card key={order._id} className="m-3 shadow-sm" style={{ width: '18rem', background: 'transparent', border: 'none' }}>
              <Card.Header className="bg-primary text-white">
                <h5>Pedido #{order._id}</h5>
              </Card.Header>
              <Card.Body>
                <Card.Title>{order.name}</Card.Title>
                <Card.Text>
                  <strong>Dirección:</strong> {order.address}
                </Card.Text>
                <Accordion flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Productos</Accordion.Header>
                    <Accordion.Body>
                      {order.products.map((product, index) => (
                        <div key={index}>
                          {product.name} - <Badge bg="success">${product.price.toFixed(2)}</Badge>
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Card.Text className="mt-3">
                  <strong>Total:</strong> <Badge bg="primary">${order.totalAmount.toFixed(2)}</Badge>
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Fecha de creación: {new Date(order.createdAt).toLocaleDateString()}</small>
              </Card.Footer>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;

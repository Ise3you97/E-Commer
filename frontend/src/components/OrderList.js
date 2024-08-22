import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Badge, Accordion } from 'react-bootstrap';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Simulamos la obtención de datos de órdenes desde una API falsa
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');

        // Aquí simulamos que cada post es una orden, y añadimos algunos detalles adicionales
        const fakeOrders = data.map(post => ({
          _id: post.id,
          name: post.title,
          address: `Calle Falsa ${post.id}, Ciudad Falsa`,
          products: [
            { name: 'Producto 1', price: Math.random() * 100 },
            { name: 'Producto 2', price: Math.random() * 100 },
          ],
          totalAmount: Math.random() * 200,
          createdAt: new Date().toISOString(),
        }));

        setOrders(fakeOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Órdenes Simuladas</h2>
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

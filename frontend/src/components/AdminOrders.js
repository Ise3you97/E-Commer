import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Badge, Accordion, Spinner, Alert } from 'react-bootstrap';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFakeOrders = async () => {
            try {
                // Simulando la obtención de datos de órdenes desde una API falsa
                const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');

                // Transformamos los datos para simular que son órdenes
                const fakeOrders = data.slice(0, 10).map(post => ({
                    _id: post.id,
                    email: `user${post.id}@example.com`,
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
                setError('An error occurred while fetching orders');
            } finally {
                setLoading(false);
            }
        };

        fetchFakeOrders();
    }, []);

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container className="mt-5">
            <h2>All Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="d-flex flex-wrap">
                    {orders.map((order) => (
                        <Card key={order._id} className="m-3 shadow-sm" style={{ width: '18rem', background: 'transparent', border: 'none' }}>
                            <Card.Header className="bg-primary text-white">
                                <h5>Order #{order._id}</h5>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>{order.name}</Card.Title>
                                <Card.Text>
                                    <strong>Address:</strong> {order.address}
                                </Card.Text>
                                <Accordion flush>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Products</Accordion.Header>
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
                                <small className="text-muted">Created At: {new Date(order.createdAt).toLocaleDateString()}</small>
                            </Card.Footer>
                        </Card>
                    ))}
                </div>
            )}
        </Container>
    );
};

export default AdminOrders;

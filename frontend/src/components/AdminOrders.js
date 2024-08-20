import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Badge, ListGroup, Accordion, Spinner, Alert } from 'react-bootstrap';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4000/api/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setOrders(response.data);
            } catch (error) {
                setError(error.response?.data?.message || 'An error occurred while fetching orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container className="mt-5">
            <h2>All Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <Accordion defaultActiveKey="0">
                    {orders.map((order, index) => (
                        <Card key={order._id} className="mb-3 shadow-sm">
                            <Accordion.Item eventKey={index.toString()}>
                                <Accordion.Header>
                                    <strong>Order ID:</strong> {order._id} - <Badge bg="primary">${order.totalAmount.toFixed(2)}</Badge>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Card.Body>
                                        <Card.Title>User: {order.email}</Card.Title>
                                        <Card.Text>
                                            <strong>Name:</strong> {order.name}
                                            <br />
                                            <strong>Address:</strong> {order.address}
                                        </Card.Text>
                                        <h6>Products:</h6>
                                        <ListGroup variant="flush">
                                            {order.products.map((product, index) => (
                                                <ListGroup.Item key={index}>
                                                    {product.name} - <Badge bg="success">${product.price.toFixed(2)}</Badge>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">Created At: {new Date(order.createdAt).toLocaleDateString()}</small>
                                    </Card.Footer>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Card>
                    ))}
                </Accordion>
            )}
        </Container>
    );
};

export default AdminOrders;

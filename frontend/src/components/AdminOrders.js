// AdminOrders.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ListGroup, Spinner, Alert } from 'react-bootstrap';

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
                <ul className="list-group">
                    {orders.map(order => (
                        <li key={order._id} className="list-group-item">
                            <h5>Order ID: {order._id}</h5>
                            <p><strong>User:</strong> {order.email}</p>
                            <p><strong>Name:</strong> {order.name}</p>
                            <p><strong>Address:</strong> {order.address}</p>
                            <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
                            <h6>Products:</h6>
                            <ul>
                                {order.products.map((product, index) => (
                                    <li key={index}>
                                        {product.name} - ${product.price.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                            <p><small>Created At: {new Date(order.createdAt).toLocaleDateString()}</small></p>
                        </li>
                    ))}
                </ul>
            )}
        </Container>
    );
};

export default AdminOrders;

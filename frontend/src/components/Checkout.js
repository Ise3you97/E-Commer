import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

// Carga la clave pública de Stripe
const stripePromise = loadStripe('pk_test_51Pn2MJA4rGsRdyPfDhf7c7ZpM4eDzR5WsWG2Ujn8QrroHi0Kfpj9emVP08SwsUAph1KSyuwNRow3UyJozhlYPvTm00z3iuZooM');

const CheckoutForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const { totalAmount } = location.state || {};

  // Obtén el token de autenticación del localStorage
  const authToken = localStorage.getItem('token');
  const userEmail = localStorage.getItem('email'); // Obtén el email del localStorage

  useEffect(() => {
    // Recupera el nombre del usuario y los datos del carrito desde localStorage
    const storedName = localStorage.getItem('username');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    setName(storedName || ''); // Establece el nombre del usuario o deja vacío si no está en localStorage
    setCartItems(cart);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    // Crea un token de tarjeta con Stripe
    const { token, error } = await stripe.createToken(elements.getElement(CardNumberElement));
    if (error) {
      console.error(error);
      alert('Error al procesar el pago.');
      setLoading(false);
      return;
    }

    try {
      // Envía la información al endpoint de Stripe
      const checkoutResponse = await axios.post('http://localhost:4000/api/checkout', {
        name,
        address,
        token: token.id,
        products: cartItems,
        totalAmount,
      }, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (checkoutResponse.data.success) {
        // Si el pago se procesa con éxito, envía la información del pedido al backend
        await axios.post('http://localhost:4000/api/orders', {
          name,
          address,
          email: userEmail, // Usa el email almacenado en el localStorage
          products: cartItems,
          totalAmount,
        }, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        alert('Order placed successfully');
        localStorage.removeItem('cart'); // Vacía el carrito después de la compra
        window.location.href = '/';
      } else {
        alert('Error al procesar el pago.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar el pedido.');
    }

    setLoading(false);
  };

  return (
    <Card className="p-4 shadow-sm" style={{ maxWidth: '800px', margin: 'auto', borderRadius: '10px', borderColor: '#f8f9fa' }}>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Columna Izquierda: Nombre, Dirección y Resumen del Carrito */}
            <Col md={6}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type="text" 
                  value={name} 
                  readOnly // Hace que el campo sea de solo lectura
                  placeholder="Enter your name" 
                />
              </Form.Group>

              <Form.Group controlId="formAddress" className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control 
                  type="text" 
                  value={address} 
                  readOnly // Hace que el campo sea de solo lectura
                  placeholder="Enter your address" 
                />
              </Form.Group>

              <div className="mb-4">
                <h4>Cart Summary</h4>
                {cartItems.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <ul className="list-group">
                    {cartItems.map((item, index) => (
                      <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <span><strong>{item.name}</strong> - ${item.price} x {item.quantity || 1}</span>
                        <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <h5 className="mt-3">Total Amount: ${totalAmount}</h5>
              </div>
            </Col>

            {/* Columna Derecha: Detalles de Pago (Stripe) */}
            <Col md={6}>
              <div className="mb-3">
                <Form.Label>Card Number</Form.Label>
                <CardNumberElement 
                  className="form-control"
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#495057',
                        '::placeholder': {
                          color: '#6c757d',
                        },
                      },
                      invalid: {
                        color: '#dc3545',
                      },
                    },
                    disabled: true, // Hace que el campo sea de solo lectura
                  }} 
                />
              </div>
              
              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <Form.Label>MM/YY</Form.Label>
                    <CardExpiryElement 
                      className="form-control" 
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#495057',
                            '::placeholder': {
                              color: '#6c757d',
                            },
                          },
                          invalid: {
                            color: '#dc3545',
                          },
                        },
                        disabled: true, // Hace que el campo sea de solo lectura
                      }} 
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <Form.Label>CVC</Form.Label>
                    <CardCvcElement 
                      className="form-control" 
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#495057',
                            '::placeholder': {
                              color: '#6c757d',
                            },
                          },
                          invalid: {
                            color: '#dc3545',
                          },
                        },
                        disabled: true, // Hace que el campo sea de solo lectura
                      }} 
                    />
                  </div>
                </Col>
              </Row>
              
              <Button variant="primary" type="submit" disabled={loading} className="w-100 mt-3">
                {loading ? 'Processing...' : 'Place Order'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

const Checkout = () => {
  return (
    <div className="checkout-container" style={{ padding: '30px', backgroundColor: '#f8f9fa' }}>
      <h1 className="text-center mb-4">Checkout</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Checkout;

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

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
    const { token, error } = await stripe.createToken(elements.getElement(CardElement));
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

        if (checkoutResponse.data.success) {
          alert('Order placed successfully');
          localStorage.removeItem('cart'); // Vacía el carrito después de la compra
          window.location.href = '/';
        } else {
          alert('Error al procesar el pedido.');
        }
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Address</label>
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Card Details</label>
        <CardElement />
      </div>
      <div>
        <h3>Cart Summary</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong> - ${item.price} x {item.quantity || 1}
              </li>
            ))}
          </ul>
        )}
        <h4>Total Amount: ${totalAmount}</h4>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Place Order'}
      </button>
    </form>
  );
};

const Checkout = () => {
  return (
    <div>
      <h1>Checkout</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Checkout;

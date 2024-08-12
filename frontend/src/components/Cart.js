import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = ({ show, handleClose, updateCartCount }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
    updateCartCount(cart.length); // Actualizar el número de productos en el carrito
  }, [updateCartCount]);

  const removeFromCart = (index) => {
    if (!token) {
      navigate('/login');
      return;
    }
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
    updateCartCount(newCartItems.length); // Actualizar el número de productos en el carrito
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleCheckout = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    const products = cartItems.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1 // Asegúrate de manejar la cantidad si existe
    }));
    const totalAmount = getTotalPrice();

    try {
      const response = await axios.post(
        'http://localhost:4000/api/orders', // Cambia la ruta a /api/orders
        {
          products,
          totalAmount
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log('Order created successfully:', response.data);
      // Vacía el carrito y redirige a la página de confirmación
      setCartItems([]);
      localStorage.removeItem('cart');
      updateCartCount(0);
      navigate('/confirmation'); // Redirige a una página de confirmación
    } catch (error) {
      console.error('Order creation failed:', error);
      // Manejar errores (mostrar mensaje al usuario, etc.)
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <div key={index} className="mb-3">
                <h5>{item.name}</h5>
                <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px' }} />
                <p>${item.price}</p>
                <Button variant="danger" onClick={() => removeFromCart(index)}>Remove</Button>
              </div>
            ))}
            <h4>Total: ${getTotalPrice()}</h4>
            <Button variant="primary" onClick={handleCheckout}>Proceed to Checkout</Button>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Cart;

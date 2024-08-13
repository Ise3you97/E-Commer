import React, { useState, useEffect } from 'react';
import { Modal, Button, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Cart = ({ show, handleClose, updateCartCount }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(groupByProduct(cart));
    updateCartCount(cart.length); // Actualizar el número de productos en el carrito
  }, [updateCartCount]);

  // Agrupar artículos por nombre y contar la cantidad
  const groupByProduct = (items) => {
    const groupedItems = items.reduce((acc, item) => {
      const existingItem = acc.find(i => i.name === item.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        acc.push({ ...item, quantity: 1 });
      }
      return acc;
    }, []);
    return groupedItems;
  };

  const removeFromCart = (name) => {
    if (!token) {
      navigate('/login');
      return;
    }
    const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const newCartItems = updatedCart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
    setCartItems(groupByProduct(newCartItems));
    updateCartCount(newCartItems.length); // Actualizar el número de productos en el carrito
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleCheckout = () => {
    if (!token) {
      navigate('/login');
      return;
    }

    const products = cartItems.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));
    const totalAmount = getTotalPrice();

    navigate('/checkout', { state: { products, totalAmount } });
    handleClose(); // Cierra el modal
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
            <Stack gap={3}>
              {cartItems.map((item, index) => (
                <div key={index} className="d-flex align-items-center">
                  <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                  <div>
                    <h5>{item.name}</h5>
                    <p>Price: ${item.price} x {item.quantity}</p>
                    <p>Total: ${item.price * item.quantity}</p>
                    <Button variant="danger" onClick={() => removeFromCart(item.name)}>Remove</Button>
                  </div>
                </div>
              ))}
            </Stack>
            <h4 className="mt-3">Total: ${getTotalPrice()}</h4>
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

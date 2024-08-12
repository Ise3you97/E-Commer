// src/components/Checkout.js
import React, { useState } from 'react';

const Checkout = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías enviar los datos al backend para procesar el pedido.
    alert('Order placed successfully');
    localStorage.removeItem('cart'); // Vacía el carrito después de la compra
    window.location.href = '/';
  };

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div>
          <label>Card Number</label>
          <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;

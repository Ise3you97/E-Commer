import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams(); // Obtiene el ID del producto desde la URL
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();  // Para redirigir si no está autenticado
  const token = localStorage.getItem('token');  // Obtener el token de autenticación

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`http://localhost:4000/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const addToCart = () => {
    if (!token) {
      alert('Por favor, inicie sesión para agregar productos al carrito.');
      navigate('/login');
      return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto agregado al carrito');
    window.location.reload(); 
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={addToCart}>Añadir al Carrito</button>
    </div>
  );
};

export default ProductDetail;

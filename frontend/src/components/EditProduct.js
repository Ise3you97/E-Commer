import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const { productId } = useParams(); // Obtener el ID del producto desde la URL
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState(''); // Agregar estado para el tag
  
  const navigate = useNavigate();
  console.log('este es el id ', productId);

  useEffect(() => {
    console.log('Product ID:', productId); // Verifica el ID aquí
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/products/${productId}`);
        setName(data.name);
        setImage(data.image);
        setPrice(data.price);
        setDescription(data.description);
        setTag(data.tag); // Rellenar el campo de tag
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
  
    if (productId) {
      fetchProduct();
    } else {
      console.error('Product ID is not defined.');
    }
  }, [productId]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obtener el token de localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró el token. Por favor, inicia sesión.');
      return;
    }

    try {
      // Configurar los encabezados de la solicitud
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Incluir el token en los encabezados
        },
      };

      // Realizar la solicitud PUT para actualizar el producto
      await axios.put(
        `http://localhost:4000/api/products/${productId}`,
        {
          name,
          image,
          price,
          description,
          tag, // Incluir el tag en el objeto de actualización
        },
        config // Pasar la configuración con los encabezados
      );

      // Redirigir a la página principal después de la actualización
      navigate('/');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Actualizar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre del Producto</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">URL de la Imagen</label>
          <input
            type="text"
            className="form-control"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Etiqueta</label>
          <select
            className="form-control"
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          >
            <option value="">Seleccione una etiqueta</option>
            <option value="Whisky">Whisky</option>
            <option value="Tequila">Tequila</option>
            <option value="Vino">Vino</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Actualizar Producto</button>
      </form>
    </div>
  );
};

export default EditProduct;

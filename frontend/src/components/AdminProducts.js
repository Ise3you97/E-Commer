import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const AdminProducts = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState(''); // Nuevo estado para la etiqueta

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
        const product = { name, image, price, description, tag }; // Incluir el tag en el objeto de producto

        axios.post('http://localhost:4000/api/products', product, {
            headers: {
                'Authorization': `Bearer ${token}` // Incluir el token en los encabezados
            }
        })
        .then(response => {
            alert('Producto agregado exitosamente');
        })
        .catch(err => {
            console.error('Error al agregar el producto:', err);
            alert('Ocurrió un error al agregar el producto.');
        });
    };

    return (
        <div className="container mt-5">
            <h2>Agregar Nuevo Producto</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nombre del Producto</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>URL de la Imagen</Form.Label>
                    <Form.Control
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="tag">
                    <Form.Label>Etiqueta</Form.Label>
                    <Form.Control
                        as="select"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        required
                    >
                        <option value="">Seleccione una etiqueta</option>
                        <option value="Whisky">Whisky</option>
                        <option value="Tequila">Tequila</option>
                        <option value="Vino">Vino</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Agregar Producto
                </Button>
            </Form>
        </div>
    );
};

export default AdminProducts;

import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Css/AdmiProductos.css'; // Asegúrate de que esta ruta es correcta

const AdminProducts = () => {
    const [showProductForm, setShowProductForm] = useState(true);
    const [productName, setProductName] = useState('');
    const [productImage, setProductImage] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productTag, setProductTag] = useState('');

    const [offerName, setOfferName] = useState('');
    const [offerDescription, setOfferDescription] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const [offerImage, setOfferImage] = useState('');

    const navigate = useNavigate();

    const handleProductSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const product = { name: productName, image: productImage, price: productPrice, description: productDescription, tag: productTag };

        axios.post('http://localhost:4000/api/products', product, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            alert('Producto agregado exitosamente');
            navigate('/'); // Redirigir a la ruta de home después de crear el producto
        })
        .catch(err => {
            console.error('Error al agregar el producto:', err);
            alert('Ocurrió un error al agregar el producto.');
        });
    };

    const handleOfferSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const offer = { name: offerName, description: offerDescription, price: offerPrice, image: offerImage };

        axios.post('http://localhost:4000/api/offers', offer, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            alert('Oferta agregada exitosamente');
            navigate('/'); // Redirigir a la ruta de home después de crear la oferta
        })
        .catch(err => {
            console.error('Error al agregar la oferta:', err);
            alert('Ocurrió un error al agregar la oferta.');
        });
    };

    return (
        <div className='home-container'>
            <div className="container-admi mt-5">
                <div className="d-flex justify-content-center mb-4">
                    <Button
                        variant="outline-primary"
                        onClick={() => setShowProductForm(true)}
                        className="me-2"
                    >
                        Agregar Producto
                    </Button>
                    <Button
                        variant="outline-secondary"
                        onClick={() => setShowProductForm(false)}
                    >
                        Agregar Oferta
                    </Button>
                </div>

                {showProductForm ? (
                    <div>
                        <h2>Agregar Nuevo Producto</h2>
                        <Form onSubmit={handleProductSubmit}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Nombre del Producto</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="image">
                                <Form.Label>URL de la Imagen</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={productImage}
                                    onChange={(e) => setProductImage(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="price">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={productDescription}
                                    onChange={(e) => setProductDescription(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="tag">
                                <Form.Label>Etiqueta</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={productTag}
                                    onChange={(e) => setProductTag(e.target.value)}
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
                ) : (
                    <div>
                        <h2>Agregar Nueva Oferta</h2>
                        <Form onSubmit={handleOfferSubmit}>
                            <Form.Group className="mb-3" controlId="offerName">
                                <Form.Label>Nombre de la Oferta</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={offerName}
                                    onChange={(e) => setOfferName(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="offerDescription">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={offerDescription}
                                    onChange={(e) => setOfferDescription(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="offerPrice">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={offerPrice}
                                    onChange={(e) => setOfferPrice(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="offerImage">
                                <Form.Label>URL de la Imagen</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={offerImage}
                                    onChange={(e) => setOfferImage(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Agregar Oferta
                            </Button>
                        </Form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProducts;

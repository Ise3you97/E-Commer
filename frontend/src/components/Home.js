import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OfferCarousel from './OfferCarousel'; // Asegúrate de que este archivo esté en la misma carpeta

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/products');
        setFeaturedProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error al cargar productos.');
        setLoading(false);
      }
    };

    fetchProducts();

    const storedIsAdmin = localStorage.getItem('isAdmin');
    if (storedIsAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = featuredProducts.filter(product =>
        product.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(featuredProducts);
    }
  }, [searchQuery, featuredProducts]);

  const handleQuantityChange = (productId, delta) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 1) + delta, 1)
    }));
  };

  const handleAddToCart = (product) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Por favor, inicie sesión para agregar productos al carrito.');
      navigate('/login');
      return;
    }

    const quantity = quantities[product._id] || 1;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cart = cart.filter(item => item._id !== product._id);
    
    for (let i = 0; i < quantity; i++) {
      cart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto agregado al carrito');
    setQuantities(prevQuantities => ({ ...prevQuantities, [product._id]: 1 }));
  };

  const handleUpdateProduct = (productId) => {
    navigate(`/admin/products/${productId}/edit`);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:4000/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeaturedProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
      alert('Producto eliminado exitosamente.');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error al eliminar el producto.');
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) {
    return <div className="text-center mt-5">Cargando...</div>;
  }

  return (
    <div className='home'>
      <Container className="mt-5">
        <Row>
          <Col>
            <OfferCarousel />
          </Col>
        </Row>
        <Row className="text-center mb-4 mt-5">
          <Col>
            <Form.Control
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="mb-3"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            />
            <Link to="/products">
              <Button variant="primary" className="mt-3 px-4 py-3 rounded-pill shadow">
                Ver Todos los Productos
              </Button>
            </Link>
          </Col>
        </Row>
        {error && <Alert variant="danger" className="text-center">{error}</Alert>}
        <Row>
          {filteredProducts.length === 0 ? (
            <Col>
              <p className="text-center">No hay productos disponibles en este momento.</p>
            </Col>
          ) : (
            filteredProducts.map(product => (
              <Col key={product._id} md={4} className="mb-4">
                <Card className="shadow-sm rounded border-light card-hover">
                  <Card.Img variant="top" src={product.image} alt={product.name} style={{ height: '200px', objectFit: 'cover' }} />
                  <Card.Body>
                    <Card.Title className="text-primary">{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text><strong>${product.price}</strong></Card.Text>
                    {isAdmin ? (
                      <div className="d-flex justify-content-between">
                        <Button
                          variant="outline-danger"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          Eliminar
                        </Button>
                        <Button
                          variant="outline-secondary"
                          onClick={() => handleUpdateProduct(product._id)}
                        >
                          Actualizar
                        </Button>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <Button variant="outline-secondary" onClick={() => handleQuantityChange(product._id, -1)}>-</Button>
                          <span className="mx-2">{quantities[product._id] || 1}</span>
                          <Button variant="outline-secondary" onClick={() => handleQuantityChange(product._id, 1)}>+</Button>
                        </div>
                        <Button
                          variant="primary"
                          onClick={() => handleAddToCart(product)}
                          className="ml-2"
                        >
                          Añadir al Carrito
                        </Button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Home;

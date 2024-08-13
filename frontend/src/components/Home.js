import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [quantities, setQuantities] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get('search') || '';
        const { data } = await axios.get('http://localhost:4000/api/products', {
          params: { search: searchQuery },
        });
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
  }, [location.search]);

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
    
    // Remove the product if already in the cart
    cart = cart.filter(item => item._id !== product._id);
    
    // Add the product with the specified quantity
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <Row className="text-center mb-4">
        <Col>
          <p>Explora nuestros productos destacados y encuentra lo que necesitas.</p>
          <Link to="/products">
            <Button variant="primary">Ver Todos los Productos</Button>
          </Link>
        </Col>
      </Row>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {featuredProducts.length === 0 ? (
          <Col>
            <p>No hay productos disponibles en este momento.</p>
          </Col>
        ) : (
          featuredProducts.map(product => (
            <Col key={product._id} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={product.image} alt={product.name} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text><strong>${product.price}</strong></Card.Text>
                  {isAdmin ? (
                    <>
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
                    </>
                  ) : (
                    <div>
                      <Button variant="outline-secondary" onClick={() => handleQuantityChange(product._id, -1)}>-</Button>
                      <span className="mx-2">{quantities[product._id] || 1}</span>
                      <Button variant="outline-secondary" onClick={() => handleQuantityChange(product._id, 1)}>+</Button>
                      <Button
                        variant="outline-primary"
                        onClick={() => handleAddToCart(product)}
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
  );
};

export default Home;

// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/products');
        setFeaturedProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <Row className="text-center mb-4">
        <Col>
          <h1>Bienvenido a Nuestra Tienda</h1>
          <p>Explora nuestros productos destacados y encuentra lo que necesitas.</p>
          <Link to="/products">
            <Button variant="primary">Ver Todos los Productos</Button>
          </Link>
        </Col>
      </Row>
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
                  <Link to={`/products/${product._id}`}>
                    <Button variant="outline-primary">Ver Detalles</Button>
                  </Link>
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

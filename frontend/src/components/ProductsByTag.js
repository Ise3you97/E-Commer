// src/components/ProductsByTag.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

const ProductsByTag = () => {
  const { tag } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/products/tag/${tag}`);
        console.log(data); // Verifica el contenido de la respuesta
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error al cargar productos.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [tag]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Productos - {tag}</h1>
      {error && <p>{error}</p>}
      <Row>
        {products.map(product => (
          <Col key={product._id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.image} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text><strong>${product.price}</strong></Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductsByTag;

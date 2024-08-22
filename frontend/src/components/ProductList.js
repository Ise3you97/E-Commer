// src/components/ProductList.js
import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Css/ProductList.css';

const ProductList = () => {
  const navigate = useNavigate();

  const handleCardClick = (tag) => {
    navigate(`/products/tag/${tag}`);
  };

  return (
    <Container className="mt-5" style={{ height: "100vh" }}>
      <h1 className="text-center mb-4">Categories</h1>
      <Row className="justify-content-center">
        <Col md={4} className="mb-4">
          <Card onClick={() => handleCardClick('first-category')} style={{ cursor: 'pointer' }}>
            <Card.Img variant="top" src="https://via.placeholder.com/150" alt="First Category" />
            <Card.Body>
              <Card.Title className="text-center">Primera Categoría</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card onClick={() => handleCardClick('second-category')} style={{ cursor: 'pointer' }}>
            <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Second Category" />
            <Card.Body>
              <Card.Title className="text-center">Segunda Categoría</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card onClick={() => handleCardClick('third-category')} style={{ cursor: 'pointer' }}>
            <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Third Category" />
            <Card.Body>
              <Card.Title className="text-center">Tercera Categoría</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;

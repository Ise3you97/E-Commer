// src/components/ProductList.js
import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Css/ProductList.css'
const ProductList = () => {
  const navigate = useNavigate();

  const handleCardClick = (tag) => {
    navigate(`/products/tag/${tag}`);
  };

  return (
    <Container className="mt-5" style={{'height': "100vh"}}>
      <h1 className="text-center mb-4">Categories</h1>
      <Row className="justify-content-center">
        <Col md={4} className="mb-4">
          <Card onClick={() => handleCardClick('Whisky')} style={{ cursor: 'pointer' }}>
            <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Whisky" />
            <Card.Body>
              <Card.Title className="text-center">Whisky</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card onClick={() => handleCardClick('Tequila')} style={{ cursor: 'pointer' }}>
            <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Tequila" />
            <Card.Body>
              <Card.Title className="text-center">Tequila</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card onClick={() => handleCardClick('third-category')} style={{ cursor: 'pointer' }}>
            <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Third Category" />
            <Card.Body>
              <Card.Title className="text-center">Third Category</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;

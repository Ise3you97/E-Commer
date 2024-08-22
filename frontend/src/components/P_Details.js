import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const P_Details = () => {
  const { productId } = useParams();
  // Objeto falso para demostración
  const product = {
    id: productId,
    title: `Producto ${productId}`,
    image: 'https://via.placeholder.com/600x400',
    description: 'Descripción del producto.',
    price: (Math.random() * 100).toFixed(2),
    category: 'Categoría Ejemplo'
  };

  return (
    <div className='product-detail' style={{height:'100dvh'}}>
      <Container className="mt-5">
        <Row>
          <Col md={6}>
            <Card.Img variant="top" src={product.image} alt={product.title} style={{ height: '400px', objectFit: 'cover' }} />
          </Col>
          <Col md={6}>
            <Card className="shadow-sm rounded border-light">
              <Card.Body>
                <Card.Title className="text-primary">{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text><strong>${product.price}</strong></Card.Text>
                <Card.Text><small>Categoría: {product.category}</small></Card.Text>
                <Button variant="primary">Añadir al Carrito</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default P_Details;

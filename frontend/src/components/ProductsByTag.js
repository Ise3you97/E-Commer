import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';

const ProductsByTag = () => {
  const { tag } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Generar datos simulados
    const generateFakeProducts = () => {
      return [
        {
          _id: '1',
          name: `Producto 1 (${tag})`,
          description: 'Descripción del producto 1',
          price: 10.99,
          image: 'https://via.placeholder.com/150',
        },
        {
          _id: '2',
          name: `Producto 2 (${tag})`,
          description: 'Descripción del producto 2',
          price: 15.99,
          image: 'https://via.placeholder.com/150',
        },
        {
          _id: '3',
          name: `Producto 3 (${tag})`,
          description: 'Descripción del producto 3',
          price: 12.99,
          image: 'https://via.placeholder.com/150',
        },
      ];
    };

    // Simular la carga de datos
    setTimeout(() => {
      setProducts(generateFakeProducts());
      setLoading(false);
    }, 1000);
  }, [tag]);

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

  if (loading) {
    return <div className="text-center mt-5">Cargando...</div>;
  }

  return (
    <Container className="mt-5" >
      <h1 className="text-center mb-4">Productos - {tag}</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {products.map(product => (
          <Col key={product._id} md={4} className="mb-4">
            <Card className="shadow-sm rounded border-light card-hover">
              <Card.Img 
                variant="top" 
                src={product.image} 
                alt={product.name} 
                style={{ height: '200px', objectFit: 'cover' }} 
              />
              <Card.Body>
                <Card.Title className="text-primary">{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text><strong>${product.price}</strong></Card.Text>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => handleQuantityChange(product._id, -1)}
                    >
                      -
                    </Button>
                    <span className="mx-2">{quantities[product._id] || 1}</span>
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => handleQuantityChange(product._id, 1)}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="primary"
                    //onClick={() => handleAddToCart(product)}
                    onClick={()=> alert('Esto es una version de muestra este comportamiento esta desabilitado')}
                    className="ml-2"
                  >
                    Añadir al Carrito
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductsByTag;

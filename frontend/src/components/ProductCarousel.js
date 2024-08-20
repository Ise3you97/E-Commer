import React from 'react';
import { Carousel } from 'react-bootstrap';

const ProductCarousel = ({ products }) => {
  return (
    <Carousel className='carousel'>
      {products.slice(0, 3).map((product) => (
        <Carousel.Item key={product._id}>
          <img
            className="d-block w-100"
            src={product.image}
            alt={product.name}
          />
          <Carousel.Caption>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;

import React, { useEffect, useState } from "react";
import { Carousel, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import "./Css/ProductCarousel.css";

const OfferCarousel = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/offers");

        // Asegúrate de que data.offers sea un array
        if (Array.isArray(data)) {
          setOffers(data);
        } else if (Array.isArray(data.offers)) {
          setOffers(data.offers);
        } else {
          throw new Error("Formato de datos inesperado");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching offers:", error);
        setError("Error al cargar las ofertas.");
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  // Verifica si offers es un array
  if (!Array.isArray(offers)) {
    return (
      <Alert variant="danger">
        Las ofertas no se pudieron cargar correctamente.
      </Alert>
    );
  }

  return (
    <Carousel className="carousel">
      {offers.slice(0, 3).map((offer) => (
        <Carousel.Item key={offer._id}>
          <h2 className="carousel-title">Offers</h2>
          <img className="d-block w-100" src={offer.image} alt={offer.title} />
          <Carousel.Caption>
            <h2>{offer.name}</h2>
            <p>{offer.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default OfferCarousel;

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTwitter, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='foot'>
    <footer className="footer bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Mi Empresa</h5>
            <p>&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
          </Col>
          <Col md={4}>
            <h5>Enlaces Importantes</h5>
            <ul className="list-unstyled">
              <li><a href="/privacy" className="text-light">Política de Privacidad</a></li>
              <li><a href="/terms" className="text-light">Términos de Servicio</a></li>
              <li><a href="/help" className="text-light">Ayuda</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contáctanos</h5>
            <p>Email: contacto@miempresa.com</p>
            <div className="social-icons">
              <a href="https://twitter.com" className="text-light me-2"><FaTwitter size={20} /></a>
              <a href="https://linkedin.com" className="text-light me-2"><FaLinkedin size={20} /></a>
              <a href="https://instagram.com" className="text-light me-2"><FaInstagram size={20} /></a>
              <a href="https://facebook.com" className="text-light"><FaFacebook size={20} /></a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
    </div>
  );
};

export default Footer;

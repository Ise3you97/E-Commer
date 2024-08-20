import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';
import './Css/NavigationBar.css';

const NavigationBar = () => {
    const [showCart, setShowCart] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    useEffect(() => {
        // Actualizar la cantidad de productos en el carrito cuando se monta el componente
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartCount(storedCart.length);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('cart'); // Eliminar el carrito al cerrar sesión
        setCartCount(0); // Restablecer el contador del carrito
        navigate("/login");
    };

    const handleCartOpen = () => {
        if (!token) {
            navigate("/login");
        } else {
            setShowCart(true);
        }
    };

    const handleCartClose = () => setShowCart(false);

    const updateCartCount = (count) => {
        setCartCount(count);
    };

    return (
        <div className='navbar'>
            <Navbar >
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Mi Tienda</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <LinkContainer to="/">
                                <Nav.Link>Inicio</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={isAdmin ? "/admin-products" : "/products"}>
                                <Nav.Link>{isAdmin ? "Admin Products" : "Productos"}</Nav.Link>
                            </LinkContainer>
                            {isAdmin && (
                                <>
                                    <LinkContainer to="/userlist">
                                        <Nav.Link>Usuarios</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/admin-orders">
                                        <Nav.Link>Orders</Nav.Link>
                                    </LinkContainer>
                                </>
                            )}
                        </Nav>
                        <Nav className="ms-auto">
                            {token ? (
                                <>
                                    <Nav.Link disabled>{`Hola, ${username}`}</Nav.Link>
                                    <Nav.Link onClick={handleLogout}>Cerrar Sesión</Nav.Link>
                                </>
                            ) : (
                                <>
                                    <LinkContainer to="/login">
                                        <Nav.Link>Iniciar Sesión</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/register">
                                        <Nav.Link>Registrarse</Nav.Link>
                                    </LinkContainer>
                                </>
                            )}
                            {/* Mostrar el carrito solo si el usuario no es admin */}
                            {!isAdmin && (
                                <Button variant="outline-secondary" onClick={handleCartOpen} className="position-relative">
                                    🛒
                                    <i className='bi bi-cart'></i>
                                    {cartCount > 0 && (
                                        <Badge className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {cartCount}
                                        </Badge>
                                    )}
                                </Button>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Modal del carrito */}
            <Cart show={showCart} handleClose={handleCartClose} updateCartCount={updateCartCount} />
        </div>
    );
};

export default NavigationBar;

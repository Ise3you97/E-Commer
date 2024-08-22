import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Badge, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';

const NavigationBar = () => {
    const [showCart, setShowCart] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartCount(storedCart.length);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('cart');
        setCartCount(0);
        navigate("/login");
    };

    const handleCartOpen = () => {
        setShowCart(true);
    };

    const handleCartClose = () => setShowCart(false);

    const updateCartCount = (count) => {
        setCartCount(count);
    };

    const toggleMode = () => {
        const newMode = !isAdmin;
        setIsAdmin(newMode);
        localStorage.setItem('isAdmin', newMode.toString());
        navigate(newMode ? "/admin-products" : "/products");
    };

    return (
        <div className='navbar'>
            <Navbar>
                {/* Texto "Tienda" a la izquierda del Navbar */}
                <Navbar.Brand className="ms-3">
                    Tienda
                </Navbar.Brand>

                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <LinkContainer to="/">
                                <Nav.Link>Inicio</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={isAdmin ? "/admin-products" : "/products"}>
                                <Nav.Link>{isAdmin ? "Admin Products" : "Categorias"}</Nav.Link>
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
                                <Dropdown align="end">
                                    <Dropdown.Toggle variant="link" id="dropdown-basic" className="text-dark">
                                        <i className="bi bi-person-circle me-1"></i> {username}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={handleLogout} className="text-danger">
                                            <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
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
                            <Button 
                                variant={isAdmin ? "danger" : "success"} 
                                onClick={toggleMode} 
                                className="mx-2"
                            >
                                {isAdmin ? "Modo Cliente" : "Modo Admin"}
                            </Button>
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

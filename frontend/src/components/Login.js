import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Form, Button, Card } from 'react-bootstrap';

function Login() {    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/api/auth/login", { email, password })
            .then(result => {
                if (result.data.token) {
                    // Almacena el token y la información del usuario en el almacenamiento local
                    localStorage.setItem('token', result.data.token);
                    localStorage.setItem('username', result.data.user.name);
                    localStorage.setItem('email', result.data.user.email);
                    localStorage.setItem('isAdmin', result.data.user.isAdmin);

                    navigate(result.data.user.isAdmin ? "/" : "/");
                } else {
                    alert("Login fallido: " + result.data.message);
                }
            })
            .catch(err => {
                console.error('Error:', err);
                alert('Error en el login.');
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-light vh-100">
            <Card className="p-4 rounded shadow" style={{ width: '100%', maxWidth: '400px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter Email" 
                                autoComplete="off" 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter Password" 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="success" type="submit" className="w-100">
                            Login
                        </Button>
                    </Form>
                    <p className="mt-3 text-center">
                        Don't have an account? <Link to="/register">Sign Up</Link>
                    </p>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;

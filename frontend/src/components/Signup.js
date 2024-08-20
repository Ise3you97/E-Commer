import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Form, Button, Card } from 'react-bootstrap';

function Signup() {    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!acceptTerms) {
            alert("Debes aceptar las políticas de privacidad para registrarte.");
            return;
        }
        axios.post("http://localhost:4000/api/auth/register", { name, email, password })
            .then(result => {
                console.log(result);
                navigate("/login");
            })
            .catch(err => {
                console.error('Error:', err);
                alert('Error al registrarse.');
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-light vh-100">
            <Card className="p-4 rounded shadow" style={{ width: '100%', maxWidth: '400px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName" className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Name" 
                                autoComplete="off" 
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
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
                        <Form.Group controlId="formAcceptTerms" className="mb-4 form-check">
                            <Form.Check 
                                type="checkbox" 
                                label={<span>I accept the <Link to="/terms">privacy policy</Link>.</span>} 
                                checked={acceptTerms}
                                onChange={(e) => setAcceptTerms(e.target.checked)}
                            />
                        </Form.Group>
                        <Button variant="success" type="submit" className="w-100">
                            Sign Up
                        </Button>
                    </Form>
                    <p className="mt-3 text-center">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Signup;

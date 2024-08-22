import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaEdit, FaShoppingCart } from 'react-icons/fa';

const UserList = () => {
  const [users, setUsers] = useState([
    { _id: '1', name: 'John Doe', email: 'john@example.com', isAdmin: true },
    { _id: '2', name: 'Jane Smith', email: 'jane@example.com', isAdmin: false },
    { _id: '3', name: 'Alice Johnson', email: 'alice@example.com', isAdmin: false },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.');
    if (!confirmDelete) {
      return;
    }

    setUsers(users.filter(user => user._id !== id));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    setUsers(users.map(user =>
      user._id === selectedUser
        ? { ...user, name, email, isAdmin }
        : user
    ));

    setShowModal(false);
  };

  const openUpdateModal = (user) => {
    setSelectedUser(user._id);
    setName(user.name);
    setEmail(user.email);
    setIsAdmin(user.isAdmin);
    setShowModal(true);
  };

  const handleViewOrders = (email) => {
    navigate(`/orders/${encodeURIComponent(email)}`);
  };

  return (
    <div className="container mt-5" style={{height:'100vh'}}>
      <h2 className="mb-4 text-center">Lista de Usuarios</h2>
      <div className="row">
        {users.map((user) => (
          <div className="col-md-4" key={user._id}>
            <div className="card mb-4 shadow-sm border-0 rounded-lg">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text"><strong>Email:</strong> {user.email}</p>
                <p className="card-text"><strong>Admin:</strong> {user.isAdmin ? 'Sí' : 'No'}</p>
                <div className="d-flex justify-content-between">
                  <Button variant="danger" onClick={() => handleDelete(user._id)}>
                    <FaTrashAlt /> Eliminar
                  </Button>
                  <Button variant="primary" onClick={() => openUpdateModal(user)}>
                    <FaEdit /> Actualizar
                  </Button>
                  <Button variant="info" onClick={() => handleViewOrders(user.email)}>
                    <FaShoppingCart /> Ver Órdenes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para actualizar usuario */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Deja en blanco si no deseas cambiar la contraseña"
              />
            </Form.Group>
            <Form.Group controlId="formIsAdmin" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Administrador"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Actualizar Usuario
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserList;

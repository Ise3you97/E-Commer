import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaEdit, FaShoppingCart } from 'react-icons/fa'; // Importar íconos de react-icons

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No se encontró el token. Por favor, inicia sesión.');
          return;
        }

        const { data } = await axios.get('http://localhost:4000/api/auth/users', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.');
    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No se encontró el token. Por favor, inicia sesión.');
        return;
      }

      await axios.delete(`http://localhost:4000/api/auth/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No se encontró el token. Por favor, inicia sesión.');
        return;
      }

      await axios.put(`http://localhost:4000/api/auth/users/${selectedUser}`, {
        name,
        email,
        password,
        isAdmin,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(users.map(user =>
        user._id === selectedUser
          ? { ...user, name, email, isAdmin }
          : user
      ));

      setShowModal(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
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

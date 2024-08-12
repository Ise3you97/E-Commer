import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

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

      // Actualizar la lista de usuarios después de la actualización
      setUsers(users.map(user =>
        user._id === selectedUser
          ? { ...user, name, email, isAdmin }
          : user
      ));

      // Cerrar el modal
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

  return (
    <div className="container mt-5">
      <h2>Lista de Usuarios</h2>
      <div className="row">
        {users.map((user) => (
          <div className="col-md-4" key={user._id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text"><strong>Email:</strong> {user.email}</p>
                <p className="card-text"><strong>Admin:</strong> {user.isAdmin ? 'Sí' : 'No'}</p>
                <Button variant="danger" onClick={() => handleDelete(user._id)}>Eliminar</Button>
                <Button variant="primary" className="ml-2" onClick={() => openUpdateModal(user)}>Actualizar</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para actualizar usuario */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text className="text-muted">
                Deja en blanco si no deseas cambiar la contraseña.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formIsAdmin">
              <Form.Check
                type="checkbox"
                label="Administrador"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Actualizar Usuario
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserList;

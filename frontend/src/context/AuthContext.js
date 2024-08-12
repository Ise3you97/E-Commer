// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Cargar el usuario desde el servidor al iniciar
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:4000/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.user);
        } catch (error) {
          console.error('Error al cargar el usuario', error);
          setUser(null);
        }
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('http://localhost:4000/api/auth/login', {
        email,
        password,
      });

      // Guardar el token en localStorage
      localStorage.setItem('token', data.token);

      // Cargar el usuario
      const response = await axios.get('http://localhost:4000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      throw error; // Puedes manejar el error de otra manera si es necesario
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

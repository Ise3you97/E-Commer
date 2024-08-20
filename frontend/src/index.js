import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Obtén el elemento root desde el HTML
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza el componente App dentro del elemento root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

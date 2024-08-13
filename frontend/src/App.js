import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import NavigationBar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout'; // Importa el componente Logout
import AdminProducts from './components/AdminProducts';
import EditProduct from './components/EditProduct';
import UserList from './components/UserList';
import ProductsByTag from './components/ProductsByTag';
import AdminOrders from './components/AdminOrders';
import OrderList from './components/OrderList';
import 'bootstrap/dist/css/bootstrap.min.css';

// Componente para manejar rutas no encontradas
const NotFound = () => <div>404 - Página no encontrada</div>;

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/products/tag/:tag" element={<ProductsByTag />} />
        <Route path="/admin/products/:id/edit" element={<EditProduct />} /> {/* Asegúrate de que esto coincida con el controlador */}
        <Route path="/admin-products" element={<AdminProducts />} />
        <Route path="/admin-orders" element={<AdminOrders />} /> {/* Nueva ruta */}
        <Route path="*" element={<NotFound />} /> {/* Manejo de rutas no encontradas */}
        <Route path="/orders/:email" element={<OrderList />} />
      </Routes>
    </Router>
  );
}

export default App;

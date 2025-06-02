import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './store';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import MenuPage from './pages/menu/MenuPage';
import LoginPage from './pages/auth/LoginPage';
import OrdersPage from './pages/orders/OrdersPage';
import CartPage from './pages/cart/CartPage';

const App: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/" replace /> : <LoginPage />} 
          />
          <Route 
            path="/orders" 
            element={user ? <OrdersPage /> : <Navigate to="/login" replace />} 
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

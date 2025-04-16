import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import AddressPage from './pages/AddressPage';
import PaymentPage from './pages/PaymentPage';
import SuccessPage from './pages/SuccessPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  React.useEffect(() => {
    // Clear all shopping data on app startup
    localStorage.removeItem('cart');
    localStorage.removeItem('addressData');
    localStorage.removeItem('paymentData');
    localStorage.removeItem('lastOrderNumber');
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<AddressPage />} />
        <Route path="/checkout/address" element={<AddressPage />} />
        <Route path="/checkout/payment" element={<PaymentPage />} />
        <Route path="/checkout/success" element={<SuccessPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
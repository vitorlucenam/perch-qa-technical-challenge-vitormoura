import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderNumber = location.state?.orderNumber || Math.floor(Math.random() * 1000000);

  useEffect(() => {
    const paymentStatus = localStorage.getItem('paymentStatus');
    const cart = JSON.parse(localStorage.getItem('shopping-cart') || '[]');

    // Only save order if coming from payment
    if (paymentStatus === 'success') {
      // Bug: Calculate total without considering quantity
      const total = cart.reduce((sum, item) => sum + item.price, 0);
      
      const newOrder = {
        orderNumber,
        date: new Date().toISOString(), // Full ISO string for accurate sorting
        items: cart,
        total
      };

      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.unshift(newOrder); // Add new order at the beginning
      localStorage.setItem('orders', JSON.stringify(orders));

      // Clear cart and payment status
      localStorage.removeItem('shopping-cart');
      localStorage.removeItem('paymentStatus');
    }
  }, [navigate, orderNumber]);

  return (
    <div className="success-page" data-testid="success-page">
      <div className="success-content" aria-label="Order success message">
        <div className="success-icon">
          <svg viewBox="0 0 24 24" width="64" height="64">
            <circle cx="12" cy="12" r="11" fill="#28a745" />
            <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <h1>Thank You for Your Purchase!</h1>
        <div className="order-info" data-testid="order-info">
          <div className="order-number">
            <span className="label">Order Number:</span>
            <span className="value" data-testid="order-number">#{orderNumber}</span>
          </div>
          <p className="confirmation-message">
            We've received your order and will begin processing it right away.
            You'll receive a confirmation email shortly.
          </p>
        </div>
        <div className="success-actions">
          <button 
            onClick={() => navigate('/')} 
            className="continue-shopping-button"
            data-testid="continue-shopping"
          >
            Continue Shopping
          </button>
          <button 
            onClick={() => navigate('/profile')} 
            className="view-orders-button"
            data-testid="view-orders"
          >
            View Your Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;

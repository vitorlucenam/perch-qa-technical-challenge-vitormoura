import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Get orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const sortedOrders = savedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    setOrders(sortedOrders);

    // Load saved profile data if exists
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.length >= 3 && /^[A-Za-z\s]+$/.test(value) 
          ? '' 
          : 'Name must be at least 3 characters and contain only letters';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ''
          : 'Please enter a valid email address';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const isFormValid = () => {
    const nameError = validateField('name', profile.name);
    const emailError = validateField('email', profile.email);
    return !nameError && !emailError;
  };

  const handleSave = () => {
    if (isFormValid()) {
      localStorage.setItem('userProfile', JSON.stringify(profile));
      setIsEditing(false);
      setErrors({});
    }
  };

  const handleCancel = () => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    setIsEditing(false);
    setErrors({});
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  return (
    <div className="profile-page" data-testid="profile-page">
      <div className="profile-header">
        <h1>Your Profile</h1>
        <button
          onClick={() => navigate('/')}
          className="back-to-home"
          data-testid="back-to-home"
          aria-label="Back to home"
        >
          ← Back to Home
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <h2>Personal Information</h2>
          <div className="profile-info">
            <div className="info-group">
              <label htmlFor="name">Name</label>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    className={`profile-input ${errors.name ? 'error' : ''}`}
                    data-testid="profile-name-input"
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
              ) : (
                <p data-testid="profile-name">{profile.name}</p>
              )}
            </div>
            <div className="info-group">
              <label htmlFor="email">Email</label>
              {isEditing ? (
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className={`profile-input ${errors.email ? 'error' : ''}`}
                    data-testid="profile-email-input"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              ) : (
                <p data-testid="profile-email">{profile.email}</p>
              )}
            </div>
            <div className="profile-actions">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="save-button"
                    data-testid="save-profile"
                    disabled={!isFormValid()}
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="cancel-button"
                    data-testid="cancel-edit"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="edit-button"
                  data-testid="edit-profile"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="orders-card">
          <h2>Order History</h2>
          {orders.length === 0 ? (
            <div className="no-orders" data-testid="no-orders">
              <p>You haven't placed any orders yet.</p>
              <button
                onClick={() => navigate('/')}
                className="start-shopping"
                data-testid="start-shopping"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="orders-list" data-testid="orders-list">
              {orders.map((order) => (
                <div 
                  key={order.orderNumber} 
                  className="order-item"
                  data-testid={`order-${order.orderNumber}`}
                >
                  <div className="order-header">
                    <div className="order-number">
                      <span className="label">Order #:</span>
                      <span className="value">{order.orderNumber}</span>
                    </div>
                    <div className="order-date">
                      <span className="label">Date:</span>
                      <span className="date" data-testid={`order-date-${order.orderNumber}`}>{formatDate(order.date)}</span>
                    </div>
                    <div className="order-total">
                      <span className="label">Total:</span>
                      <span className="value">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="order-items">
                    {order.items.map((item) => (
                      <div 
                        key={`${order.orderNumber}-${item.id}`} 
                        className="order-product"
                        data-testid={`order-${order.orderNumber}-product-${item.id}`}
                      >
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="product-thumbnail"
                        />
                        <div className="product-details">
                          <p className="product-name">{item.name}</p>
                          <p className="product-quantity">Quantity: {item.quantity}</p>
                          <p className="product-price">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

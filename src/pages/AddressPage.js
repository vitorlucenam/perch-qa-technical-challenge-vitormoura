import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddressPage = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    firstName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    if (!value.trim()) {
      return 'This field is required';
    }

    switch (name) {
      case 'firstName':
        return /^[A-Za-z\s]{2,30}$/.test(value.trim()) 
          ? '' 
          : 'Name must be 2-30 characters and contain only letters';
      case 'email':
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,}$/.test(value.trim()) 
          ? '' 
          : 'Please enter a valid email address';
      case 'phone':
        return /^\+?[0-9]{10,15}$/.test(value.replace(/\D/g, '')) 
          ? '' 
          : 'Phone number must be 10-15 digits';
      case 'zipCode':
        return /^\d{4,5}$/.test(value.trim()) 
          ? '' 
          : 'ZIP code must be 4 or 5 digits';
      case 'street':
        return value.trim().length >= 5 
          ? '' 
          : 'Street address must be at least 5 characters';
      case 'city':
        return /^[A-Za-z\s]{2,}$/.test(value.trim()) 
          ? '' 
          : 'City must contain only letters and spaces';
      case 'state':
        return /^[A-Za-z\s]{2,}$/.test(value.trim()) 
          ? '' 
          : 'State must contain only letters and spaces';
      case 'country':
        return /^[A-Za-z\s]{2,}$/.test(value.trim()) 
          ? '' 
          : 'Country must contain only letters and spaces';
      default:
        return !value.trim() ? 'This field is required' : '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check and validate all fields
    const newErrors = {};
    const touchedFields = {};
    
    Object.entries(address).forEach(([key, value]) => {
      touchedFields[key] = true;
      const error = validateField(key, value);
      if (error) {
        newErrors[key] = error;
      }
    });

    setTouched(touchedFields);
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Store address data and navigate
    localStorage.setItem('addressData', JSON.stringify(address));
    navigate('/checkout/payment');
  };

  return (
    <div className="product-page" data-testid="address-page">
      <nav className="breadcrumb" aria-label="breadcrumb">
        <button
          onClick={() => navigate('/cart')}
          className="back-button"
          data-testid="back-to-cart"
          aria-label="Back to cart"
        >
          ← Back to Cart
        </button>
      </nav>

      <div className="product-detail-container">
        <div className="product-info">
          <h1 className="product-name" aria-label="Delivery Address">Delivery Address</h1>
          
          <form onSubmit={handleSubmit} data-testid="address-form" className="address-form">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                data-testid="firstname-input"
                className={`address-input ${errors.firstName && touched.firstName ? 'error' : ''}`}
                aria-label="First name"
                value={address.firstName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {errors.firstName && touched.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                data-testid="email-input"
                className={`address-input ${errors.email && touched.email ? 'error' : ''}`}
                aria-label="Email address"
                value={address.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {errors.email && touched.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                data-testid="phone-input"
                className={`address-input ${errors.phone && touched.phone ? 'error' : ''}`}
                aria-label="Phone number"
                value={address.phone}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {errors.phone && touched.phone && <span className="error-message">{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="street">Street Address</label>
              <input
                type="text"
                id="street"
                name="street"
                data-testid="street-input"
                className={`address-input ${errors.street && touched.street ? 'error' : ''}`}
                aria-label="Street address"
                value={address.street}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {errors.street && touched.street && <span className="error-message">{errors.street}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                data-testid="city-input"
                className={`address-input ${errors.city && touched.city ? 'error' : ''}`}
                aria-label="City"
                value={address.city}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {errors.city && touched.city && <span className="error-message">{errors.city}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                data-testid="state-input"
                className={`address-input ${errors.state && touched.state ? 'error' : ''}`}
                aria-label="State"
                value={address.state}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {errors.state && touched.state && <span className="error-message">{errors.state}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">ZIP Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                data-testid="zipcode-input"
                className={`address-input ${errors.zipCode && touched.zipCode ? 'error' : ''}`}
                aria-label="ZIP code"
                value={address.zipCode}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {errors.zipCode && touched.zipCode && <span className="error-message">{errors.zipCode}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                data-testid="country-input"
                className={`address-input ${errors.country && touched.country ? 'error' : ''}`}
                aria-label="Country"
                value={address.country}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {errors.country && touched.country && <span className="error-message">{errors.country}</span>}
            </div>
            <button 
              type="submit" 
              className="add-to-cart-button"
              data-testid="continue-to-payment"
              aria-label="Continue to payment"
            >
              Continue to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;

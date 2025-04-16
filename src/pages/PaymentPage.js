import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [payment, setPayment] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [processing, setProcessing] = useState(false);

  const validateField = (name, value) => {
    if (!value.trim()) {
      return 'This field is required';
    }

    switch (name) {
      case 'cardHolder':
        return /^[A-Za-z\s]{2,50}$/.test(value.trim()) 
          ? '' 
          : 'Card holder name must be 2-50 characters and contain only letters';
      case 'cardNumber':
        // Simple validation - just check for 16 digits
        const digits = value.replace(/\D/g, '');
        return digits.length === 16 
          ? '' 
          : 'Card number must be 16 digits';
      case 'expiryDate':
        // Only validate format, allow expired dates
        const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        return expiryRegex.test(value.trim())
          ? ''
          : 'Expiry date must be in MM/YY format';
      case 'cvv':
        return /^[0-9]{3,4}$/.test(value.trim()) 
          ? '' 
          : 'CVV must be 3 or 4 digits';
      default:
        return !value.trim() ? 'This field is required' : '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    
    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2);
      }
    }
    
    setPayment(prev => ({ ...prev, [name]: formattedValue }));
    if (touched[name]) {
      const error = validateField(name, formattedValue);
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
    
    Object.entries(payment).forEach(([key, value]) => {
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

    // Simulate payment processing
    setProcessing(true);
    
    // Save cart items for order history
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const orderNumber = Math.floor(Math.random() * 1000000);
    const newOrder = {
      orderNumber,
      date: new Date().toISOString(),
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price, 0)
    };

    // Save to orders history
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem('cart');
    
    // Store payment data
    localStorage.setItem('paymentData', JSON.stringify(payment));
    localStorage.setItem('lastOrderNumber', orderNumber);
    
    // Navigate to success page
    setTimeout(() => {
      setProcessing(false);
      navigate('/checkout/success', { replace: true, state: { orderNumber } });
    }, 1500);
  };

  return (
    <div className="product-page" data-testid="payment-page">
      <nav className="breadcrumb" aria-label="breadcrumb">
        <button
          onClick={() => navigate('/checkout/address')}
          className="back-button"
          data-testid="back-to-address"
          aria-label="Back to address"
        >
          ← Back to Address
        </button>
      </nav>

      <div className="product-detail-container">
        <div className="product-info">
          <h1 className="product-name" aria-label="Payment Information">Payment Information</h1>
          
          <form onSubmit={handleSubmit} data-testid="payment-form" className="address-form">
            <div className="form-group">
              <label htmlFor="cardHolder">Card Holder Name</label>
              <input
                type="text"
                id="cardHolder"
                name="cardHolder"
                data-testid="cardholder-input"
                className={`address-input ${errors.cardHolder && touched.cardHolder ? 'error' : ''}`}
                aria-label="Card holder name"
                value={payment.cardHolder}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {errors.cardHolder && touched.cardHolder && <span className="error-message">{errors.cardHolder}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                data-testid="card-number-input"
                className={`address-input ${errors.cardNumber && touched.cardNumber ? 'error' : ''}`}
                aria-label="Card number"
                value={payment.cardNumber}
                onChange={handleInputChange}
                onBlur={handleBlur}
                maxLength="19"
                required
              />
              {errors.cardNumber && touched.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  data-testid="expiry-input"
                  className={`address-input ${errors.expiryDate && touched.expiryDate ? 'error' : ''}`}
                  aria-label="Card expiry date"
                  placeholder="MM/YY"
                  value={payment.expiryDate}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  maxLength="5"
                  required
                />
                {errors.expiryDate && touched.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  data-testid="cvv-input"
                  className={`address-input ${errors.cvv && touched.cvv ? 'error' : ''}`}
                  aria-label="Card CVV"
                  value={payment.cvv}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  maxLength="4"
                  required
                />
                {errors.cvv && touched.cvv && <span className="error-message">{errors.cvv}</span>}
              </div>
            </div>
            <button 
              type="submit" 
              className="add-to-cart-button"
              data-testid="complete-payment"
              aria-label="Complete payment"
              disabled={processing}
            >
              {processing ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

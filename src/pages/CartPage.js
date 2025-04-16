import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
    setLoading(false);
  }, []);

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cartItems.map(item =>
      item.id === productId
        ? { ...item, quantity: parseInt(newQuantity) }
        : item
    ).filter(item => item.quantity > 0);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.price) * parseInt(item.quantity));
    }, 0);
  };

  const checkout = () => {
    navigate('/checkout/address');
  };

  if (loading) {
    return (
      <div className="loading" data-testid="loading">
        Loading cart...
      </div>
    );
  }

  return (
    <div className="cart-page" data-testid="cart-page">
      <div className="cart-header">
        <h1 aria-label="Shopping Cart">Shopping Cart</h1>
        <button
          onClick={() => navigate('/')}
          className="continue-shopping"
          data-testid="continue-shopping"
          aria-label="Continue shopping"
        >
          Continue Shopping
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart" data-testid="empty-cart" role="alert">
          <p>Your cart is empty</p>
          <button
            onClick={() => navigate('/')}
            className="continue-shopping"
            data-testid="continue-shopping"
            aria-label="Continue shopping"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items" role="table" aria-label="Shopping cart items">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="cart-item"
                data-testid={`cart-item-${item.id}`}
                role="row"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="item-image"
                  loading="lazy"
                />
                <div className="item-details">
                  <h2 className="item-name">{item.name}</h2>
                  <p className="item-price" data-testid={`item-price-${item.id}`}>
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="quantity-controls">
                  <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                  <select
                    id={`quantity-${item.id}`}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                    className="quantity-select"
                    data-testid={`quantity-${item.id}`}
                    aria-label={`Quantity for ${item.name}`}
                  >
                    {[0, 1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-item"
                  data-testid={`remove-${item.id}`}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary" data-testid="cart-summary">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span data-testid="subtotal">${calculateTotal().toFixed(2)}</span>
            </div>
            <button
              onClick={checkout}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              data-testid="proceed-to-checkout"
              aria-label="Proceed to checkout"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

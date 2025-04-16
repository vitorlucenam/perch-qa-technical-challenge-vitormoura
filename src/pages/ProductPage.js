import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === parseInt(id));

  useEffect(() => {
    if (!product) {
      navigate('/');
    }
  }, [product, navigate]);

  if (!product) return null;

  // Bug 2: No maximum quantity validation
  // Bug 4: Products don't get added to cart due to wrong localStorage key
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity = Number(existingItem.quantity) + Number(quantity);
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: Number(quantity),
        image: product.image
      });
    }

    // Bug: Using wrong localStorage key ('shopping-cart' instead of 'cart')
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  return (
    <div className="product-detail-page" data-testid="product-detail-page">
      <nav className="breadcrumb" aria-label="breadcrumb">
        <button
          onClick={() => navigate('/')}
          className="back-button"
          data-testid="back-to-products"
          aria-label="Back to products"
        >
          ← Back to Products
        </button>
      </nav>

      <div className="product-detail-container">
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.name}
            className="product-detail-image"
            data-testid="product-image"
          />
        </div>

        <div className="product-info" data-testid="product-info">
          <h1 className="product-name" data-testid="product-name">{product.name}</h1>
          <p 
            className="product-price" 
            data-testid="product-price"
            aria-label={`Price: $${product.price}`}
          >
            ${product.price.toFixed(2)}
          </p>
          
          <div className="product-description" data-testid="product-description">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>



          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              data-testid="quantity-selector"
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <button
            onClick={addToCart}
            className="add-to-cart-button"
            data-testid="add-to-cart"
            aria-label={`Add ${quantity} ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
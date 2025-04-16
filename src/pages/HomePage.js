import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  return (
    <div className="home-page" data-testid="home-page">
      <header className="page-header">
        <div className="header-content">
          <h1 aria-label="Product Catalog">Product Catalog</h1>
          <div className="nav-buttons">
            <button
              onClick={() => navigate('/profile')}
              className="nav-button profile-button"
              data-testid="nav-to-profile"
              aria-label="Go to profile"
            >
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              Profile
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="nav-button cart-button"
              data-testid="nav-to-cart"
              aria-label="Go to cart"
            >
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
              Cart
            </button>
          </div>
        </div>
        <div className="search-sort-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            data-testid="product-search"
            aria-label="Search products"
            name="product-search"
          />
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="sort-button"
            data-testid="sort-price"
            aria-label={`Sort by price ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
          >
            Sort by Price {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </header>

      <div className="products-grid" role="grid" aria-label="Products grid">
        {products
          .filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .sort((a, b) =>
            sortOrder === 'asc' 
              ? a.price.toString().localeCompare(b.price.toString()) 
              : b.price.toString().localeCompare(a.price.toString())
          )
          .map(product => (
          <article
            key={product.id}
            className="product-card"
            data-testid={`product-${product.id}`}
            data-product-id={product.id}
          >
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
              loading="lazy"
            />
            <div className="product-info">
              <h2 className="product-name" title={product.name}>{product.name}</h2>
              <p className="product-price" data-testid={`price-${product.id}`}>
                ${product.price.toFixed(2)}
              </p>
              <p className="product-description">{product.description}</p>
              <button
                onClick={() => navigate(`/product/${product.id}`)}
                className="view-details-button"
                data-testid={`view-product-${product.id}`}
                aria-label={`View details for ${product.name}`}
              >
                View Details
              </button>
            </div>
          </article>
        ))}
      </div>

      {products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          ).length === 0 && (
        <p className="no-results" data-testid="no-results" role="alert">
          No products found matching your search.
        </p>
      )}
    </div>
  );
};

export default HomePage;

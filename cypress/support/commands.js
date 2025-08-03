// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom cart management commands using real application selectors

/**
 * Add multiple products to cart via localStorage manipulation
 * @param {Array} products - Array of {id: number, quantity: number} objects
 */
Cypress.Commands.add('addMultipleProductsToCart', (products) => {
    // Product data mapping (matching the real products from src/data/products.js)
    const productData = {
        1: { id: 1, name: 'Classic White Sneakers', price: 79.99, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772' },
        2: { id: 2, name: 'Premium Leather Watch', price: 149.99, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d' },
        3: { id: 3, name: 'Wireless Headphones', price: 199.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e' }
    };

    // Clear existing cart first
    cy.clearLocalStorage();
    
    // Build cart items array
    const cartItems = products.map(product => {
        const productInfo = productData[product.id];
        if (!productInfo) {
            throw new Error(`Product with id ${product.id} not found in product data`);
        }
        
        return {
            id: productInfo.id,
            name: productInfo.name,
            price: productInfo.price,
            quantity: product.quantity,
            image: productInfo.image
        };
    });

    // Set cart in localStorage
    cy.window().then((win) => {
        win.localStorage.setItem('cart', JSON.stringify(cartItems));
        // Debug log
        console.log('Cart set in localStorage:', JSON.stringify(cartItems));
    });
    
    // Wait a bit for localStorage to be set
    cy.wait(100);
});

/**
 * Clear all items from cart
 */
Cypress.Commands.add('clearCart', () => {
    cy.window().then((win) => {
        win.localStorage.removeItem('cart');
    });
    
    // If on cart page, verify empty state
    cy.url().then((url) => {
        if (url.includes('/cart')) {
            cy.get('[data-testid="empty-cart"]', { timeout: 10000 }).should('be.visible');
        }
    });
});

/**
 * Verify cart total matches expected amount
 * @param {string} expectedTotal - Expected total amount (e.g., "$159.98")
 */
Cypress.Commands.add('verifyCartTotal', (expectedTotal) => {
    // Navigate to cart page if not already there
    cy.url().then((url) => {
        if (!url.includes('/cart')) {
            cy.visit('/cart');
        }
    });
    
    // Wait for cart page to load and verify subtotal
    cy.get('[data-testid="cart-page"]', { timeout: 10000 }).should('be.visible');
    cy.get('[data-testid="loading"]').should('not.exist');
    cy.get('[data-testid="subtotal"]').should('contain.text', expectedTotal);
});

/**
 * Remove specific product from cart using remove button
 * @param {string|number} productId - ID of product to remove
 */
Cypress.Commands.add('removeProductFromCart', (productId) => {
    const itemId = productId.toString();
    
    // Navigate to cart page if not already there
    cy.url().then((url) => {
        if (!url.includes('/cart')) {
            cy.visit('/cart');
        }
    });
    
    // Wait for cart page to load
    cy.get('[data-testid="cart-page"]', { timeout: 10000 }).should('be.visible');
    cy.get('[data-testid="loading"]').should('not.exist');
    
    // Verify item exists before attempting to remove
    cy.get(`[data-testid="cart-item-${itemId}"]`).should('exist');
    
    // Click remove button
    cy.get(`[data-testid="remove-${itemId}"]`).click();
    
    // Verify item is removed
    cy.get(`[data-testid="cart-item-${itemId}"]`).should('not.exist');
});

/**
 * Update cart item quantity using quantity selector
 * @param {string|number} productId - ID of product to update
 * @param {string|number} quantity - New quantity (0-5)
 */
Cypress.Commands.add('updateCartQuantity', (productId, quantity) => {
    const itemId = productId.toString();
    const newQuantity = quantity.toString();
    
    // Navigate to cart page if not already there
    cy.url().then((url) => {
        if (!url.includes('/cart')) {
            cy.visit('/cart');
        }
    });
    
    // Wait for cart page to load
    cy.get('[data-testid="cart-page"]', { timeout: 10000 }).should('be.visible');
    cy.get('[data-testid="loading"]').should('not.exist');
    
    // Verify item exists before attempting to update
    cy.get(`[data-testid="cart-item-${itemId}"]`).should('exist');
    
    // Update quantity using select dropdown
    cy.get(`[data-testid="quantity-${itemId}"]`).select(newQuantity);
    
    // If quantity is 0, item should be removed
    if (parseInt(newQuantity) === 0) {
        cy.get(`[data-testid="cart-item-${itemId}"]`).should('not.exist');
    } else {
        // Otherwise verify quantity is updated
        cy.get(`[data-testid="quantity-${itemId}"]`).should('have.value', newQuantity);
    }
});

// Helper command to setup cart for testing
/**
 * Setup cart with predefined test data
 * @param {string} scenario - 'empty', 'single', 'multiple'
 */
Cypress.Commands.add('setupCartForTesting', (scenario = 'empty') => {
    switch (scenario) {
        case 'empty':
            cy.clearCart();
            break;
        case 'single':
            cy.addMultipleProductsToCart([{ id: 1, quantity: 2 }]);
            break;
        case 'multiple':
            cy.addMultipleProductsToCart([
                { id: 1, quantity: 2 },
                { id: 2, quantity: 1 },
                { id: 3, quantity: 3 }
            ]);
            break;
        default:
            cy.clearCart();
    }
});

// Helper command to calculate expected cart total
/**
 * Calculate expected cart total from localStorage
 * @returns {Cypress.Chainable<number>} Total amount
 */
Cypress.Commands.add('getExpectedCartTotal', () => {
    return cy.window().then((win) => {
        const cart = JSON.parse(win.localStorage.getItem('cart') || '[]');
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return total;
    });
});

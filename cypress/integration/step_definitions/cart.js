import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import CartPage from '../../pages/CartPage';
import ProductPage from '../../pages/ProductPage';
import HomePage from '../../pages/HomePage';

// Helper method to add products to cart via UI
const addProductToCartViaUI = (productId, quantity = 1) => {
    // Navigate to homepage first
    HomePage.visit();
    
    // Click on the product to go to product page
    cy.get(`[data-testid="view-product-${productId}"]`).click();
    
    // Select quantity and add to cart (this redirects to cart page)
    ProductPage.selectQuantity(quantity);
    ProductPage.addToCart();
    
    // We should now be on the cart page with the item
};

// Helper method to add multiple products via UI
const addMultipleProductsViaUI = (products) => {
    // Add first product
    const firstProduct = products[0];
    cy.log(`Adding first product: ID ${firstProduct.id}, Quantity ${firstProduct.quantity}`);
    addProductToCartViaUI(firstProduct.id, firstProduct.quantity);
    
    // Debug: Check cart after first product
    cy.window().then((win) => {
        const cartAfterFirst = win.localStorage.getItem('cart');
        cy.log('Cart after first product:', cartAfterFirst);
    });
    
    // Add remaining products one by one
    for (let i = 1; i < products.length; i++) {
        const product = products[i];
        cy.log(`Adding product ${i + 1}: ID ${product.id}, Quantity ${product.quantity}`);
        
        // Go back to homepage using Continue Shopping button (proper navigation)
        cy.get('[data-testid="continue-shopping"]').first().click();
        
        // Navigate to product page and add to cart
        cy.get(`[data-testid="view-product-${product.id}"]`).click();
        ProductPage.selectQuantity(product.quantity);
        ProductPage.addToCart(); // Redirects back to cart
        
        // Debug: Check cart after this product
        cy.window().then((win) => {
            const cartAfterProduct = win.localStorage.getItem('cart');
            cy.log(`Cart after product ${i + 1}:`, cartAfterProduct);
        });
        
        // Verify we're on cart page
        cy.url().should('include', '/cart');
    }
};

// Background Steps
Given('I am on the cart page', () => {
    // Only visit if we're not already setting up cart state in the scenario
    cy.url().then((url) => {
        if (!url.includes('/cart')) {
            CartPage.visit();
        }
    });
});

// Empty Cart Steps
Given('the cart is empty', () => {
    // Ensure cart is empty by clearing localStorage BEFORE visiting page
    cy.clearLocalStorage();
    CartPage.visit();
    CartPage.verifyEmptyCart();
});

Then('I should see the empty cart message', () => {
    CartPage.verifyEmptyCart();
});

Then('I should see the continue shopping button', () => {
    CartPage.verifyContinueShoppingButton();
});

Then('I should not see the cart items container', () => {
    CartPage.elements.cartItemsContainer().should('not.exist');
});

Then('I should not see the proceed to checkout button', () => {
    CartPage.elements.proceedToCheckoutBtn().should('not.exist');
});

// Cart with Items Steps - All using UI approach
Given('the cart contains items', () => {
    addMultipleProductsViaUI([
        { id: 1, quantity: 2 },
        { id: 2, quantity: 1 }
    ]);
    CartPage.verifyCartHasItems();
});

Given('the cart contains a product with id {string}', (itemId) => {
    addProductToCartViaUI(parseInt(itemId), 2);
    CartPage.verifyCartItemExists(itemId);
});

Given('the cart contains a product with id {string} and quantity {string}', (itemId, quantity) => {
    addProductToCartViaUI(parseInt(itemId), parseInt(quantity));
    CartPage.verifyCartItemExists(itemId);
    CartPage.verifyItemQuantity(itemId, quantity);
});

Given('the cart contains a product with id {string}, price {string} and quantity {string}', (itemId, price, quantity) => {
    addProductToCartViaUI(parseInt(itemId), parseInt(quantity));
    CartPage.verifyCartItemExists(itemId);
    CartPage.verifyItemQuantity(itemId, quantity);
    CartPage.verifyItemPrice(itemId, price);
});

Given('the cart contains only one product with id {string}', (itemId) => {
    addProductToCartViaUI(parseInt(itemId), 1);
    CartPage.verifyCartItemCount(1);
    CartPage.verifyCartItemExists(itemId);
});

Given('the cart contains products with ids {string}', (itemIds) => {
    const ids = itemIds.split(',').map(id => parseInt(id.trim()));
    const products = ids.map(id => ({ id: id, quantity: 1 }));
    addMultipleProductsViaUI(products);
    CartPage.verifyMultipleItems(ids);
});

Given('the cart contains multiple items:', (dataTable) => {
    const products = dataTable.hashes().map(row => ({
        id: parseInt(row.id),
        quantity: parseInt(row.quantity)
    }));
    
    // Debug: Log the products we're trying to add
    cy.log('Adding products:', JSON.stringify(products));
    
    addMultipleProductsViaUI(products);
    
    // Debug: Check localStorage after adding
    cy.window().then((win) => {
        const cartData = win.localStorage.getItem('cart');
        cy.log('Cart in localStorage:', cartData);
    });
    
    products.forEach(product => {
        CartPage.verifyCartItemExists(product.id.toString());
        
        // Debug: Log what quantity we're checking for
        cy.log(`Checking quantity for item ${product.id}: expecting ${product.quantity}`);
        
        // Check the actual quantity value in the DOM
        cy.get(`[data-testid="quantity-${product.id}"]`).then($select => {
            cy.log(`Actual quantity value in DOM: ${$select.val()}`);
        });
        
        CartPage.verifyItemQuantity(product.id.toString(), product.quantity.toString());
    });
});

Then('I should see the cart items container', () => {
    CartPage.verifyCartHasItems();
});

Then('I should see the cart summary', () => {
    CartPage.verifyCartSummary();
});

Then('I should see the subtotal', () => {
    CartPage.elements.subtotal().should('be.visible');
});

Then('I should see the proceed to checkout button', () => {
    CartPage.verifyProceedToCheckoutButton();
});

Then('I should not see the empty cart message', () => {
    CartPage.elements.emptyCart().should('not.exist');
});

Then('I should see the cart item with id {string}', (itemId) => {
    CartPage.verifyCartItemExists(itemId);
});

Then('I should see the item price for product {string}', (itemId) => {
    CartPage.getItemPrice(itemId).should('be.visible');
});

Then('I should see the quantity selector for product {string}', (itemId) => {
    CartPage.getQuantitySelect(itemId).should('be.visible');
});

Then('I should see the remove button for product {string}', (itemId) => {
    CartPage.getRemoveButton(itemId).should('be.visible');
});

// Quantity Modification Steps
When('I change the quantity of item {string} to {string}', (itemId, newQuantity) => {
    CartPage.updateItemQuantity(itemId, newQuantity);
});

Then('the quantity of item {string} should be {string}', (itemId, expectedQuantity) => {
    CartPage.verifyItemQuantity(itemId, expectedQuantity);
});

Then('the subtotal should be updated accordingly', () => {
    // Generic validation that subtotal exists and is visible
    CartPage.elements.subtotal().should('be.visible').and('not.be.empty');
});

Then('the cart should still contain the item {string}', (itemId) => {
    CartPage.verifyCartItemExists(itemId);
});

// Item Removal Steps
When('I click the remove button for item {string}', (itemId) => {
    CartPage.removeItem(itemId);
});

Then('the item {string} should be removed from the cart', (itemId) => {
    CartPage.verifyCartItemNotExists(itemId);
});

Then('I should not see the cart item with id {string}', (itemId) => {
    CartPage.verifyCartItemNotExists(itemId);
});

Then('the cart should be empty', () => {
    CartPage.verifyCartIsEmpty();
});

Then('I should still see cart items with ids {string}', (itemIds) => {
    const ids = itemIds.split(',').map(id => id.trim());
    ids.forEach(id => {
        CartPage.verifyCartItemExists(id);
    });
});

Then('I should not see cart items with ids {string}', (itemIds) => {
    const ids = itemIds.split(',').map(id => id.trim());
    ids.forEach(id => {
        CartPage.verifyCartItemNotExists(id);
    });
});

Then('the cart should contain {string} items', (expectedCount) => {
    CartPage.verifyCartItemCount(parseInt(expectedCount));
});

Then('the cart should contain {string} item', (expectedCount) => {
    CartPage.verifyCartItemCount(parseInt(expectedCount));
});

// Subtotal Calculation Steps
Then('the subtotal should show {string}', (expectedAmount) => {
    CartPage.verifySubtotal(expectedAmount);
});

Given('the subtotal shows {string}', (expectedAmount) => {
    CartPage.verifySubtotal(expectedAmount);
});

// Checkout Navigation Steps
Given('the proceed to checkout button is enabled', () => {
    CartPage.verifyProceedToCheckoutButton();
});

When('I click the proceed to checkout button', () => {
    CartPage.proceedToCheckout();
});

Then('I should be redirected to the checkout page', () => {
    cy.url().should('include', '/checkout');
});

// Continue Shopping Navigation Steps
When('I click the continue shopping button', () => {
    // Fix: There are 2 continue shopping buttons, click the first one
    cy.get('[data-testid="continue-shopping"]').first().click();
});

Then('I should be redirected to the homepage', () => {
    cy.url().should('include', '/');
    cy.url().should('not.include', '/cart');
});

// Loading States Steps
Then('the loading indicator should not be visible', () => {
    CartPage.verifyLoadingNotVisible();
});

Then('the cart page should be fully loaded', () => {
    CartPage.waitForCartToLoad();
});

Then('the quantity change should be applied immediately', () => {
    CartPage.verifyLoadingNotVisible();
});

// Multiple Items Management Steps
When('I change the quantity of item {string} to {string}', (itemId, newQuantity) => {
    CartPage.updateItemQuantity(itemId, newQuantity);
});

// Edge Cases Steps
Then('the quantity selector should show maximum value {string}', (maxValue) => {
    // Assuming we're checking the first item for simplicity
    CartPage.getQuantitySelect('1').find('option').last().should('have.value', maxValue);
});

When('I refresh the page', () => {
    cy.reload();
});

Then('I should still see the cart item with id {string}', (itemId) => {
    CartPage.verifyCartItemExists(itemId);
});

Then('the subtotal should remain correct', () => {
    CartPage.elements.subtotal().should('be.visible').and('not.be.empty');
});

// Additional validation steps for complex scenarios
Then('I should see the cart item with id {string}', (itemId) => {
    CartPage.verifyCartItemExists(itemId);
});

Given('I change the quantity of item {string} to {string}', (itemId, newQuantity) => {
    CartPage.updateItemQuantity(itemId, newQuantity);
});

When('I change the quantity of item {string} to {string}', (itemId, newQuantity) => {
    CartPage.updateItemQuantity(itemId, newQuantity);
});

And('I change the quantity of item {string} to {string}', (itemId, newQuantity) => {
    CartPage.updateItemQuantity(itemId, newQuantity);
});

And('I click the remove button for item {string}', (itemId) => {
    CartPage.removeItem(itemId);
});

And('the subtotal shows {string}', (expectedAmount) => {
    CartPage.verifySubtotal(expectedAmount);
});

And('I should not see the cart items container', () => {
    CartPage.elements.cartItemsContainer().should('not.exist');
});

And('I should not see the proceed to checkout button', () => {
    CartPage.elements.proceedToCheckoutBtn().should('not.exist');
});

And('I should see the continue shopping button', () => {
    CartPage.verifyContinueShoppingButton();
});

And('I should see the cart items container', () => {
    CartPage.verifyCartHasItems();
});

And('I should see the cart summary', () => {
    CartPage.verifyCartSummary();
});

And('I should see the subtotal', () => {
    CartPage.elements.subtotal().should('be.visible');
});

And('I should see the proceed to checkout button', () => {
    CartPage.verifyProceedToCheckoutButton();
});

And('I should not see the empty cart message', () => {
    CartPage.elements.emptyCart().should('not.exist');
});

And('I should see the item price for product {string}', (itemId) => {
    CartPage.getItemPrice(itemId).should('be.visible');
});

And('I should see the quantity selector for product {string}', (itemId) => {
    CartPage.getQuantitySelect(itemId).should('be.visible');
});

And('I should see the remove button for product {string}', (itemId) => {
    CartPage.getRemoveButton(itemId).should('be.visible');
});

And('the subtotal should be updated accordingly', () => {
    CartPage.elements.subtotal().should('be.visible').and('not.be.empty');
});

And('the cart should still contain the item {string}', (itemId) => {
    CartPage.verifyCartItemExists(itemId);
});

And('I should not see the cart item with id {string}', (itemId) => {
    CartPage.verifyCartItemNotExists(itemId);
});

And('I should still see cart items with ids {string}', (itemIds) => {
    const ids = itemIds.split(',').map(id => id.trim());
    ids.forEach(id => {
        CartPage.verifyCartItemExists(id);
    });
});

And('the cart should contain {string} items', (expectedCount) => {
    CartPage.verifyCartItemCount(parseInt(expectedCount));
});

And('the cart should contain {string} item', (expectedCount) => {
    CartPage.verifyCartItemCount(parseInt(expectedCount));
});

And('the quantity of item {string} should be {string}', (itemId, expectedQuantity) => {
    CartPage.verifyItemQuantity(itemId, expectedQuantity);
});

And('the subtotal should show {string}', (expectedAmount) => {
    CartPage.verifySubtotal(expectedAmount);
});
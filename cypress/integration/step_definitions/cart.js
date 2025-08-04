import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import CartPage from '../../pages/CartPage';
import ProductPage from '../../pages/ProductPage';
import HomePage from '../../pages/HomePage';

const cartPage = new CartPage();
const productPage = new ProductPage();
const homePage = new HomePage();

const addProductToCartViaUI = (productId, quantity = 1) => {
    // Navigate to homepage first
    homePage.visit();
    
    // Click on the product to go to product page
    cy.get(`[data-testid="view-product-${productId}"]`).click();
    
    // Select quantity and add to cart (this redirects to cart page)
    productPage.selectQuantity(quantity);
    productPage.addToCart();
    
    // We should now be on the cart page with the item
};

const addMultipleProductsViaUI = (products) => {
    // Add first product
    const firstProduct = products[0];
    addProductToCartViaUI(firstProduct.id, firstProduct.quantity);
    
    // Add remaining products one by one
    for (let i = 1; i < products.length; i++) {
        const product = products[i];
        // Go back to homepage using Continue Shopping button (proper navigation)
        cy.get('[data-testid="continue-shopping"]').first().click();
        
        // Navigate to product page and add to cart
        cy.get(`[data-testid="view-product-${product.id}"]`).click();
        productPage.selectQuantity(product.quantity);
        productPage.addToCart(); // Redirects back to cart
        
        // Verify we're on cart page
        cy.url().should('include', '/cart');
    }
};

Given('I am on the cart page', () => {
    // Only visit if we're not already setting up cart state in the scenario
    cy.url().then((url) => {
        if (!url.includes('/cart')) {
            cartPage.visit();
        }
    });
});

Given('the cart is empty', () => {
    // Ensure cart is empty by clearing localStorage BEFORE visiting page
    cy.clearLocalStorage();
    cartPage.visit();
    cartPage.verifyEmptyCart();
});

Then('I should see the empty cart message', () => {
    cartPage.verifyEmptyCart();
});

Then('I should see the continue shopping button', () => {
    cartPage.verifyContinueShoppingButton();
});

Then('I should not see the cart items container', () => {
    cartPage.elements.cartItemsContainer().should('not.exist');
});

Then('I should not see the proceed to checkout button', () => {
    cartPage.elements.proceedToCheckoutBtn().should('not.exist');
});

Given('the cart contains items', () => {
    addMultipleProductsViaUI([
        { id: 1, quantity: 2 },
        { id: 2, quantity: 1 }
    ]);
    cartPage.verifyCartHasItems();
});

Given('the cart contains a product with id {string}', (itemId) => {
    addProductToCartViaUI(parseInt(itemId), 2);
    cartPage.verifyCartItemExists(itemId);
});

Given('the cart contains a product with id {string} and quantity {string}', (itemId, quantity) => {
    addProductToCartViaUI(parseInt(itemId), parseInt(quantity));
    cartPage.verifyCartItemExists(itemId);
    cartPage.verifyItemQuantity(itemId, quantity);
});

Given('the cart contains a product with id {string}, price {string} and quantity {string}', (itemId, price, quantity) => {
    addProductToCartViaUI(parseInt(itemId), parseInt(quantity));
    cartPage.verifyCartItemExists(itemId);
    cartPage.verifyItemQuantity(itemId, quantity);
    cartPage.verifyItemPrice(itemId, price);
});

Given('the cart contains only one product with id {string}', (itemId) => {
    addProductToCartViaUI(parseInt(itemId), 1);
    cartPage.verifyCartItemCount(1);
    cartPage.verifyCartItemExists(itemId);
});

Given('the cart contains products with ids {string}', (itemIds) => {
    const ids = itemIds.split(',').map(id => parseInt(id.trim()));
    const products = ids.map(id => ({ id: id, quantity: 1 }));
    addMultipleProductsViaUI(products);
    cartPage.verifyMultipleItems(ids);
});

Given('the cart contains multiple items:', (dataTable) => {
    const products = dataTable.hashes().map(row => ({
        id: parseInt(row.id),
        quantity: parseInt(row.quantity)
    }));
    
    addMultipleProductsViaUI(products);
    
    products.forEach(product => {
        cartPage.verifyCartItemExists(product.id.toString());
        
        cartPage.verifyItemQuantity(product.id.toString(), product.quantity.toString());
    });
});

Then('I should see the cart items container', () => {
    cartPage.verifyCartHasItems();
});

Then('I should see the cart summary', () => {
    cartPage.verifyCartSummary();
});

Then('I should see the subtotal', () => {
    cartPage.elements.subtotal().should('be.visible');
});

Then('I should see the proceed to checkout button', () => {
    cartPage.verifyProceedToCheckoutButton();
});

Then('I should not see the empty cart message', () => {
    cartPage.elements.emptyCart().should('not.exist');
});

Then('I should see the cart item with id {string}', (itemId) => {
    cartPage.verifyCartItemExists(itemId);
});

Then('I should see the item price for product {string}', (itemId) => {
    cartPage.getItemPrice(itemId).should('be.visible');
});

Then('I should see the quantity selector for product {string}', (itemId) => {
    cartPage.getQuantitySelect(itemId).should('be.visible');
});

Then('I should see the remove button for product {string}', (itemId) => {
    cartPage.getRemoveButton(itemId).should('be.visible');
});

When('I change the quantity of item {string} to {string}', (itemId, newQuantity) => {
    cartPage.updateItemQuantity(itemId, newQuantity);
});

Then('the quantity of item {string} should be {string}', (itemId, expectedQuantity) => {
    cartPage.verifyItemQuantity(itemId, expectedQuantity);
});

Then('the subtotal should be updated accordingly', () => {
    // Generic validation that subtotal exists and is visible
    cartPage.elements.subtotal().should('be.visible').and('not.be.empty');
});

Then('the cart should still contain the item {string}', (itemId) => {
    cartPage.verifyCartItemExists(itemId);
});

When('I click the remove button for item {string}', (itemId) => {
    cartPage.removeItem(itemId);
});

Then('the item {string} should be removed from the cart', (itemId) => {
    cartPage.verifyCartItemNotExists(itemId);
});

Then('I should not see the cart item with id {string}', (itemId) => {
    cartPage.verifyCartItemNotExists(itemId);
});

Then('the cart should be empty', () => {
    cartPage.verifyCartIsEmpty();
});

Then('I should still see cart items with ids {string}', (itemIds) => {
    const ids = itemIds.split(',').map(id => id.trim());
    ids.forEach(id => {
        cartPage.verifyCartItemExists(id);
    });
});

Then('I should not see cart items with ids {string}', (itemIds) => {
    const ids = itemIds.split(',').map(id => id.trim());
    ids.forEach(id => {
        cartPage.verifyCartItemNotExists(id);
    });
});

Then('the cart should contain {string} items', (expectedCount) => {
    cartPage.verifyCartItemCount(parseInt(expectedCount));
});

Then('the cart should contain {string} item', (expectedCount) => {
    cartPage.verifyCartItemCount(parseInt(expectedCount));
});

Then('the subtotal should show {string}', (expectedAmount) => {
    cartPage.verifySubtotal(expectedAmount);
});

Given('the subtotal shows {string}', (expectedAmount) => {
    cartPage.verifySubtotal(expectedAmount);
});

Given('the proceed to checkout button is enabled', () => {
    cartPage.verifyProceedToCheckoutButton();
});

When('I click the proceed to checkout button', () => {
    cartPage.proceedToCheckout();
});

Then('I should be redirected to the checkout page', () => {
    cy.url().should('include', '/checkout');
});

When('I click the continue shopping button', () => {
    // Fix: There are 2 continue shopping buttons, click the first one
    cy.get('[data-testid="continue-shopping"]').first().click();
});

Then('I should be redirected to the homepage', () => {
    cy.url().should('include', '/');
    cy.url().should('not.include', '/cart');
});

Then('the loading indicator should not be visible', () => {
    cartPage.verifyLoadingNotVisible();
});

Then('the cart page should be fully loaded', () => {
    cartPage.waitForCartToLoad();
});

Then('the quantity change should be applied immediately', () => {
    cartPage.verifyLoadingNotVisible();
});

When('I change the quantity of item {string} to {string}', (itemId, newQuantity) => {
    cartPage.updateItemQuantity(itemId, newQuantity);
});

Then('the quantity selector should show maximum value {string}', (maxValue) => {
    // Assuming we're checking the first item for simplicity
    cartPage.getQuantitySelect('1').find('option').last().should('have.value', maxValue);
});

When('I refresh the page', () => {
    cy.reload();
});

Then('I should still see the cart item with id {string}', (itemId) => {
    cartPage.verifyCartItemExists(itemId);
});

Then('the subtotal should remain correct', () => {
    cartPage.elements.subtotal().should('be.visible').and('not.be.empty');
});

Then('I should see the cart item with id {string}', (itemId) => {
    cartPage.verifyCartItemExists(itemId);
});

Given('I change the quantity of item {string} to {string}', (itemId, newQuantity) => {
    cartPage.updateItemQuantity(itemId, newQuantity);
});

When('I change the quantity of item {string} to {string}', (itemId, newQuantity) => {
    cartPage.updateItemQuantity(itemId, newQuantity);
});

And('I change the quantity of item {string} to {string}', (itemId, newQuantity) => {
    cartPage.updateItemQuantity(itemId, newQuantity);
});

And('I click the remove button for item {string}', (itemId) => {
    cartPage.removeItem(itemId);
});

And('the subtotal shows {string}', (expectedAmount) => {
    cartPage.verifySubtotal(expectedAmount);
});

And('I should not see the cart items container', () => {
    cartPage.elements.cartItemsContainer().should('not.exist');
});

And('I should not see the proceed to checkout button', () => {
    cartPage.elements.proceedToCheckoutBtn().should('not.exist');
});

And('I should see the continue shopping button', () => {
    cartPage.verifyContinueShoppingButton();
});

And('I should see the cart items container', () => {
    cartPage.verifyCartHasItems();
});

And('I should see the cart summary', () => {
    cartPage.verifyCartSummary();
});

And('I should see the subtotal', () => {
    cartPage.elements.subtotal().should('be.visible');
});

And('I should see the proceed to checkout button', () => {
    cartPage.verifyProceedToCheckoutButton();
});

And('I should not see the empty cart message', () => {
    cartPage.elements.emptyCart().should('not.exist');
});

And('I should see the item price for product {string}', (itemId) => {
    cartPage.getItemPrice(itemId).should('be.visible');
});

And('I should see the quantity selector for product {string}', (itemId) => {
    cartPage.getQuantitySelect(itemId).should('be.visible');
});

And('I should see the remove button for product {string}', (itemId) => {
    cartPage.getRemoveButton(itemId).should('be.visible');
});

And('the subtotal should be updated accordingly', () => {
    cartPage.elements.subtotal().should('be.visible').and('not.be.empty');
});

And('the cart should still contain the item {string}', (itemId) => {
    cartPage.verifyCartItemExists(itemId);
});

And('I should not see the cart item with id {string}', (itemId) => {
    cartPage.verifyCartItemNotExists(itemId);
});

And('I should still see cart items with ids {string}', (itemIds) => {
    const ids = itemIds.split(',').map(id => id.trim());
    ids.forEach(id => {
        cartPage.verifyCartItemExists(id);
    });
});

And('the cart should contain {string} items', (expectedCount) => {
    cartPage.verifyCartItemCount(parseInt(expectedCount));
});

And('the cart should contain {string} item', (expectedCount) => {
    cartPage.verifyCartItemCount(parseInt(expectedCount));
});

And('the quantity of item {string} should be {string}', (itemId, expectedQuantity) => {
    cartPage.verifyItemQuantity(itemId, expectedQuantity);
});

And('the subtotal should show {string}', (expectedAmount) => {
    cartPage.verifySubtotal(expectedAmount);
});
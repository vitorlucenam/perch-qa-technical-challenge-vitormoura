import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import HomePage from '../../pages/HomePage';
import ProductPage from '../../pages/ProductPage';
import CartPage from '../../pages/CartPage';
import AddressPage from '../../pages/AddressPage';
import PaymentPage from '../../pages/PaymentPage';

const homePage = new HomePage();
const productPage = new ProductPage();
const cartPage = new CartPage();
const addressPage = new AddressPage();
const paymentPage = new PaymentPage();

// Simple test data
const testAddress = {
    firstName: 'John',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States'
};

const testPayment = {
    cardHolder: 'John Doe',
    cardNumber: '4111111111111111',
    expiry: '12/25',
    cvv: '123'
};

// Background Steps
Given('I am on the homepage', () => {
    homePage.visit();
    homePage.verifyMainContent();
});

Given('I start with an empty cart', () => {
    cy.clearLocalStorage();
    homePage.visit();
});

// Product Selection Steps
When('I view product {string} and add it to cart', (productId) => {
    cy.get(`[data-testid="view-product-${productId}"]`).click();
    productPage.selectQuantity(1);
    productPage.addToCart();
});

When('I add multiple products to my cart', () => {
    // Add first product
    cy.get('[data-testid="view-product-1"]').click();
    productPage.selectQuantity(2);
    productPage.addToCart();
    
    // Continue shopping and add second product
    cy.get('[data-testid="continue-shopping"]').first().click();
    cy.get('[data-testid="view-product-2"]').click();
    productPage.selectQuantity(1);
    productPage.addToCart();
});

When('I add a product to cart', () => {
    cy.get('[data-testid="view-product-1"]').click();
    productPage.selectQuantity(1);
    productPage.addToCart();
});

// Cart Verification Steps
Then('I should see the product in my cart', () => {
    cartPage.verifyCartHasItems();
});

// Checkout Steps - Simplified
When('I proceed to checkout with valid data', () => {
    cartPage.proceedToCheckout();
    addressPage.fillAddressForm(testAddress);
    addressPage.clickContinueToPayment();
    paymentPage.fillPaymentForm(testPayment);
    paymentPage.clickPlaceOrder();
});

When('I complete the full checkout process', () => {
    cartPage.proceedToCheckout();
    addressPage.fillAddressForm(testAddress);
    addressPage.clickContinueToPayment();
    paymentPage.fillPaymentForm(testPayment);
    paymentPage.clickPlaceOrder();
});

When('I proceed through checkout', () => {
    cartPage.proceedToCheckout();
});

When('I fill address and payment details', () => {
    addressPage.fillAddressForm(testAddress);
    addressPage.clickContinueToPayment();
    paymentPage.fillPaymentForm(testPayment);
});

When('I complete the order', () => {
    paymentPage.clickPlaceOrder();
});

// Success Validation Steps - Simple and Reliable
Then('I should see successful order completion', () => {
    // Main validation - the success message indicates end-to-end flow worked
    cy.contains('Thank You for Your Purchase!').should('be.visible');
});

Then('I should reach the success page', () => {
    // Simple validation by success message
    cy.contains('Thank You for Your Purchase!').should('be.visible');
});

Then('I should see {string} message', (message) => {
    cy.contains(message).should('be.visible');
});

Then('the order should be processed successfully', () => {
    // Final validation - success message confirms complete flow
    cy.contains('Thank You for Your Purchase!').should('be.visible');
});
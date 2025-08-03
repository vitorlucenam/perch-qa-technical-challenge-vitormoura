import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import HomePage from '../../pages/HomePage';

Given('I am on the homepage', () => {
    HomePage.visit();
});

Then('I should see the main content', () => {
    HomePage.verifyMainContent();
});

Then('I should see the full list of products', () => {
    HomePage.verifyProductsGrid();
});

// Sorting Steps
Given('the sort button shows {string}', (expectedText) => {
    HomePage.verifySortButtonText(expectedText);
});

When('I click the sort price button', () => {
    HomePage.clickSortButton();
});

When('I click the sort price button again', () => {
    HomePage.clickSortButton();
});

Then('the products should be sorted by price in ascending order', () => {
    HomePage.verifyPricesSortedAscending();
});

Then('the products should be sorted by price in descending order', () => {
    HomePage.verifyPricesSortedDescending();
});

Then('the sort button should show {string}', (expectedText) => {
    HomePage.verifySortButtonText(expectedText);
});

// Navigation Steps
Given('I can see the product list', () => {
    HomePage.verifyProductsGrid();
});

When('I click on a {string} button', (buttonText) => {
    HomePage.clickViewDetailsButton(0);
});

Then('I should be redirected to the product detail page', () => {
    cy.url().should('include', '/product/');
});

Then('I should see the product information', () => {
    cy.get('[data-testid="product-detail-page"]').should('be.visible');
});

// Product Display Steps
Then('I should see a list of products', () => {
    HomePage.verifyProductsGrid();
    HomePage.verifyAtLeastOneProduct();
});

Then('each product should display an image', () => {
    HomePage.elements.productImages().should('be.visible');
});

Then('each product should display a title', () => {
    HomePage.elements.productTitles().should('be.visible');
});

Then('each product should display a price', () => {
    HomePage.elements.productPrices().should('be.visible');
});

// Loading and Count Steps
Then('the product list should be visible', () => {
    HomePage.verifyProductsGrid();
});

Then('the products should be displayed in the default order', () => {
    HomePage.verifySortButtonText('Sort by Price ↑');
});

When('the product list loads', () => {
    HomePage.verifyProductsGrid();
});

Then('I should see exactly {int} products', (expectedCount) => {
    HomePage.verifyProductCount(expectedCount);
});

Then('all products should be displayed', () => {
    HomePage.verifyProductElements();
});

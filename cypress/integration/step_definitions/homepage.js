import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import HomePage from '../../pages/HomePage';

const homePage = new HomePage();

Given('I am on the homepage', () => {
    homePage.visit();
});

Then('I should see the main content', () => {
    homePage.verifyMainContent();
});

Then('I should see the full list of products', () => {
    homePage.verifyProductsGrid();
});

// Sorting Steps
Given('the sort button shows {string}', (expectedText) => {
    homePage.verifySortButtonText(expectedText);
});

When('I click the sort price button', () => {
    homePage.clickSortButton();
});

When('I click the sort price button again', () => {
    homePage.clickSortButton();
});

Then('the products should be sorted by price in ascending order', () => {
    homePage.verifyPricesSortedAscending();
});

Then('the products should be sorted by price in descending order', () => {
    homePage.verifyPricesSortedDescending();
});

Then('the sort button should show {string}', (expectedText) => {
    homePage.verifySortButtonText(expectedText);
});

// Navigation Steps
Given('I can see the product list', () => {
    homePage.verifyProductsGrid();
});

When('I click on a {string} button', (buttonText) => {
    homePage.clickViewDetailsButton(0);
});

Then('I should be redirected to the product detail page', () => {
    cy.url().should('include', '/product/');
});

Then('I should see the product information', () => {
    cy.get('[data-testid="product-detail-page"]').should('be.visible');
});

// Product Display Steps
Then('I should see a list of products', () => {
    homePage.verifyProductsGrid();
    homePage.verifyAtLeastOneProduct();
});

Then('each product should display an image', () => {
    homePage.elements.productImages().should('be.visible');
});

Then('each product should display a title', () => {
    homePage.elements.productTitles().should('be.visible');
});

Then('each product should display a price', () => {
    homePage.elements.productPrices().should('be.visible');
});

// Loading and Count Steps
Then('the product list should be visible', () => {
    homePage.verifyProductsGrid();
});

Then('the products should be displayed in the default order', () => {
    homePage.verifySortButtonText('Sort by Price ↑');
});

When('the product list loads', () => {
    homePage.verifyProductsGrid();
});

Then('I should see exactly {int} products', (expectedCount) => {
    homePage.verifyProductCount(expectedCount);
});

Then('all products should be displayed', () => {
    homePage.verifyProductElements();
});

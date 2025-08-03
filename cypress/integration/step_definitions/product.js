import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ProductPage from '../../pages/ProductPage';
import HomePage from '../../pages/HomePage';

// Background and Navigation Steps
Given('I can see the product list', () => {
    HomePage.verifyProductsGrid();
});

When('I click on a product item', () => {
    cy.get('[data-testid^="view-product-"]').first().click();
});

Then('I should be on the product detail page', () => {
    cy.url().should('include', '/product/');
    ProductPage.verifyProductContainer();
});

Given('I am on a product detail page', () => {
    ProductPage.visit('1');
});

Given('I navigate directly to a product page', () => {
    ProductPage.visit('1');
});

// Product Details Viewing Steps
Then('I should see the product title', () => {
    ProductPage.verifyProductTitle();
});

Then('I should see the product image', () => {
    ProductPage.verifyProductImage();
});

Then('I should see the product price', () => {
    ProductPage.verifyProductPrice();
});

Then('I should see the product description', () => {
    ProductPage.verifyProductDescription();
});

Then('I should see the quantity selector', () => {
    ProductPage.verifyQuantitySelector();
});

Then('I should see the add to cart button', () => {
    ProductPage.verifyAddToCartButtonEnabled();
});

When('the page loads completely', () => {
    cy.wait(1000);
});

Then('the product image should be visible', () => {
    ProductPage.verifyProductImage();
});

Then('the product image should have a valid source', () => {
    ProductPage.elements.productImage().should('have.attr', 'src').and('not.be.empty');
});

Then('the product title should not be empty', () => {
    ProductPage.elements.productTitle().should('not.be.empty');
});

Then('the product price should not be empty', () => {
    ProductPage.elements.productPrice().should('not.be.empty');
});

Then('the product description should be visible', () => {
    ProductPage.verifyProductDescription();
});

// Quantity Selection Steps
When('I select quantity {string} from the dropdown', (quantity) => {
    ProductPage.selectQuantity(quantity);
});

Then('the quantity field should show {string}', (expectedQuantity) => {
    ProductPage.verifyQuantityValue(expectedQuantity);
});

Given('the quantity is set to {string}', (quantity) => {
    ProductPage.selectQuantity(quantity);
});

When('I select quantity {string}', (quantity) => {
    ProductPage.selectQuantity(quantity);
});

Then('the quantity should be set to {string}', (expectedQuantity) => {
    ProductPage.verifyQuantityValue(expectedQuantity);
});

Then('the quantity dropdown should be visible', () => {
    ProductPage.elements.quantitySelector().should('be.visible');
});

Then('the quantity dropdown should have options from 1 to 5', () => {
    ProductPage.elements.quantitySelector().find('option').should('have.length', 5);
    ProductPage.elements.quantitySelector().find('option').first().should('have.value', '1');
    ProductPage.elements.quantitySelector().find('option').last().should('have.value', '5');
});

// Add to Cart Steps
When('I click the add to cart button', () => {
    ProductPage.addToCart();
});

Then('I should be redirected to the cart page', () => {
    ProductPage.verifyAddToCartSuccess();
});

Then('the add to cart button should be visible', () => {
    ProductPage.elements.addToCartBtn().should('be.visible');
});

Then('the add to cart button should be enabled', () => {
    ProductPage.verifyAddToCartButtonEnabled();
});

// Cart Navigation Steps - removed obsolete steps since cart navigation happens automatically

// Information Validation Steps
Then('the product price should be displayed in a valid currency format', () => {
    ProductPage.elements.productPrice().should('contain.text', '$');
    ProductPage.elements.productPrice().invoke('text').should('match', /^\$\d+\.\d{2}$/);
});

Then('the product price should be a positive value', () => {
    ProductPage.elements.productPrice().invoke('text').then((priceText) => {
        const price = parseFloat(priceText.replace('$', ''));
        expect(price).to.be.greaterThan(0);
    });
});

Then('the product title should be meaningful', () => {
    ProductPage.elements.productTitle().invoke('text').should('have.length.greaterThan', 3);
});

Then('the product title should not contain only numbers or special characters', () => {
    ProductPage.elements.productTitle().invoke('text').then((title) => {
        expect(title).to.match(/[a-zA-Z]/);
    });
});

Then('the default quantity should be {string}', (expectedQuantity) => {
    ProductPage.verifyQuantityValue(expectedQuantity);
});

Then('the quantity field should accept numeric input only', () => {
    ProductPage.elements.quantitySelector().should('be.visible');
    // Dropdown selectors don't have type attribute - this validates it's a select element
    ProductPage.elements.quantitySelector().should('have.prop', 'tagName', 'SELECT');
});

When('the page finishes loading', () => {
    cy.get('[data-testid="loading"]').should('not.exist');
});

Then('all product elements should be present', () => {
    ProductPage.verifyAllProductDetails();
    ProductPage.verifyQuantitySelector();
    ProductPage.verifyAddToCartButtonEnabled();
});

Then('no loading indicators should be visible', () => {
    cy.get('[data-testid="loading"]').should('not.exist');
    cy.get('.loading').should('not.exist');
});

Then('there should be no error messages displayed', () => {
    cy.get('[data-testid="error"]').should('not.exist');
    cy.get('.error').should('not.exist');
});

// Removed cart count validation as it's not part of current implementation
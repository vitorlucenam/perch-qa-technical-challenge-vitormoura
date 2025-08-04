import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import ProductPage from '../../pages/ProductPage';
import HomePage from '../../pages/HomePage';

const productPage = new ProductPage();
const homePage = new HomePage();

Given('I can see the product list', () => {
    homePage.verifyProductsGrid();
});

When('I click on a product item', () => {
    cy.get('[data-testid^="view-product-"]').first().click();
});

Then('I should be on the product detail page', () => {
    cy.url().should('include', '/product/');
    productPage.verifyProductContainer();
});

Given('I am on a product detail page', () => {
    productPage.visit('1');
});

Given('I navigate directly to a product page', () => {
    productPage.visit('1');
});

Then('I should see the product title', () => {
    productPage.verifyProductTitle();
});

Then('I should see the product image', () => {
    productPage.verifyProductImage();
});

Then('I should see the product price', () => {
    productPage.verifyProductPrice();
});

Then('I should see the product description', () => {
    productPage.verifyProductDescription();
});

Then('I should see the quantity selector', () => {
    productPage.verifyQuantitySelector();
});

Then('I should see the add to cart button', () => {
    productPage.verifyAddToCartButtonEnabled();
});

When('the page loads completely', () => {
    cy.wait(1000);
});

Then('the product image should be visible', () => {
    productPage.verifyProductImage();
});

Then('the product image should have a valid source', () => {
    productPage.elements.productImage().should('have.attr', 'src').and('not.be.empty');
});

Then('the product title should not be empty', () => {
    productPage.elements.productTitle().should('not.be.empty');
});

Then('the product price should not be empty', () => {
    productPage.elements.productPrice().should('not.be.empty');
});

Then('the product description should be visible', () => {
    productPage.verifyProductDescription();
});

When('I select quantity {string} from the dropdown', (quantity) => {
    productPage.selectQuantity(quantity);
});

Then('the quantity field should show {string}', (expectedQuantity) => {
    productPage.verifyQuantityValue(expectedQuantity);
});

Given('the quantity is set to {string}', (quantity) => {
    productPage.selectQuantity(quantity);
});

When('I select quantity {string}', (quantity) => {
    productPage.selectQuantity(quantity);
});

Then('the quantity should be set to {string}', (expectedQuantity) => {
    productPage.verifyQuantityValue(expectedQuantity);
});

Then('the quantity dropdown should be visible', () => {
    productPage.elements.quantitySelector().should('be.visible');
});

Then('the quantity dropdown should have options from 1 to 5', () => {
    productPage.elements.quantitySelector().find('option').should('have.length', 5);
    productPage.elements.quantitySelector().find('option').first().should('have.value', '1');
    productPage.elements.quantitySelector().find('option').last().should('have.value', '5');
});

When('I click the add to cart button', () => {
    productPage.addToCart();
});

Then('I should be redirected to the cart page', () => {
    productPage.verifyAddToCartSuccess();
});

Then('the add to cart button should be visible', () => {
    productPage.elements.addToCartBtn().should('be.visible');
});

Then('the add to cart button should be enabled', () => {
    productPage.verifyAddToCartButtonEnabled();
});

Then('the product price should be displayed in a valid currency format', () => {
    productPage.elements.productPrice().should('contain.text', '$');
    productPage.elements.productPrice().invoke('text').should('match', /^\$\d+\.\d{2}$/);
});

Then('the product price should be a positive value', () => {
    productPage.elements.productPrice().invoke('text').then((priceText) => {
        const price = parseFloat(priceText.replace('$', ''));
        expect(price).to.be.greaterThan(0);
    });
});

Then('the product title should be meaningful', () => {
    productPage.elements.productTitle().invoke('text').should('have.length.greaterThan', 3);
});

Then('the product title should not contain only numbers or special characters', () => {
    productPage.elements.productTitle().invoke('text').then((title) => {
        expect(title).to.match(/[a-zA-Z]/);
    });
});

Then('the default quantity should be {string}', (expectedQuantity) => {
    productPage.verifyQuantityValue(expectedQuantity);
});

Then('the quantity field should accept numeric input only', () => {
    productPage.elements.quantitySelector().should('be.visible');
    // Dropdown selectors don't have type attribute - this validates it's a select element
    productPage.elements.quantitySelector().should('have.prop', 'tagName', 'SELECT');
});

When('the page finishes loading', () => {
    cy.get('[data-testid="loading"]').should('not.exist');
});

Then('all product elements should be present', () => {
    productPage.verifyAllProductDetails();
    productPage.verifyQuantitySelector();
    productPage.verifyAddToCartButtonEnabled();
});

Then('no loading indicators should be visible', () => {
    cy.get('[data-testid="loading"]').should('not.exist');
    cy.get('.loading').should('not.exist');
});

Then('there should be no error messages displayed', () => {
    cy.get('[data-testid="error"]').should('not.exist');
    cy.get('.error').should('not.exist');
});


class ProductPage {
    elements = {
        productContainer: () => cy.get('[data-testid="product-detail-page"]'),
        productTitle: () => cy.get('[data-testid="product-name"]'),
        productImage: () => cy.get('[data-testid="product-image"]'),
        productPrice: () => cy.get('[data-testid="product-price"]'),
        productDescription: () => cy.get('[data-testid="product-description"]'),
        productInfo: () => cy.get('[data-testid="product-info"]'),
        quantitySelector: () => cy.get('[data-testid="quantity-selector"]'),
        addToCartBtn: () => cy.get('[data-testid="add-to-cart"]'),
        backToProductsBtn: () => cy.get('[data-testid="back-to-products"]'),
        cartNavBtn: () => cy.get('[data-testid="nav-to-cart"]')
    }

    visit(productId = '') {
        cy.visit(`/product/${productId}`);
    }

    verifyProductContainer() {
        this.elements.productContainer().should('be.visible');
    }

    verifyProductTitle(expectedTitle) {
        if (expectedTitle) {
            this.elements.productTitle().should('contain.text', expectedTitle);
        } else {
            this.elements.productTitle().should('be.visible').and('not.be.empty');
        }
    }

    verifyProductImage() {
        this.elements.productImage().should('be.visible').and('have.attr', 'src');
    }

    verifyProductPrice(expectedPrice) {
        if (expectedPrice) {
            this.elements.productPrice().should('contain.text', expectedPrice);
        } else {
            this.elements.productPrice().should('be.visible').and('not.be.empty');
        }
    }

    verifyProductDescription() {
        this.elements.productDescription().should('be.visible');
    }

    verifyAllProductDetails() {
        this.verifyProductContainer();
        this.verifyProductTitle();
        this.verifyProductImage();
        this.verifyProductPrice();
        this.verifyProductDescription();
    }

    getProductTitle() {
        return this.elements.productTitle().invoke('text');
    }

    getProductPrice() {
        return this.elements.productPrice().invoke('text');
    }

    selectQuantity(quantity) {
        this.elements.quantitySelector().select(quantity.toString());
    }

    verifyQuantityValue(expectedQuantity) {
        this.elements.quantitySelector().should('have.value', expectedQuantity.toString());
    }

    getQuantityValue() {
        return this.elements.quantitySelector().invoke('val');
    }

    addToCart() {
        this.elements.addToCartBtn().click();
    }

    verifyAddToCartSuccess() {
        // After clicking add to cart, user is redirected to cart page
        cy.url().should('include', '/cart');
    }

    verifyAddToCartButtonEnabled() {
        this.elements.addToCartBtn().should('be.enabled');
    }

    verifyAddToCartButtonDisabled() {
        this.elements.addToCartBtn().should('be.disabled');
    }

    navigateToCart() {
        // Navigate to cart via homepage navigation
        cy.visit('/');
        this.elements.cartNavBtn().click();
    }

    navigateToCartViaIcon() {
        // Navigate to cart via homepage navigation  
        cy.visit('/');
        this.elements.cartNavBtn().click();
    }

    addProductToCart(quantity = 1) {
        this.selectQuantity(quantity);
        this.addToCart();
        this.verifyAddToCartSuccess();
    }

    verifyQuantitySelector() {
        this.elements.quantitySelector().should('be.visible');
    }
}

export default new ProductPage();
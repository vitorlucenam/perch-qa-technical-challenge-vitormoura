class HomePage {
    elements = {
        mainContent: () => cy.get('[data-testid="home-page"]'),
        productsGrid: () => cy.get('.products-grid'),
        productCards: () => cy.get('.product-card'),
        viewDetailsButtons: () => cy.get('[data-testid^="view-product-"]'),
        sortButton: () => cy.get('[data-testid="sort-price"]'),
        searchInput: () => cy.get('[data-testid="product-search"]'),
        productImages: () => cy.get('.product-image'),
        productTitles: () => cy.get('.product-name'),
        productPrices: () => cy.get('.product-price'),
        noResultsMessage: () => cy.get('[data-testid="no-results"]')
    }

    visit() {
        cy.visit('/');
    }

    verifyMainContent() {
        this.elements.mainContent().should('be.visible');
    }

    verifyProductsGrid() {
        this.elements.productsGrid().should('be.visible');
    }

    clickSortButton() {
        this.elements.sortButton().click();
    }

    verifySortButtonText(expectedText) {
        this.elements.sortButton().should('contain.text', expectedText);
    }

    clickViewDetailsButton(index = 0) {
        this.elements.viewDetailsButtons().eq(index).click();
    }

    verifyProductElements() {
        this.elements.productCards().should('have.length.greaterThan', 0);
        this.elements.productImages().should('be.visible');
        this.elements.productTitles().should('be.visible');
        this.elements.productPrices().should('be.visible');
    }

    verifyProductCount(expectedCount) {
        this.elements.productCards().should('have.length', expectedCount);
    }

    verifyAtLeastOneProduct() {
        this.elements.productCards().should('have.length.greaterThan', 0);
    }

    getProductPrices() {
        return this.elements.productPrices().then($prices => {
            return Array.from($prices).map(el => {
                const priceText = el.textContent.replace('$', '');
                return parseFloat(priceText);
            });
        });
    }

    verifyPricesSortedAscending() {
        // Test validates CORRECT behavior (numeric sorting)
        // This will FAIL due to platform bug that uses string sorting
        this.getProductPrices().then(prices => {
            const sortedPrices = [...prices].sort((a, b) => a - b);
            expect(prices).to.deep.equal(sortedPrices);
        });
    }

    verifyPricesSortedDescending() {
        // Test validates CORRECT behavior (numeric sorting)
        // This will FAIL due to platform bug that uses string sorting
        this.getProductPrices().then(prices => {
            const sortedPrices = [...prices].sort((a, b) => b - a);
            expect(prices).to.deep.equal(sortedPrices);
        });
    }
}

export default new HomePage();
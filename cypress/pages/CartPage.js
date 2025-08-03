class CartPage {
    elements = {
        cartPage: () => cy.get('[data-testid="cart-page"]'),
        emptyCart: () => cy.get('[data-testid="empty-cart"]'),
        continueShoppingBtn: () => cy.get('[data-testid="continue-shopping"]'),
        cartItemsContainer: () => cy.get('.cart-items'),
        cartSummary: () => cy.get('[data-testid="cart-summary"]'),
        subtotal: () => cy.get('[data-testid="subtotal"]'),
        proceedToCheckoutBtn: () => cy.get('[data-testid="proceed-to-checkout"]'),
        loadingState: () => cy.get('[data-testid="loading"]')
    }

    // Dynamic selectors for cart items
    getCartItem(itemId) {
        return cy.get(`[data-testid="cart-item-${itemId}"]`);
    }

    getItemPrice(itemId) {
        return cy.get(`[data-testid="item-price-${itemId}"]`);
    }

    getQuantitySelect(itemId) {
        return cy.get(`[data-testid="quantity-${itemId}"]`);
    }

    getRemoveButton(itemId) {
        return cy.get(`[data-testid="remove-${itemId}"]`);
    }

    // Navigation methods
    visit() {
        cy.visit('/cart');
    }

    // Page validation methods
    verifyCartPage() {
        this.elements.cartPage().should('be.visible');
    }

    verifyEmptyCart() {
        this.elements.emptyCart().should('be.visible');
    }

    verifyCartHasItems() {
        this.elements.cartItemsContainer().should('be.visible');
        this.elements.cartItemsContainer().find('[data-testid^="cart-item-"]').should('have.length.greaterThan', 0);
    }

    verifyLoadingNotVisible() {
        this.elements.loadingState().should('not.exist');
    }

    verifyLoadingVisible() {
        this.elements.loadingState().should('be.visible');
    }

    // Cart item validation methods
    verifyCartItemExists(itemId) {
        this.getCartItem(itemId).should('be.visible');
    }

    verifyCartItemNotExists(itemId) {
        this.getCartItem(itemId).should('not.exist');
    }

    verifyItemPrice(itemId, expectedPrice) {
        this.getItemPrice(itemId).should('contain.text', expectedPrice);
    }

    verifyItemQuantity(itemId, expectedQuantity) {
        this.getQuantitySelect(itemId).should('have.value', expectedQuantity.toString());
    }

    // Cart item interaction methods
    updateItemQuantity(itemId, newQuantity) {
        this.getQuantitySelect(itemId).select(newQuantity.toString());
    }

    removeItem(itemId) {
        this.getRemoveButton(itemId).click();
    }

    getItemQuantity(itemId) {
        return this.getQuantitySelect(itemId).invoke('val');
    }

    getItemPriceText(itemId) {
        return this.getItemPrice(itemId).invoke('text');
    }

    // Cart summary methods
    verifyCartSummary() {
        this.elements.cartSummary().should('be.visible');
    }

    verifySubtotal(expectedAmount) {
        this.elements.subtotal().should('contain.text', expectedAmount);
    }

    getSubtotalAmount() {
        return this.elements.subtotal().invoke('text');
    }

    // Navigation methods
    continueShopping() {
        this.elements.continueShoppingBtn().click();
    }

    proceedToCheckout() {
        this.elements.proceedToCheckoutBtn().click();
    }

    verifyProceedToCheckoutButton() {
        this.elements.proceedToCheckoutBtn().should('be.visible').and('be.enabled');
    }

    verifyProceedToCheckoutButtonDisabled() {
        this.elements.proceedToCheckoutBtn().should('be.disabled');
    }

    verifyContinueShoppingButton() {
        this.elements.continueShoppingBtn().should('be.visible').and('be.enabled');
    }

    // Cart state methods
    getCartItemCount() {
        return this.elements.cartItemsContainer().find('[data-testid^="cart-item-"]').its('length');
    }

    verifyCartItemCount(expectedCount) {
        this.elements.cartItemsContainer().find('[data-testid^="cart-item-"]').should('have.length', expectedCount);
    }

    verifyCartIsEmpty() {
        this.verifyEmptyCart();
        this.elements.cartItemsContainer().should('not.exist');
    }

    verifyCartIsNotEmpty() {
        this.elements.emptyCart().should('not.exist');
        this.verifyCartHasItems();
    }

    // Multiple items operations
    removeAllItems() {
        this.elements.cartItemsContainer().find('[data-testid^="remove-"]').each(($removeBtn) => {
            cy.wrap($removeBtn).click();
        });
    }

    verifyMultipleItems(itemIds) {
        itemIds.forEach(itemId => {
            this.verifyCartItemExists(itemId);
        });
    }

    updateMultipleQuantities(itemUpdates) {
        itemUpdates.forEach(update => {
            this.updateItemQuantity(update.itemId, update.quantity);
        });
    }

    // Cart calculation methods
    calculateExpectedSubtotal(items) {
        return items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    verifyCalculatedSubtotal(items) {
        const expectedTotal = this.calculateExpectedSubtotal(items);
        this.verifySubtotal(`$${expectedTotal.toFixed(2)}`);
    }

    // Wait methods
    waitForCartToLoad() {
        this.verifyCartPage();
        this.verifyLoadingNotVisible();
    }

    waitForItemUpdate(itemId) {
        this.getCartItem(itemId).should('be.visible');
        this.verifyLoadingNotVisible();
    }

    // Comprehensive cart validation
    verifyCompleteCartState(expectedItems) {
        this.verifyCartPage();
        this.verifyLoadingNotVisible();
        
        if (expectedItems.length === 0) {
            this.verifyCartIsEmpty();
        } else {
            this.verifyCartIsNotEmpty();
            this.verifyCartItemCount(expectedItems.length);
            
            expectedItems.forEach(item => {
                this.verifyCartItemExists(item.id);
                this.verifyItemQuantity(item.id, item.quantity);
                this.verifyItemPrice(item.id, `$${item.price.toFixed(2)}`);
            });
            
            this.verifyCartSummary();
            this.verifyCalculatedSubtotal(expectedItems);
            this.verifyProceedToCheckoutButton();
        }
        
        this.verifyContinueShoppingButton();
    }
}

export default new CartPage();
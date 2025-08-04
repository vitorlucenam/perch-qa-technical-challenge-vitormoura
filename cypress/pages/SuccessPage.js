class SuccessPage {
    elements = {
        page: () => cy.get('[data-testid="success-page"]'),
        orderInfo: () => cy.get('[data-testid="order-info"]'),
        orderNumber: () => cy.get('[data-testid="order-number"]'),
        continueShoppingBtn: () => cy.get('[data-testid="continue-shopping"]'),
        viewOrdersBtn: () => cy.get('[data-testid="view-orders"]')
    }

    visit() {
        cy.visit('/checkout/success');
    }

    verifyPageLoaded() {
        this.elements.page().should('be.visible');
    }

    verifySuccessPageVisible() {
        this.elements.page().should('be.visible');
        this.elements.orderInfo().should('be.visible');
    }

    verifyOrderInfo() {
        this.elements.orderInfo().should('be.visible');
    }

    verifyOrderNumber() {
        this.elements.orderNumber().should('be.visible').and('not.be.empty');
    }

    verifyOrderNumberExists() {
        this.elements.orderNumber().should('exist').and('be.visible');
    }

    verifyOrderNumberFormat() {
        this.elements.orderNumber().should('be.visible').then($element => {
            const orderNumber = $element.text().trim();
            // Assuming order number follows a pattern like ORD-12345 or #12345
            expect(orderNumber).to.match(/^(ORD-|#)?\d+$/);
        });
    }

    getOrderNumber() {
        return this.elements.orderNumber().invoke('text').then(text => text.trim());
    }

    verifySpecificOrderNumber(expectedOrderNumber) {
        this.elements.orderNumber().should('contain.text', expectedOrderNumber);
    }

    verifyContinueShoppingButton() {
        this.elements.continueShoppingBtn().should('be.visible').and('be.enabled');
    }

    verifyViewOrdersButton() {
        this.elements.viewOrdersBtn().should('be.visible').and('be.enabled');
    }

    verifyAllNavigationButtons() {
        this.verifyContinueShoppingButton();
        this.verifyViewOrdersButton();
    }

    verifyContinueShoppingButtonText(expectedText = 'Continue Shopping') {
        this.elements.continueShoppingBtn().should('contain.text', expectedText);
    }

    verifyViewOrdersButtonText(expectedText = 'View Orders') {
        this.elements.viewOrdersBtn().should('contain.text', expectedText);
    }

    clickContinueShopping() {
        this.elements.continueShoppingBtn().click();
    }

    clickViewOrders() {
        this.elements.viewOrdersBtn().click();
    }

    verifyNavigationToHomepage() {
        cy.url().should('include', '/');
        cy.url().should('not.include', '/order-success');
    }

    verifyNavigationToOrders() {
        cy.url().should('include', '/orders');
    }

    continueShoppingAndVerify() {
        this.clickContinueShopping();
        this.verifyNavigationToHomepage();
    }

    viewOrdersAndVerify() {
        this.clickViewOrders();
        this.verifyNavigationToOrders();
    }

    verifyOrderInfoContains(expectedText) {
        this.elements.orderInfo().should('contain.text', expectedText);
    }

    verifySuccessMessage() {
        this.elements.orderInfo().should('contain.text', 'success');
    }

    verifyOrderConfirmation() {
        this.elements.orderInfo().should('contain.text', 'confirmed');
    }

    verifyThankYouMessage() {
        this.elements.orderInfo().should('contain.text', 'Thank you');
    }

    verifySuccessPageComplete() {
        this.verifyPageLoaded();
        this.verifyOrderInfo();
        this.verifyOrderNumber();
        this.verifyAllNavigationButtons();
    }

    verifyOrderSummaryVisible() {
        cy.get('[data-testid="order-summary"]').should('be.visible');
    }

    verifyOrderTotal(expectedTotal) {
        cy.get('[data-testid="order-total"]').should('contain.text', expectedTotal);
    }

    verifyOrderItems() {
        cy.get('[data-testid="order-items"]').should('be.visible');
    }

    verifyDeliveryInfo() {
        cy.get('[data-testid="delivery-info"]').should('be.visible');
    }

    waitForPageLoad() {
        this.elements.page().should('be.visible');
        this.elements.orderInfo().should('be.visible');
        this.elements.orderNumber().should('be.visible');
    }

    waitForOrderProcessing() {
        // Wait for any processing indicators to disappear
        cy.get('[data-testid="processing"]', { timeout: 10000 }).should('not.exist');
        this.waitForPageLoad();
    }

    verifyPageAccessibility() {
        // Check for proper heading structure
        this.elements.page().find('h1').should('exist');
        
        // Check for proper button labels
        this.elements.continueShoppingBtn().should('have.attr', 'aria-label');
        this.elements.viewOrdersBtn().should('have.attr', 'aria-label');
    }

    verifyOrderNumberAccessibility() {
        this.elements.orderNumber().should('have.attr', 'aria-label');
    }

    verifyPrintOrderButton() {
        cy.get('[data-testid="print-order"]').should('be.visible');
    }

    verifyEmailReceiptButton() {
        cy.get('[data-testid="email-receipt"]').should('be.visible');
    }

    clickPrintOrder() {
        cy.get('[data-testid="print-order"]').click();
    }

    clickEmailReceipt() {
        cy.get('[data-testid="email-receipt"]').click();
    }

    verifySocialSharingButtons() {
        cy.get('[data-testid="share-order"]').should('be.visible');
    }

    verifyTrackingInfo() {
        cy.get('[data-testid="tracking-info"]').should('be.visible');
    }

    verifyTrackingNumber() {
        cy.get('[data-testid="tracking-number"]').should('be.visible').and('not.be.empty');
    }

    verifyContactSupportLink() {
        cy.get('[data-testid="contact-support"]').should('be.visible');
    }

    verifyHelpCenterLink() {
        cy.get('[data-testid="help-center"]').should('be.visible');
    }

    verifyOrderProcessingState() {
        this.elements.orderInfo().should('contain.text', 'processing');
    }

    verifyOrderConfirmedState() {
        this.elements.orderInfo().should('contain.text', 'confirmed');
    }

    verifyOrderShippedState() {
        this.elements.orderInfo().should('contain.text', 'shipped');
    }

    verifyNoOrderNumberError() {
        this.elements.orderNumber().should('not.contain.text', 'Error');
        this.elements.orderNumber().should('not.contain.text', 'N/A');
    }

    verifyLoadingComplete() {
        cy.get('[data-testid="loading"]').should('not.exist');
        this.verifyPageLoaded();
    }

    verifySuccessPageURL() {
        cy.url().should('include', '/order-success');
    }

    verifyOrderURLParameter() {
        cy.url().should('match', /\/order-success(\?.*)?$/);
    }

    verifyPageTitle() {
        cy.title().should('contain', 'Order Success');
    }

    verifySuccessPageMeta() {
        this.verifyPageTitle();
        this.verifySuccessPageURL();
        this.verifyPageLoaded();
    }

    verifyCompleteSuccessFlow() {
        this.verifySuccessPageMeta();
        this.verifySuccessPageComplete();
        this.verifyOrderNumberFormat();
        this.verifyNoOrderNumberError();
        this.verifyLoadingComplete();
    }
}

export default SuccessPage;
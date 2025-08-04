class PaymentPage {
    elements = {
        page: () => cy.get('[data-testid="payment-page"]'),
        form: () => cy.get('[data-testid="payment-form"]'),
        backToAddressBtn: () => cy.get('[data-testid="back-to-address"]'),
        cardholderInput: () => cy.get('[data-testid="cardholder-input"]'),
        cardnumberInput: () => cy.get('[data-testid="card-number-input"]'),
        expiryInput: () => cy.get('[data-testid="expiry-input"]'),
        cvvInput: () => cy.get('[data-testid="cvv-input"]'),
        placeOrderBtn: () => cy.get('[data-testid="complete-payment"]')
    }

    visit() {
        cy.visit('/checkout/payment');
    }

    verifyPageLoaded() {
        this.elements.page().should('be.visible');
        this.elements.form().should('be.visible');
    }

    verifyFormVisible() {
        this.elements.form().should('be.visible');
    }

    verifyBackToAddressButton() {
        this.elements.backToAddressBtn().should('be.visible').and('be.enabled');
    }

    verifyAllFormFields() {
        this.elements.cardholderInput().should('be.visible');
        this.elements.cardnumberInput().should('be.visible');
        this.elements.expiryInput().should('be.visible');
        this.elements.cvvInput().should('be.visible');
    }

    verifyPlaceOrderButton() {
        this.elements.placeOrderBtn().should('be.visible');
    }

    // Form filling methods
    fillCardHolder(cardHolder) {
        this.elements.cardholderInput().clear().type(cardHolder);
    }

    fillCardNumber(cardNumber) {
        this.elements.cardnumberInput().clear().type(cardNumber);
    }

    fillExpiry(expiry) {
        this.elements.expiryInput().clear().type(expiry);
    }

    fillCVV(cvv) {
        this.elements.cvvInput().clear().type(cvv);
    }

    // Complete form filling method
    fillPaymentForm(paymentData) {
        const {
            cardHolder = 'John Doe',
            cardNumber = '4111111111111111',
            expiry = '12/25',
            cvv = '123'
        } = paymentData;

        this.fillCardHolder(cardHolder);
        this.fillCardNumber(cardNumber);
        this.fillExpiry(expiry);
        this.fillCVV(cvv);
    }

    // Form validation methods
    verifyCardHolder(expectedValue) {
        this.elements.cardholderInput().should('have.value', expectedValue);
    }

    verifyCardNumber(expectedValue) {
        this.elements.cardnumberInput().should('have.value', expectedValue);
    }

    verifyExpiry(expectedValue) {
        this.elements.expiryInput().should('have.value', expectedValue);
    }

    verifyCVV(expectedValue) {
        this.elements.cvvInput().should('have.value', expectedValue);
    }

    // Form validation - verify all fields are filled
    verifyFormFilled(paymentData) {
        const {
            cardHolder = 'John Doe',
            cardNumber = '4111111111111111',
            expiry = '12/25',
            cvv = '123'
        } = paymentData;

        this.verifyCardHolder(cardHolder);
        this.verifyCardNumber(cardNumber);
        this.verifyExpiry(expiry);
        this.verifyCVV(cvv);
    }

    // Field validation methods
    verifyFieldRequired(fieldName) {
        const fieldMap = {
            'cardholder': this.elements.cardholderInput,
            'cardnumber': this.elements.cardnumberInput,
            'expiry': this.elements.expiryInput,
            'cvv': this.elements.cvvInput
        };

        const field = fieldMap[fieldName.toLowerCase()];
        if (field) {
            field().should('have.attr', 'required');
        }
    }

    verifyFieldEmpty(fieldName) {
        const fieldMap = {
            'cardholder': this.elements.cardholderInput,
            'cardnumber': this.elements.cardnumberInput,
            'expiry': this.elements.expiryInput,
            'cvv': this.elements.cvvInput
        };

        const field = fieldMap[fieldName.toLowerCase()];
        if (field) {
            field().should('have.value', '');
        }
    }

    // Field type and format validation
    verifyCardNumberFormat() {
        // Verify card number field accepts only numbers and formats correctly
        this.elements.cardnumberInput().should('have.attr', 'type', 'text');
        this.elements.cardnumberInput().should('have.attr', 'maxlength').and('match', /\d+/);
    }

    verifyExpiryFormat() {
        // Verify expiry field has correct format (MM/YY)
        this.elements.expiryInput().should('have.attr', 'placeholder').and('match', /(MM\/YY|mm\/yy)/i);
    }

    verifyCVVFormat() {
        // Verify CVV field accepts only numbers and has correct length
        this.elements.cvvInput().should('have.attr', 'type', 'text');
        this.elements.cvvInput().should('have.attr', 'maxlength', '4');
    }

    // Test different card types
    fillValidVisaCard() {
        this.fillPaymentForm({
            cardHolder: 'John Doe',
            cardNumber: '4111111111111111',
            expiry: '12/25',
            cvv: '123'
        });
    }

    fillValidMasterCard() {
        this.fillPaymentForm({
            cardHolder: 'Jane Smith',
            cardNumber: '5555555555554444',
            expiry: '06/26',
            cvv: '456'
        });
    }

    fillValidAmexCard() {
        this.fillPaymentForm({
            cardHolder: 'Bob Johnson',
            cardNumber: '378282246310005',
            expiry: '09/27',
            cvv: '1234'
        });
    }

    // Invalid card data for negative testing
    fillInvalidCardNumber() {
        this.fillPaymentForm({
            cardHolder: 'Test User',
            cardNumber: '1234567890123456',
            expiry: '12/25',
            cvv: '123'
        });
    }

    fillExpiredCard() {
        this.fillPaymentForm({
            cardHolder: 'Test User',
            cardNumber: '4111111111111111',
            expiry: '01/20',
            cvv: '123'
        });
    }

    // Navigation methods
    clickBackToAddress() {
        this.elements.backToAddressBtn().click();
    }

    clickPlaceOrder() {
        this.elements.placeOrderBtn().click();
    }

    // Button state validation
    verifyPlaceOrderButtonEnabled() {
        this.elements.placeOrderBtn().should('be.enabled');
    }

    verifyPlaceOrderButtonDisabled() {
        this.elements.placeOrderBtn().should('be.disabled');
    }

    // Form submission and navigation
    submitPaymentForm(paymentData = {}) {
        this.fillPaymentForm(paymentData);
        this.clickPlaceOrder();
    }

    // Wait for page transitions
    waitForPageLoad() {
        this.elements.page().should('be.visible');
        this.elements.form().should('be.visible');
    }

    // Validation error methods
    verifyValidationError(fieldName, expectedError) {
        // Assuming validation errors appear near the field with a specific pattern
        cy.get(`[data-testid="${fieldName}-input"]`)
          .parent()
          .should('contain.text', expectedError);
    }

    verifyNoValidationErrors() {
        // Verify no validation error messages are visible
        cy.get('[data-testid*="error"]').should('not.exist');
    }

    // Card number masking validation
    verifyCardNumberMasked() {
        // Check if card number is masked (showing only last 4 digits)
        this.elements.cardnumberInput().then($input => {
            const value = $input.val();
            if (value.length > 4) {
                expect(value).to.match(/\*+\d{4}/);
            }
        });
    }

    // Security validations
    verifyCVVMasked() {
        // Verify CVV field is masked/password type for security
        this.elements.cvvInput().should('have.attr', 'type').and('match', /(password|text)/);
    }

    // Clear form method
    clearForm() {
        this.elements.cardholderInput().clear();
        this.elements.cardnumberInput().clear();
        this.elements.expiryInput().clear();
        this.elements.cvvInput().clear();
    }

    // Form interaction validations
    verifyFieldFocus(fieldName) {
        const fieldMap = {
            'cardholder': this.elements.cardholderInput,
            'cardnumber': this.elements.cardnumberInput,
            'expiry': this.elements.expiryInput,
            'cvv': this.elements.cvvInput
        };

        const field = fieldMap[fieldName.toLowerCase()];
        if (field) {
            field().should('be.focused');
        }
    }

    // Verify navigation success
    verifyNavigationToAddress() {
        cy.url().should('include', '/checkout/address');
    }

    verifyOrderPlaced() {
        // This would depend on where the user is redirected after successful order
        cy.url().should('include', '/order-confirmation');
    }

    // Order summary validation (if payment page shows order summary)
    verifyOrderSummaryVisible() {
        cy.get('[data-testid="order-summary"]').should('be.visible');
    }

    verifyOrderTotal(expectedTotal) {
        cy.get('[data-testid="order-total"]').should('contain.text', expectedTotal);
    }

    // Loading states
    verifyLoadingState() {
        cy.get('[data-testid="loading"]').should('be.visible');
    }

    verifyLoadingComplete() {
        cy.get('[data-testid="loading"]').should('not.exist');
    }

    // Payment processing validation
    verifyPaymentProcessing() {
        this.elements.placeOrderBtn().should('contain.text', 'Processing...').and('be.disabled');
    }

    verifyPaymentComplete() {
        cy.url().should('not.include', '/checkout/payment');
    }
}

export default PaymentPage;
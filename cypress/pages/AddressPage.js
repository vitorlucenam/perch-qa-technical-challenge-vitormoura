class AddressPage {
    elements = {
        page: () => cy.get('[data-testid="address-page"]'),
        form: () => cy.get('[data-testid="address-form"]'),
        backToCartBtn: () => cy.get('[data-testid="back-to-cart"]'),
        firstnameInput: () => cy.get('[data-testid="firstname-input"]'),
        emailInput: () => cy.get('[data-testid="email-input"]'),
        phoneInput: () => cy.get('[data-testid="phone-input"]'),
        streetInput: () => cy.get('[data-testid="street-input"]'),
        cityInput: () => cy.get('[data-testid="city-input"]'),
        stateInput: () => cy.get('[data-testid="state-input"]'),
        zipcodeInput: () => cy.get('[data-testid="zipcode-input"]'),
        countryInput: () => cy.get('[data-testid="country-input"]'),
        continueBtn: () => cy.get('[data-testid="continue-to-payment"]')
    }

    visit() {
        cy.visit('/checkout/address');
    }

    verifyPageLoaded() {
        this.elements.page().should('be.visible');
        this.elements.form().should('be.visible');
    }

    verifyFormVisible() {
        this.elements.form().should('be.visible');
    }

    verifyBackToCartButton() {
        this.elements.backToCartBtn().should('be.visible').and('be.enabled');
    }

    verifyAllFormFields() {
        this.elements.firstnameInput().should('be.visible');
        this.elements.emailInput().should('be.visible');
        this.elements.phoneInput().should('be.visible');
        this.elements.streetInput().should('be.visible');
        this.elements.cityInput().should('be.visible');
        this.elements.stateInput().should('be.visible');
        this.elements.zipcodeInput().should('be.visible');
        this.elements.countryInput().should('be.visible');
    }

    verifyContinueButton() {
        this.elements.continueBtn().should('be.visible');
    }

    fillFirstName(firstName) {
        this.elements.firstnameInput().clear().type(firstName);
    }

    fillEmail(email) {
        this.elements.emailInput().clear().type(email);
    }

    fillPhone(phone) {
        this.elements.phoneInput().clear().type(phone);
    }

    fillStreet(street) {
        this.elements.streetInput().clear().type(street);
    }

    fillCity(city) {
        this.elements.cityInput().clear().type(city);
    }

    fillState(state) {
        this.elements.stateInput().clear().type(state);
    }

    fillZipCode(zipCode) {
        this.elements.zipcodeInput().clear().type(zipCode);
    }

    fillCountry(country) {
        this.elements.countryInput().clear().type(country);
    }

    fillAddressForm(addressData) {
        const {
            firstName = 'John',
            email = 'john@example.com',
            phone = '(555) 123-4567',
            street = '123 Main Street',
            city = 'New York',
            state = 'NY',
            zipCode = '10001',
            country = 'United States'
        } = addressData;

        this.fillFirstName(firstName);
        this.fillEmail(email);
        this.fillPhone(phone);
        this.fillStreet(street);
        this.fillCity(city);
        this.fillState(state);
        this.fillZipCode(zipCode);
        this.fillCountry(country);
    }

    verifyFirstName(expectedValue) {
        this.elements.firstnameInput().should('have.value', expectedValue);
    }

    verifyEmail(expectedValue) {
        this.elements.emailInput().should('have.value', expectedValue);
    }

    verifyPhone(expectedValue) {
        this.elements.phoneInput().should('have.value', expectedValue);
    }

    verifyStreet(expectedValue) {
        this.elements.streetInput().should('have.value', expectedValue);
    }

    verifyCity(expectedValue) {
        this.elements.cityInput().should('have.value', expectedValue);
    }

    verifyState(expectedValue) {
        this.elements.stateInput().should('have.value', expectedValue);
    }

    verifyZipCode(expectedValue) {
        this.elements.zipcodeInput().should('have.value', expectedValue);
    }

    verifyCountry(expectedValue) {
        this.elements.countryInput().should('have.value', expectedValue);
    }

    verifyFormFilled(addressData) {
        const {
            firstName = 'John',
            email = 'john@example.com',
            phone = '(555) 123-4567',
            street = '123 Main Street',
            city = 'New York',
            state = 'NY',
            zipCode = '10001',
            country = 'United States'
        } = addressData;

        this.verifyFirstName(firstName);
        this.verifyEmail(email);
        this.verifyPhone(phone);
        this.verifyStreet(street);
        this.verifyCity(city);
        this.verifyState(state);
        this.verifyZipCode(zipCode);
        this.verifyCountry(country);
    }

    loadSavedAddressData() {
        cy.window().then((win) => {
            const savedData = win.localStorage.getItem('addressData');
            if (savedData) {
                const address = JSON.parse(savedData);
                // Verify the form was populated with saved data
                this.verifyFirstName(address.firstName);
                this.verifyEmail(address.email);
                this.verifyPhone(address.phone);
                this.verifyStreet(address.street);
                this.verifyCity(address.city);
                this.verifyState(address.state);
                this.verifyZipCode(address.zipCode);
                this.verifyCountry(address.country);
            }
        });
    }

    verifyFieldRequired(fieldName) {
        const fieldMap = {
            'firstname': this.elements.firstnameInput,
            'email': this.elements.emailInput,
            'phone': this.elements.phoneInput,
            'street': this.elements.streetInput,
            'city': this.elements.cityInput,
            'state': this.elements.stateInput,
            'zipcode': this.elements.zipcodeInput,
            'country': this.elements.countryInput
        };

        const field = fieldMap[fieldName.toLowerCase()];
        if (field) {
            field().should('have.attr', 'required');
        }
    }

    verifyFieldEmpty(fieldName) {
        const fieldMap = {
            'firstname': this.elements.firstnameInput,
            'email': this.elements.emailInput,
            'phone': this.elements.phoneInput,
            'street': this.elements.streetInput,
            'city': this.elements.cityInput,
            'state': this.elements.stateInput,
            'zipcode': this.elements.zipcodeInput,
            'country': this.elements.countryInput
        };

        const field = fieldMap[fieldName.toLowerCase()];
        if (field) {
            field().should('have.value', '');
        }
    }

    clickBackToCart() {
        this.elements.backToCartBtn().click();
    }

    clickContinueToPayment() {
        this.elements.continueBtn().click();
    }

    verifyContinueButtonEnabled() {
        this.elements.continueBtn().should('be.enabled');
    }

    verifyContinueButtonDisabled() {
        this.elements.continueBtn().should('be.disabled');
    }

    submitAddressForm(addressData = {}) {
        this.fillAddressForm(addressData);
        this.clickContinueToPayment();
    }

    waitForPageLoad() {
        this.elements.page().should('be.visible');
        this.elements.form().should('be.visible');
    }

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

    clearForm() {
        this.elements.firstnameInput().clear();
        this.elements.emailInput().clear();
        this.elements.phoneInput().clear();
        this.elements.streetInput().clear();
        this.elements.cityInput().clear();
        this.elements.stateInput().clear();
        this.elements.zipcodeInput().clear();
        this.elements.countryInput().clear();
    }

    verifyNavigationToPayment() {
        cy.url().should('include', '/checkout/payment');
    }

    verifyNavigationToCart() {
        cy.url().should('include', '/cart');
    }
}

export default AddressPage;
Feature: Product Page Functionality

  Background:
    Given I am on the homepage
    And I can see the product list
    When I click on a product item
    Then I should be on the product detail page

  # Product Details Viewing Scenarios
  Scenario: User can view all product details
    Given I am on a product detail page
    Then I should see the product title
    And I should see the product image
    And I should see the product price
    And I should see the product description
    And I should see the quantity selector
    And I should see the add to cart button

  Scenario: Product image is displayed correctly
    Given I am on a product detail page
    When the page loads completely
    Then the product image should be visible
    And the product image should have a valid source

  Scenario: Product information is not empty
    Given I am on a product detail page
    Then the product title should not be empty
    And the product price should not be empty
    And the product description should be visible

  # Quantity Selection Scenarios
  Scenario: User can select quantity using dropdown
    Given I am on a product detail page
    When I select quantity "3" from the dropdown
    Then the quantity field should show "3"

  Scenario: User can select different quantity values
    Given I am on a product detail page
    When I select quantity "5"
    Then the quantity should be set to "5"
    When I select quantity "1"
    Then the quantity should be set to "1"

  Scenario: Quantity selector displays available options
    Given I am on a product detail page
    Then the quantity dropdown should be visible
    And the quantity dropdown should have options from 1 to 5

  # Add to Cart Scenarios
  Scenario: User can add product to cart with default quantity
    Given I am on a product detail page
    And the quantity is set to "1"
    When I click the add to cart button
    Then I should be redirected to the cart page

  Scenario: User can add product to cart with custom quantity
    Given I am on a product detail page
    When I select quantity "3"
    And I click the add to cart button
    Then I should be redirected to the cart page

  Scenario: Add to cart button is functional
    Given I am on a product detail page
    Then the add to cart button should be visible
    And the add to cart button should be enabled

  # Cart Navigation Scenarios
  Scenario: User is redirected to cart after adding product
    Given I am on a product detail page
    When I click the add to cart button
    Then I should be redirected to the cart page

  # Information Validation Scenarios
  Scenario: Product price format is valid
    Given I am on a product detail page
    Then the product price should be displayed in a valid currency format
    And the product price should be a positive value

  Scenario: Product title is descriptive
    Given I am on a product detail page
    Then the product title should be meaningful
    And the product title should not contain only numbers or special characters

  Scenario: Default quantity is set correctly
    Given I am on a product detail page
    Then the default quantity should be "1"
    And the quantity field should accept numeric input only

  Scenario: Product page loads completely
    Given I navigate directly to a product page
    When the page finishes loading
    Then all product elements should be present
    And no loading indicators should be visible
    And there should be no error messages displayed

  Scenario Outline: User can add various quantities to cart
    Given I am on a product detail page
    When I select quantity "<quantity>"
    And I click the add to cart button
    Then I should be redirected to the cart page

    Examples:
      | quantity |
      | 1        |
      | 2        |
      | 3        |
      | 5        |
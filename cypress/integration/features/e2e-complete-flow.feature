Feature: End-to-End Complete E-commerce Flow

  @e2e @smoke
  Scenario: Basic end-to-end purchase flow
    Given I am on the homepage
    When I view product "1" and add it to cart
    And I proceed to checkout with valid data
    Then I should see successful order completion

  @e2e @integration
  Scenario: Complete checkout flow with multiple products
    Given I am on the homepage
    When I add multiple products to my cart
    And I complete the full checkout process
    Then I should reach the success page
    And I should see "Thank You for Your Purchase!" message

  @e2e @validation
  Scenario: End-to-end flow validates main functionality
    Given I start with an empty cart
    When I add a product to cart
    Then I should see the product in my cart
    When I proceed through checkout
    And I fill address and payment details
    And I complete the order
    Then the order should be processed successfully
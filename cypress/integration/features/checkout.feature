Feature: Checkout Process

  Background:
    Given I have items in my cart
    And I am on the checkout address page

  # Address Form Scenarios
  Scenario: User completes address form successfully
    When I fill complete address form with valid data
    Then the continue button should be enabled
    And I can proceed to payment page

  Scenario: User can navigate back to cart from address page
    When I click the back to cart button
    Then I should be redirected to the cart page
    And I should still see my cart items

  Scenario: Address form requires all fields to be filled
    When I try to continue without filling any fields
    Then the form should prevent submission with browser validation
    And I should remain on the address page

  Scenario: Address form validates email format
    When I fill address form with invalid email format
    And I try to continue to payment
    Then the browser should show email validation error
    And I should remain on the address page

  # Payment Form Scenarios  
  Scenario: User successfully completes payment form
    Given I have completed the address form
    When I am on the payment page
    And I fill payment form with valid Visa card
    And I click place order
    Then I should be redirected to the success page

  Scenario: User can navigate back to address from payment page
    Given I have completed the address form
    When I am on the payment page
    And I click the back to address button
    Then I should be redirected to the address page
    And my address data should be preserved

  Scenario: Payment form requires all fields to be filled
    Given I have completed the address form
    When I am on the payment page
    And I try to place order without filling payment fields
    Then the form should prevent submission with browser validation
    And I should remain on the payment page

  Scenario Outline: Payment form accepts different valid card types
    Given I have completed the address form
    When I am on the payment page
    And I fill payment form with "<cardtype>" card:
      | cardholder | <holder>     |
      | cardnumber | <number>     |
      | expiry     | 12/25        |
      | cvv        | <cvv>        |
    And I click place order
    Then I should be redirected to the success page

    Examples:
      | cardtype   | holder     | number           | cvv  |
      | Visa       | John Doe   | 4111111111111111 | 123  |
      | MasterCard | Jane Smith | 5555555555554444 | 456  |
      | Amex       | Bob Wilson | 378282246310005  | 1234 |

  # Complete Checkout Flow Scenarios
  Scenario: Complete checkout flow from cart to success
    Given I have items in my cart
    When I proceed through complete checkout with valid data
    Then I should see the order success page with valid order number
    And I should see order confirmation details

  Scenario: Complete checkout flow maintains data integrity
    Given I have multiple items in cart with total "$229.98"
    When I proceed through complete checkout flow
    Then the order should contain correct items and total
    And my cart should be empty after purchase

  # Success Page Scenarios
  Scenario: Order success page displays required information
    Given I have completed a successful order
    When I am on the success page
    Then I should see order success page with all elements:
      | element           | status  |
      | order information | visible |
      | order number      | valid   |
      | continue shopping | enabled |
      | view orders       | enabled |

  Scenario: User can navigate from success page
    Given I have completed a successful order
    When I am on the success page
    And I click continue shopping
    Then I should return to homepage with empty cart

  # Navigation and Data Persistence Scenarios
  Scenario: Checkout preserves data during navigation
    Given I have items in my cart
    When I fill partial address information
    And I navigate back to cart and return to checkout
    Then my address data should be preserved
    When I complete checkout process
    Then the order should be successful

  # Error Handling Scenarios  
  Scenario: Checkout handles invalid card gracefully
    Given I have completed the address form
    When I am on the payment page
    And I fill payment form with invalid card details
    And I try to place order
    Then I should see appropriate error feedback
    And I should remain on the payment page

  # Edge Cases - Removed scenarios that we cannot confirm the expected behavior
Feature: Shopping Cart Functionality

  Background:
    Given I am on the cart page

  # Empty Cart Scenarios
  Scenario: User views empty cart
    Given the cart is empty
    Then I should see the empty cart message
    And I should see the continue shopping button
    And I should not see the cart items container
    And I should not see the proceed to checkout button

  Scenario: User can continue shopping from empty cart
    Given the cart is empty
    When I click the continue shopping button
    Then I should be redirected to the homepage

  # View Cart with Items Scenarios
  Scenario: User views cart with items
    Given the cart contains items
    Then I should see the cart items container
    And I should see the cart summary
    And I should see the subtotal
    And I should see the proceed to checkout button
    And I should not see the empty cart message

  Scenario: User views individual cart item details
    Given the cart contains a product with id "1"
    Then I should see the cart item with id "1"
    And I should see the item price for product "1"
    And I should see the quantity selector for product "1"
    And I should see the remove button for product "1"

  # Quantity Modification Scenarios
  Scenario: User can modify item quantity using select dropdown
    Given the cart contains a product with id "1" and quantity "2"
    When I change the quantity of item "1" to "4"
    Then the quantity of item "1" should be "4"
    And the subtotal should be updated accordingly

  Scenario: User can increase item quantity
    Given the cart contains a product with id "1" and quantity "1"
    When I change the quantity of item "1" to "3"
    Then the quantity of item "1" should be "3"
    And the cart should still contain the item "1"

  Scenario: User can decrease item quantity
    Given the cart contains a product with id "1" and quantity "5"
    When I change the quantity of item "1" to "2"
    Then the quantity of item "1" should be "2"
    And the cart should still contain the item "1"

  Scenario: User sets item quantity to zero removes the item
    Given the cart contains a product with id "1" and quantity "3"
    When I change the quantity of item "1" to "0"
    Then the item "1" should be removed from the cart
    And I should not see the cart item with id "1"

  # Item Removal Scenarios
  Scenario: User can remove item using remove button
    Given the cart contains a product with id "1"
    When I click the remove button for item "1"
    Then the item "1" should be removed from the cart
    And I should not see the cart item with id "1"

  Scenario: User removes last item from cart
    Given the cart contains only one product with id "1"
    When I click the remove button for item "1"
    Then the cart should be empty
    And I should see the empty cart message
    And I should not see the cart items container
  
  @debug
  Scenario: User removes one item from multiple items
    Given the cart contains products with ids "1,2,3"
    When I click the remove button for item "2"
    Then the item "2" should be removed from the cart
    And I should still see cart items with ids "1,3"
    And the cart should contain "2" items

  # Subtotal Calculation Scenarios
  Scenario: Subtotal is calculated correctly for single item
    Given the cart contains a product with id "1", price "$79.99" and quantity "2"
    Then the subtotal should show "$159.98"
  
  @debug
  Scenario: Subtotal is calculated correctly for multiple items
    Given the cart contains multiple items:
      | id | price   | quantity |
      | 1  | $79.99  | 2        |
      | 2  | $149.99 | 1        |
    Then the subtotal should show "$309.97"

  Scenario: Subtotal updates when quantity changes
    Given the cart contains a product with id "1", price "$79.99" and quantity "1"
    And the subtotal shows "$79.99"
    When I change the quantity of item "1" to "3"
    Then the subtotal should show "$239.97"

  @debug
  Scenario: Subtotal updates when item is removed
    Given the cart contains multiple items:
      | id | price   | quantity |
      | 1  | $79.99  | 1        |
      | 2  | $149.99 | 1        |
    And the subtotal shows "$229.98"
    When I click the remove button for item "2"
    Then the subtotal should show "$79.99"

  # Checkout Navigation Scenarios
  Scenario: User can proceed to checkout with items in cart
    Given the cart contains items
    And the proceed to checkout button is enabled
    When I click the proceed to checkout button
    Then I should be redirected to the checkout page

  Scenario: User cannot proceed to checkout with empty cart
    Given the cart is empty
    Then I should not see the proceed to checkout button

  # Continue Shopping Navigation Scenarios
  Scenario: User can continue shopping with items in cart
    Given the cart contains items
    When I click the continue shopping button
    Then I should be redirected to the homepage

  # Loading States Scenarios
  Scenario: Cart page loads without loading indicators
    Given I am on the cart page
    Then the loading indicator should not be visible
    And the cart page should be fully loaded

  Scenario: Cart updates without showing loading state
    Given the cart contains a product with id "1" and quantity "2"
    When I change the quantity of item "1" to "3"
    Then the loading indicator should not be visible
    And the quantity change should be applied immediately

  @debug
  # Multiple Items Management Scenarios
  Scenario: User can modify quantities of multiple items
    Given the cart contains multiple items:
      | id | quantity |
      | 1  | 2        |
      | 2  | 3        |
    When I change the quantity of item "1" to "4"
    And I change the quantity of item "2" to "1"  
    Then the quantity of item "1" should be "4"
    And the quantity of item "2" should be "1"
    And the subtotal should be updated accordingly

  @debug
  Scenario: User can remove multiple items
    Given the cart contains products with ids "1,2,3"
    When I click the remove button for item "1"
    And I click the remove button for item "3"
    Then I should not see cart items with ids "1,3"
    And I should still see the cart item with id "2"
    And the cart should contain "1" item

  # Edge Cases Scenarios
  Scenario: User views cart with maximum quantity items
    Given the cart contains a product with id "1" and quantity "5"
    Then the quantity selector should show maximum value "5"
    And the quantity of item "1" should be "5"

  @debug
  Scenario: Cart maintains state across page refresh
    Given the cart contains a product with id "1" and quantity "3"
    When I refresh the page
    Then I should still see the cart item with id "1"
    And the quantity of item "1" should be "3"
    And the subtotal should remain correct
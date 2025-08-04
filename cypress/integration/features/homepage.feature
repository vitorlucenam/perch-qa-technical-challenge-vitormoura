Feature: Homepage Navigation

Scenario: User can navigate to the homepage
  Given I am on the homepage
  Then I should see the main content
  And I should see the full list of products

Scenario: User can sort products by price ascending (default)
  Given I am on the homepage
  Then the sort button should show "Sort by Price ↑"
  And the products should be sorted by price in ascending order

Scenario: User can toggle to sort products by price descending
  Given I am on the homepage
  When I click the sort price button
  Then the sort button should show "Sort by Price ↓"
  And the products should be sorted by price in descending order

Scenario: User can toggle back to sort products by price ascending
  Given I am on the homepage
  When I click the sort price button
  And I click the sort price button again
  Then the sort button should show "Sort by Price ↑"
  And the products should be sorted by price in ascending order

Scenario: User can navigate to a product detail page
  Given I am on the homepage
  And I can see the product list
  When I click on a "View Details" button
  Then I should be redirected to the product detail page
  And I should see the product information

Scenario: Product list displays correctly on homepage
  Given I am on the homepage
  Then I should see a list of products
  And each product should display an image
  And each product should display a title
  And each product should display a price

Scenario: Product list loads with default sorting
  Given I am on the homepage
  Then the product list should be visible
  And the products should be displayed in the default order

Scenario: Product list shows proper product count
  Given I am on the homepage
  When the product list loads
  Then I should see exactly 3 products
  And all products should be displayed
Feature: Swag Labs - Saucedemo
I want to 
Login
Filter Item
Add to cart
Remove from cart

  Background: Precondition- User should visit site and log in
    Given I visit "/"
    And I find input by placeholder text "Username"
    And I type "standard_user"
    And I get element by selector "#password"
    And I type "secret_sauce"
    And I click on text "Login"
    Then I see text "Products"

  @addToCart
  Scenario: Add to cart
    When I find buttons by text "Add to cart"
    And I get 1st element
    And I click
    Then I see text "Remove"

  @removeFromCart
  Scenario: Remove from cart
    When I find buttons by text "Remove"
    And I get 1st element
    And I click
    Then I see text "Remove"

  @filterItems
  Scenario: Filter by all possible options
    When I get element by selector "[data-test='product-sort-container']"
    And I select "Name (A to Z)"
    Then I see text "Name (A to Z)"
    And I select "Name (Z to A)"
    Then I see text "Name (Z to A)"
    When I get element by selector "[data-test='product-sort-container']"
    And I select "Price (low to high)"
    Then I see text "Price (low to high)"
    When I get element by selector "[data-test='product-sort-container']"
    And I select "Price (high to low)"
    Then I see text "Price (high to low)"

  @viewAndCheckout
  Scenario: View Cart and Checkout
    When I find buttons by text "Add to cart"
    And I get 1st element
    And I click
    Then I see text "Remove"
    When I get element by selector "[data-test='shopping-cart-link']"
    And I click
    Then I see button "Checkout"
    Then I see button "Remove"
    When I click on button "Checkout"
    And I find input by name "firstName"
    And I type "testFirstName"
    And I find input by name "lastName"
    And I type "testLastName"
    And I find input by name "postalCode"
    And I type "010011"
    And I click on button "Continue"

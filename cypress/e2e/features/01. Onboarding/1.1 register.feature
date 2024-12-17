@onboarding
Feature: Reagister a new account
I want to 
1. Register a new account

  Background: Precondition- User should visit site and log in
    Given I clear all cookies
    When I visit "/"

  @regression @register
  Scenario: Register a new account (basic flow)
    And I click on link "Register"
    Then I see text "Signing up is easy!"
    When I find input by name "customer.firstName"
    And I type random "First Name"
    When I find input by name "customer.lastName"
    And I type random "Last Name"
    When I find input by name "customer.address.street"
    And I type random "Address"
    When I find input by name "customer.address.city"
    And I type random "Ikoye"
    When I find input by name "customer.address.state"
    And I type random "Lagos"
    When I find input by name "customer.address.zipCode"
    And I type random "20129"
    When I find input by name "customer.phoneNumber"
    And I type random "Phone Number"
    When I find input by name "customer.ssn"
    And I type random "Number"
    When I find input by name "customer.username"
    And I type random "User Name"
    When I find input by name "customer.username"
    And I store input text as "userName"
    And I write the alias "userName" to the JSON file "userData"
    When I find input by name "customer.password"
    And I type random "seamlessPaschal"
    When I find input by name "customer.password"
    And I store input text as "password"
    And I update the JSON file "userData.json" with the stored alias "password"
    When I get element by selector "#repeatedPassword"
    And I type random "seamlessPaschal"
    And I click on button "Register"
    Then I see text "Your account was created successfully. You are now logged in."
    Then I see text "Log Out"

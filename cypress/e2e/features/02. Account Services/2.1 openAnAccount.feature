@accounts
Feature: Accounts
I want to 

1. Open a new account

2. Transfer funds between accounts

  Background: Precondition- User should visit site and log in
    Given I login to the "PARABANK" with "userData.json.userName" and "userData.json.password" as password

  @regression @openAccount
  Scenario: Open a new account (basic flow)
    When I visit "/"
    And I click on link "Open New Account"
    And I select option "SAVINGS"
    And I wait 1 second
    And I click on button "Open New Account"
    Then I see text "Account Opened!"
    Then I see text "Congratulations, your account is now open."
    Then I see text "Your new account number:"

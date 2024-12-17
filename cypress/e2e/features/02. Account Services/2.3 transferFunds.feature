@accounts
Feature: Transfer funds between accounts
I want to 

1. Transfer funds between accounts

  Background: Precondition- User should visit site and log in
    Given I login to the "PARABANK" with "userData.json.userName" and "userData.json.password" as password

  @regression @transferFunds
  Scenario: Transfer funds between accounts (basic flow)
    When I visit "/"
    And I click on link "Transfer Funds"
    And I get element by selector "#amount"
    And I type "1000"
    And I get element by selector "#fromAccountId"
    And I select "14676"
    And I get element by selector "#toAccountId"
    And I select "14898"
    And I click on button "Transfer"
    Then I see text "$1000.00 has been transferred from account #14676 to account #14898."
    Then I see text "Transfer Complete!"

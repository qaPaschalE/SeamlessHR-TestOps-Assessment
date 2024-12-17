@onboarding
Feature: Sign Out
I want to be a to :

1. Sign out of the app

  Background: Precondition- User should visit site and log in
    Given I login to the "PARABANK" with "userData.json.userName" and "userData.json.password" as password

  @regression @signOut
  Scenario: Verify user Applies for a Loan(basic flow)
    When I visit "/"
    And I click on link "Log Out"
    Then I see text "Customer Login"

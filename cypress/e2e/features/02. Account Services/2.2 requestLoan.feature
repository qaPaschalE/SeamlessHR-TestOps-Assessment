@accounts
Feature: Request a loan
I want to be a to :

1. Apply for a Loan

  Background: Precondition- User should visit site and log in
    Given I login to the "PARABANK" with "userData.json.userName" and "userData.json.password" as password

  @regression @loanRequest
  Scenario: Verify user Applies for a Loan(basic flow)
    When I visit "/"
    And I click on link "Request Loan"
    And I get element by selector "#amount"
    And I type "100"
    And I get element by selector "#downPayment"
    And I type "10"
    And I select option "15120"
    And I click on button "Apply Now"
    Then I see text "Loan Request Processed"
    Then I see text "Loan Provider:"
    Then I see text "Approved"

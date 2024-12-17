@onboarding
Feature: Log In
I want to 
1. Log in using valid credentials
2. Log in using invalid username valid password
3. Log in using valid username invalid password
4. Log in using invalid username invalid password
5. Log in using empty username valid password
6. Log in using empty username invalid password
7. Log in using invalid username empty password
8. Log in using valid username empty password
9. Log in using empty username empty password

  Background: Precondition- User should visit site and log in
    Given I visit "/"

  @regression @logIn
  Scenario: Log in using invalid username valid password (Negative flow)
    When I find input by name "username"
    And I type random "seamlessInvalid"
    When I find input by name "password"
    And I type random "seamlessPaschal"
    And I click on button "Log In"
    Then I see text "Error!"
    Then I see text "The username and password could not be verified."

  @regression @logIn
  Scenario: Log in using valid username invalid password (Negative flow)
    When I find input by name "username"
    And I type random "seamlessPaschal"
    When I find input by name "password"
    And I type random "seamlessInvalid"
    And I click on button "Log In"
    Then I see text "Error!"
    Then I see text "The username and password could not be verified."

  @regression @logIn
  Scenario: Log in using invalid username invalid password (Negative flow)
    When I find input by name "username"
    And I type random "seamlessInvalid"
    When I find input by name "password"
    And I type random "seamlessInvalid"
    And I click on button "Log In"
    Then I see text "Error!"
    Then I see text "The username and password could not be verified."

  @regression @logIn
  Scenario: Log in using empty username valid password (Negative flow)
    When I find input by name "password"
    And I type random "seamlessPaschal"
    And I click on button "Log In"
    Then I see text "Error!"
    Then I see text "Please enter a username and password."

  @regression @logIn
  Scenario: Log in using empty username invalid password (Negative flow)
    When I find input by name "password"
    And I type random "seamlessInvalid"
    And I click on button "Log In"
    Then I see text "Error!"
    Then I see text "Please enter a username and password."

  @regression @logIn
  Scenario: Log in using invalid username empty password (Negative flow)
    When I find input by name "username"
    And I type random "seamlessInvalid"
    And I click on button "Log In"
    Then I see text "Error!"
    Then I see text "Please enter a username and password."

  @regression @logIn
  Scenario: Log in using valid username empty password (Negative flow)
    When I find input by name "username"
    And I type random "seamlessPaschal"
    And I click on button "Log In"
    Then I see text "Error!"
    Then I see text "Please enter a username and password."

  @regression @logIn
  Scenario: Log in using empty username empty password (Negative flow)
    And I click on button "Log In"
    Then I see text "Error!"
    Then I see text "Please enter a username and password."

  @regression @logIn
  Scenario: Log in using valid credentials (Positive flow)
    Given I login to the "PARABANK" with "userData.json.userName" and "userData.json.password" as password

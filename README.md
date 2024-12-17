# Paschal QA Framework 🎉

<table align="center" style="margin-bottom:30px;"><tr><td align="center" width="9999" heigth="9999 " >
 <img src="cypress/assests/paschal logo (2).png" alt="paschal Logo" style="margin-top:25px;" align="center"/>

#

Paschal's UI test automation project using Cypress Cucumber and TypeScript.

</td></tr></table>

[![Cypress](https://img.shields.io/badge/built%20with-Cypress-15B392)](https://www.cypress.io/)
[![Cucumber](https://img.shields.io/badge/built%20with-Cucumber-B6FFA1)](https://www.npmjs.com/package/@badeball/cypress-cucumber-preprocessor/)
[![TypeScript](https://img.shields.io/badge/built%20with-TypeScript-blue)](https://www.typescriptlang.org/)
[![Formatting with Prettier](https://img.shields.io/badge/formatting-Prettier-ff69b4)](https://prettier.io/)
[![Test Report with Cypress-Mochawesome-Reporter](https://img.shields.io/badge/HTML%20reporter-cypress%20mochawesome%20reporter-ff69b4)](https://www.npmjs.com/package/cypress-mochawesome-reporter/)
[![Test Report with Cypress-Mochawesome-Reporter](https://img.shields.io/badge/slack%20reporter-cypress%20slack%20reporter-b1b1ff)](https://www.npmjs.com/package/cypress-slack-reporter/)

## Getting Started 🚀

This **README** covers UI tests using the Cypress Cucumber with TypeScript for assessment [DEMO-QA](https://demoqa.com/)

---

## Documentation

### **Cypress**

Cypress is a fast, reliable, and flexible JavaScript-based end-to-end testing framework built for modern web applications. It simplifies testing by providing a developer-friendly API to interact with web applications, handle network requests, and capture various testing aspects such as UI components and API responses.

- **Key Features**:

  - Runs in the same environment as the application (browser)
  - Automatically waits for actions (no need for explicit waits)
  - Handles AJAX, timers, and DOM events without extra configurations
  - Provides debugging capabilities through detailed error messages, stack traces, and snapshots
  - Parallel test execution and CI/CD integration

- **Cypress Configuration**:
  You can configure Cypress using the `cypress.config.ts` file for settings such as timeouts, base URLs, and environment variables.

  Learn more at [Cypress Documentation](https://docs.cypress.io).

### **Cucumber**

Cucumber is a Behavior-Driven Development (BDD) tool that allows you to write human-readable test scenarios in Gherkin syntax. It emphasizes collaboration between developers, testers, and non-technical stakeholders. Cucumber tests are written in plain English using the Given-When-Then structure, which makes it easy for everyone to understand the requirements.

- **Key Concepts**:
  - **Feature Files**: Where tests are written in Gherkin.
  - **Step Definitions**: Code that executes steps described in feature files.
  - **Tags**: Categorize tests to control execution.
- **Example Gherkin Syntax**:

  ```gherkin
  Feature: User Login
    Scenario: Valid User Login
      Given I am on the login page
      When I type "username" and "password"
      Then I should see the dashboard page
  ```

  Learn more at [Cucumber Documentation](https://cucumber.io/docs/guides/10-minute-tutorial/).

---

# Cypress Cucumber TypeScript UI Testing

## Features

- **UI Testing**: Allows testing of UI elements with Gherkin syntax and Cucumber steps.
- **Dynamic Alias Handling**: Captures and replaces alias values (e.g., `href` links) in request bodies and supports visiting URLs stored from API responses.
- **Cucumber BDD Support**: Write both API and UI tests in Gherkin syntax, integrated with TypeScript step definitions.

---

## Prerequisites

1. Node should be installed
2. Any Javascript enabled IDE (VS Code is recommended)
3. Recommended VScode extension @cucumberopen.cucumber-official

## Installation

1. Clone the repository and navigate to the project directory.

   ```bash
   https://github.com/qaPaschalE/cypress-ts-cucumber-framework.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables in a `.env` file for sensitive values (optional):

```env
BASE_URL= https://www.saucedemo.com/
```

---

## Folder Structure

```bash
|-- cypress/
  |-- e2e/
      |-- features/
        |-- 1. onboarding/
            |-- ui.feature
      |-- step_definitions/
        |-- index.ts
  |-- support/
      |-- commands.ts
      |-- e2e.ts
  |-- fixtures/
      |-- selectors.json
|-- README.md
|-- package.json
|-- .env.example
|-- cypress.config.ts
```

---

## Running Tests

### Open Cypress Test Runner

```bash
npm run cypress:open
```

This will open the interactive test runner, where you can choose API or UI test files to run.

### Headless Test Execution

To run tests locally in headless mode, use the following command:

```bash
npm run cypress:run
```

To run specific tests locally in headless mode using tags, use the following command:

```bash
npm run viewAndCheckout
```

---

## Example Test Scenarios

### UI Test Scenario

```gherkin
Feature: Cart
I want to Filter Item, Add to cart and Remove from cart

  Background: Precondition- User should visit site and log in
    Given I visit "/"
    And I find input by placeholder text "Username"
    And I type "standard_user"
    And I get element by selector "#password"
    And I type "secret_sauce"
    And I click on text "Login"
    Then I see text "Products"

  Scenario: Add to cart
    When I find buttons by text "Add to cart"
    And I get 1st element
    And I click
    Then I see text "Remove"
```

## Observations and Blockers

```gherkin
When I visit "/"
## fails to load events after first run.
# Tip use the @tag scripts to run individual tests on open mode e.g @filterItems
# Tip use a different browser for each run
```

```json
"scripts": {
    "cypress:open": "dotenv -- cypress open",
    "cypress:run": "dotenv -- cypress run",
    "add-to-cart":"dotenv -- cypress run --env tags=@addToCart --browser chrome",
    "remove-from-cart":"dotenv -- cypress run --env tags=@removeFromCart --browser chrome",
    "filterItems":"dotenv -- cypress run --env tags=@filterItems --browser chrome",
    "viewAndCheckout":"dotenv -- cypress run --env tags=@viewAndCheckout --browser chrome"
  },
```

---

## Contributing

Feel free to open issues or pull requests if you encounter bugs or have suggestions for new features or improvements.

---

## License

This project is licensed under the MIT License.

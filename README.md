# SeamlessHR TestOps Assessment 🎉

<table align="center" style="margin-bottom:30px;"><tr><td align="center" width="9999" heigth="9999 " >
 <img src="https://seamlesshr.com/wp-content/uploads/2024/04/logo.webp" alt="seamlessHR Logo" style="margin-top:25px;" align="center"/>

#

SeamlessHR TestOps Assessment using Cypress Cucumber and TypeScript.

</td></tr></table>

[![Cypress](https://img.shields.io/badge/Tested%20with-Cypress-15B392)](https://www.cypress.io/)
[![Cucumber](https://img.shields.io/badge/Tested%20with-Cucumber-B6FFA1)](https://www.npmjs.com/package/@badeball/cypress-cucumber-preprocessor/)
[![TypeScript](https://img.shields.io/badge/Tested%20with-TypeScript-blue)](https://www.typescriptlang.org/)
[![Formatting with Prettier](https://img.shields.io/badge/formatting-Prettier-ff69b4)](https://prettier.io/)
[![Test Report with Cypress-Mochawesome-Reporter](https://img.shields.io/badge/HTML%20reporter-cypress%20mochawesome%20reporter-ff69b4)](https://www.npmjs.com/package/cypress-mochawesome-reporter/)

## Getting Started 🚀

This **README** covers UI tests using the Cypress Cucumber with TypeScript for assessment [PARABANK](https://parabank.parasoft.com/parabank/index.htm)

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
   https://github.com/qaPaschalE/SeamlessHR-TestOps-Assessment.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables in a `.env` file for sensitive values (optional):

```env
BASE_URL= https://parabank.parasoft.com/parabank
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
npm run cy:suite:account
```

## Contributing

Feel free to open issues or pull requests if you encounter bugs or have suggestions for new features or improvements.

---

## License

This project is licensed under the MIT License.

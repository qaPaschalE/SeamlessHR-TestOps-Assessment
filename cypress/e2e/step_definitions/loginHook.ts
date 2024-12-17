import { When } from "@badeball/cypress-cucumber-preprocessor";

/**
 * Logs into the application with support for email/password as:
 * - Direct string
 * - Stored alias
 * - Value extracted dynamically from a JSON file using dot notation
 */
export function loginToApp(
  appName: string,
  emailOrPath?: string,
  passwordOrAlias?: string
) {
  const loginUrl = Cypress.env(appName.toUpperCase() + "_BASE_URL");

  if (!loginUrl) {
    throw new Error(
      `Environment variable for ${appName.toUpperCase()}_BASE_URL is not set.`
    );
  }

  /**
   * Resolves a value from a direct string, alias, or JSON file path.
   * @param value - Direct string, alias, or JSON file path in `fileName.fieldName` format.
   * @returns - A Cypress chainable that resolves to a string.
   */
  function resolveValue(value: string): Cypress.Chainable<string> {
    if (value.startsWith("@")) {
      // Fetch value from alias
      return cy.get(value).then((aliasValue) => {
        if (typeof aliasValue !== "string") {
          throw new Error(`Alias "${value}" did not resolve to a string.`);
        }
        return aliasValue;
      });
    } else if (value.endsWith(".json")) {
      // Handle case where the file name is provided directly without a field
      return cy.fixture(value).then((data) => {
        const firstKey = Object.keys(data)[0];
        if (!firstKey) {
          throw new Error(
            `JSON file "${value}" is empty or does not have top-level fields.`
          );
        }
        return data[firstKey]; // Return the first top-level key's value
      });
    } else if (value.includes(".json")) {
      // Handle case where both the file name and field name are provided
      const lastDotIndex = value.lastIndexOf(".");
      const fileName = value.slice(0, lastDotIndex); // Extract the file name
      const fieldName = value.slice(lastDotIndex + 1); // Extract the field name after the last dot

      return cy.fixture(`${fileName}`).then((data) => {
        const resolvedValue = data[fieldName];
        if (!resolvedValue) {
          throw new Error(
            `Field "${fieldName}" not found in JSON file "${fileName}.json". Ensure it exists and is correctly named.`
          );
        }
        return resolvedValue;
      });
    } else {
      // Return direct string
      return cy.wrap(value);
    }
  }

  cy.session(
    "login",
    () => {
      cy.visit(loginUrl);

      cy.get("body").then(($body) => {
        if ($body.find(':contains("Customer Login")').length) {
          cy.log("Token expired or not logged in; proceeding to log in.");

          // Resolve email and password values
          resolveValue(emailOrPath!).then((email) => {
            resolveValue(passwordOrAlias!).then((password) => {
              cy.get("[name=username]").type(email);
              cy.get("[name=password]").type(password);
              cy.contains("Log In").click();
              cy.contains("Welcome", { timeout: 10000 }).should("be.visible");
            });
          });
        } else {
          cy.log("User is already logged in; no login action taken.");
        }
      });
    },
    {
      cacheAcrossSpecs: true,
    }
  );
}

When(
  "I login to the {string} with {string} and {string} as password",
  (appName: string, emailOrPath: string, passwordOrAlias: string) => {
    loginToApp(appName, emailOrPath, passwordOrAlias);
  }
);

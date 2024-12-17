import { Then } from "@badeball/cypress-cucumber-preprocessor";
import { getCypressElement } from "cypress-cucumber-steps";
/**
 * Then I should see the typed text:
 *
 * ```gherkin
 * Then I should see {string} in the element
 * ```
 *
 * Verifies that the element contains the typed text.
 */
/**
 * Then I should not see the typed text:
 *
 * ```gherkin
 * Then I should not see {string} in the element
 * ```
 *
 * Verifies that the element does not contain the typed text.
 */
/**
 * Then the table should be empty:
 *
 * ```gherkin
 * Then the table should be empty
 * ```
 *
 * Validates that the table contains no rows (e.g., after a filter returns no results).
 */
Then("I do not see {string} in the element", (textOrAlias: string) => {
  if (textOrAlias.startsWith("@")) {
    cy.get(textOrAlias).then((storedText) => {
      getCypressElement().should("not.include.text", storedText);
    });
  } else {
    getCypressElement().should("not.include.text", textOrAlias);
  }
});

Then("I see {string} in the element", (textOrAlias: string) => {
  if (textOrAlias.startsWith("@")) {
    cy.get(textOrAlias).then((storedText) => {
      getCypressElement().should("contain", storedText);
    });
  } else {
    getCypressElement().should("contain", textOrAlias);
  }
});

Then("I see empty table", () => {
  getCypressElement().find("tbody tr").should("have.length", 0); // For a table using <tbody> and <tr> tags
});

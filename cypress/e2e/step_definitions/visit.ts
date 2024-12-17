import { DataTable, When } from "@badeball/cypress-cucumber-preprocessor";
import { getOptions } from "cypress-cucumber-steps";

/**
 * When I visit URL with alias replacement:
 *
 * ```gherkin
 * When I visit {string}
 * ```
 *
 * @example
 *
 * With absolute URL:
 *
 * ```gherkin
 * When I visit "https://example.com/"
 * ```
 *
 * With alias replacement:
 *
 * ```gherkin
 * When I visit "https://facebook.com/{profile}"
 * ```
 *
 * @remarks
 *
 * If the URL contains a placeholder (e.g., `{profile}`), the function replaces it with the value from the alias.
 *
 * Cypress [`baseUrl`](https://docs.cypress.io/guides/references/configuration#e2e) must be defined for relative URLs to work.
 *
 * If the page does not respond with a `2xx` status code, then this step will fail:
 *
 * ```gherkin
 * When I visit "/404" # fail
 * ```
 *
 * @param url - The URL to visit, potentially containing alias placeholders in `{aliasName}` format.
 * @param options - Additional Cypress visit options.
 */

When("I visit the stored href {string}", (aliasName: string) => {
  cy.get(`@${aliasName}`).then((href: any) => {
    cy.visit(href);
  });
});

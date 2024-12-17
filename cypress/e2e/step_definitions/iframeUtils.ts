import { DataTable, When } from "@badeball/cypress-cucumber-preprocessor";
import { getOptions } from "cypress-cucumber-steps";

/**
 * Function to switch to iframe context and run actions inside it
 */
export function withinIframe(iframeSelector: string, action: () => void) {
  cy.get(iframeSelector).then(($iframe) => {
    const body = $iframe.contents().find("body");
    cy.wrap(body).within(() => {
      action();
    });
  });
}
/**
 * When I type into an input field inside an iframe
 *
 * ```gherkin
 * When I type {string} into input field {string} within iframe {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I type "Hello, world!" into input field "#name-input" within iframe "#my-iframe"
 * ```
 */
When(
  "I type {string} into input field {string} within iframe {string}",
  (text: string, inputSelector: string, iframeSelector: string) => {
    // Switch to iframe context and type into the input field
    withinIframe(iframeSelector, () => {
      cy.get(inputSelector).type(text, getOptions());
    });
  },
);

/**
 * When I click button inside iframe
 *
 * ```gherkin
 * When I click button {string} within iframe {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I click button "#submit-btn" within iframe "#my-iframe"
 * ```
 */
When(
  "I click button {string} within iframe {string}",
  (buttonSelector: string, iframeSelector: string) => {
    // Switch to iframe context and click the button
    withinIframe(iframeSelector, () => {
      cy.get(buttonSelector).click(getOptions());
    });
  },
);

When(
  "I click link {string} within iframe {string}",
  (linkSelector: string, iframeSelector: string) => {
    // Switch to iframe context and click the link/button
    withinIframe(iframeSelector, () => {
      cy.get(linkSelector)
        .then(($link) => {
          // Check if the link has target="_blank" and remove it
          if ($link.attr("target") === "_blank") {
            $link.removeAttr("target");
            cy.log('Removed target="_blank" from the link.');
          }
        })
        .click(getOptions());
    });
  },
);
/**
 * When I click link by text inside an iframe
 *
 * ```gherkin
 * When I click link "Sign in" within iframe "#my-iframe"
 * ```
 *
 * This handles clicking on a link by its visible text inside an iframe, ensuring that if the link has a target="_blank",
 * it is removed before clicking to prevent it from opening in a new tab.
 *
 * @example
 *
 * ```gherkin
 * When I click link "Sign in" within iframe "#my-iframe"
 * ```
 */
When(
  "I click link text {string} within iframe {string}",
  (linkText: string, iframeSelector: string) => {
    // Switch to iframe context and click the link by text
    withinIframe(iframeSelector, () => {
      cy.contains("a", linkText) // Find the link by its text content
        .then(($link) => {
          // Check if the link has target="_blank" and remove it
          if ($link.attr("target") === "_blank") {
            $link.removeAttr("target");
            cy.log('Removed target="_blank" from the link.');
          }
        })
        .click(getOptions()); // Click the link
    });
  },
);

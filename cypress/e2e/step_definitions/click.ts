import {
  getCypressElement,
  getOptions,
  setCypressElement,
} from "cypress-cucumber-steps";
import { When } from "@badeball/cypress-cucumber-preprocessor";

/**
 * Clicks on a link or text with specified text, removing `target="_blank"` if present to keep it on the same page.
 *
 * ```gherkin
 * And I click on text {string} or link with target="_blank" attribute
 * ```
 *
 * @example
 *
 * ```gherkin
 * And I click on text "Sign in" or link with target="_blank" attribute
 * ```
 *
 * With [target removal](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes):
 *
 * This command removes the `target="_blank"` attribute, preventing navigation to a new tab or window, and
 * clicks the link in the current context. If the link points to an external domain, it uses `cy.origin`.
 *
 * @param linkText - The visible text of the link or text element to click.
 * @remarks
 *
 * This command is helpful for handling links that would otherwise open in a new tab.
 * It also uses {@link getCypressElement}, {@link getOptions}, and {@link setCypressElement} to interact with the element.
 * The `isCrossDomain` function is used to check if the link points to a different domain and handles it accordingly.
 */
export function clickLinkOrText(linkText: string) {
  setCypressElement(cy.contains(linkText, getOptions()));

  getCypressElement().then(($link) => {
    const targetAttr = $link.attr("target");
    const hrefAttr = $link.attr("href");

    if (targetAttr === "_blank" && hrefAttr) {
      cy.wrap($link)
        .invoke("removeAttr", "target")
        .then(() => {
          if (isCrossDomain(hrefAttr)) {
            cy.log(`Navigating to external URL: ${hrefAttr}`);
            cy.origin(hrefAttr, () => {
              cy.wrap($link).click();
            });
          } else {
            cy.wrap($link).click();
          }
        });
    } else {
      cy.wrap($link).click();
    }
  });
}

// Helper function to determine if a link is cross-domain
function isCrossDomain(url: string) {
  const linkDomain = new URL(url).hostname;
  const currentDomain = new URL(Cypress.config("baseUrl") || "").hostname;
  return linkDomain !== currentDomain;
}
When("I click on target link text {string}", (linkText: string) => {
  clickLinkOrText(linkText);
});

/**
 * When I click the stored href value in iframe:
 *
 * ```gherkin
 * When I click stored href in "{string}" iframe
 * ```
 *
 * This command clicks the link inside the iframe using the stored href value and removes the `target="_blank"` attribute if present.
 *
 * @example
 *
 * ```gherkin
 * When I click stored href in "#my-iframe"
 * ```
 */
When("I click stored href in {string} iframe", (iframeSelector: string) => {
  // Get the stored href value
  cy.get("@iframeLink").then((hrefValue) => {
    // Locate the link inside the iframe based on the stored href
    cy.get(iframeSelector).then(($iframe) => {
      const iframeElement = $iframe[0] as HTMLIFrameElement;
      const iframeDocument =
        iframeElement.contentDocument || iframeElement.contentWindow?.document;

      if (iframeDocument) {
        const link = iframeDocument.querySelector(`a[href="${hrefValue}"]`);

        if (link) {
          // If the link has target="_blank", remove it before clicking
          if (link.getAttribute("target") === "_blank") {
            link.removeAttribute("target");
          }

          // Click the link
          cy.wrap(link).click();
          cy.log(`Clicked on the link with href: ${hrefValue}`);
        } else {
          throw new Error(`Link with href "${hrefValue}" not found in iframe.`);
        }
      } else {
        throw new Error("Unable to access iframe document.");
      }
    });
  });
});

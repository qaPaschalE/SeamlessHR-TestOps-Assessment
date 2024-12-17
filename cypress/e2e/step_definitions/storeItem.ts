import { When } from "@badeball/cypress-cucumber-preprocessor";
import { getCypressElement } from "cypress-cucumber-steps";
import dayjs from "dayjs";

/**
 * When I store text from various selectors:
 *
 * ```gherkin
 * When I store element text as {string}
 * ```
 *
 * This command retrieves the visible text of an element based on various attributes like `name`, `alt_text`, `label_text`, `placeholder_text`, `testid`, `text`, `role`, and `title`,
 * trims it, and stores it under the provided alias.
 *
 * @example
 *
 * Store the visible text from an element by its label text as "labelText":
 *
 * ```gherkin
 * When I store element text as "labelText"
 * ```
 *
 * You can use different attributes like `name`, `alt_text`, `label_text`, `placeholder_text`, `testid`, `text`, `role`, `title` to locate elements.
 *
 * @param selectorType - Type of selector (e.g., name, alt_text, label_text, etc.)
 * @param alias - The name under which the retrieved text should be stored
 */
export function When_I_store(alias: string) {
  //   // Store the element for further chaining
  //   setCypressElement(getCypressElement());

  // Get and trim the visible text from the element, then save it as an alias
  getCypressElement()
    .invoke("val")
    .then((text) => {
      const visibleText = text.trim(); // Trim leading/trailing spaces
      cy.wrap(visibleText).as(alias); // Store trimmed text with the alias
    });
}
export function When_I_copy_text_value(alias: string) {
  //   // Store the element for further chaining
  //   setCypressElement(getCypressElement());

  // Get and trim the visible text from the element, then save it as an alias
  getCypressElement()
    .invoke("text") // Get the text content of the element
    .then((uiDate: string) => {
      const trimmedDate = uiDate.trim(); // Ensure no extra spaces or line breaks
      cy.wrap(trimmedDate).as(alias); // Store it as an alias
      cy.log(`Stored UI Date: ${trimmedDate}`);
    });
}
/**
 * Parse and adjust a stored date.
 * @param storedDate - The original date as a string.
 * @param adjustment - An object with the number and unit for adjustment (e.g., { number: 1, unit: "week" }).
 * @returns The adjusted date in 'YYYY-MM-DD' format.
 */

/**
 * Adjust a stored date, falling back to the current date if the format is invalid.
 *
 * @param storedDate - The original date as a string.
 * @param adjustment - An object with the number and unit for adjustment (e.g., { number: 1, unit: "week" }).
 * @returns The adjusted date in 'YYYY-MM-DD' format.
 */
export function getAdjustedDate(
  storedDate: string,
  adjustment: { number: number; unit: dayjs.ManipulateType },
): string {
  let parsedDate = dayjs(storedDate, [
    "MMM D, YYYY. h:mma",
    "MMM D, YYYY h:mma",
    "YYYY-MM-DD", // Add more fallback formats as needed
  ]);

  // If the parsed date is invalid, default to the current date
  if (!parsedDate.isValid()) {
    parsedDate = dayjs(); // Use the current date
  }

  return parsedDate
    .subtract(adjustment.number, adjustment.unit)
    .format("YYYY-MM-DD");
}
/**
 * When I store an adjusted date:
 *
 * ```gherkin
 * When I store {string} {string} {string} before as {string}
 * ```
 *
 * This step adjusts a stored date by a given number and unit, and stores the result for later use.
 *
 * @example
 * When I store "@storedDate" "1" "week" before as "adjustedDate"
 */
When(
  "I store {string} {string} {string} before as {string}",
  (
    storedDateAlias: string,
    number: string,
    unit: string,
    aliasName: string,
  ) => {
    cy.get(`@${storedDateAlias}`).then((storedDate: any) => {
      const adjustedDate = getAdjustedDate(storedDate, {
        number: parseInt(number),
        unit: unit as dayjs.ManipulateType,
      });
      cy.log(adjustedDate);
      cy.wrap(adjustedDate).as(aliasName); // Store the adjusted date as an alias
    });
  },
);

// Gherkin step definition
// Type a date relative to a stored date

When("I store input text as {string}", When_I_store);
When("I store element text as {string}", When_I_copy_text_value);

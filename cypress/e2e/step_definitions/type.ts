import { DataTable, When } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import { getCypressElement, getOptions } from "cypress-cucumber-steps";
import dayjs from "dayjs";

/**
 * When I type:
 *
 * ```gherkin
 * When I type {string}
 * ```
 *
 * @example
 *
 * ```gherkin
 * When I type "Hello, world!"
 * ```
 *
 * With [options](https://docs.cypress.io/api/commands/type#Arguments):
 *
 * ```gherkin
 * When I type "Hello, world!"
 *   | animationDistanceThreshold | 5 |
 *   | delay | 10 |
 *   | force | false |
 *   | log | true |
 *   | parseSpecialCharSequences | true |
 *   | release | true |
 *   | scrollBehavior | top |
 *   | timeout | 4000 |
 *   | waitForAnimations | true |
 * ```
 *
 * @remarks
 *
 * A preceding step like {@link When_I_find_element_by_label_text | "When I find element by label text"} is required. For example:
 *
 * ```gherkin
 * When I find element by label text "Email"
 *   And I type "user@example.com"
 * ```
 *
 * Text may include [special character sequences](https://docs.cypress.io/api/commands/type#Syntax). For example:
 *
 * ```gherkin
 * # types the Enter key
 * When I type "{enter}"
 * ```
 */
/**
 /**
 * When I type a string or stored text:
 *
 * ```gherkin
 * When I type {string}
 * ```
 *
 * This command types either a regular string or a stored text (if alias) into the currently chained element.
 *
 * @example
 *
 * Type a regular string:
 *
 * ```gherkin
 * When I type "Hello World"
 * ```
 *
 * Type a stored value:
 *
 * ```gherkin
 * When I type the stored "storedText"
 * ```
 */
export function When_I_type(textOrAlias: string) {
  // Check if the text starts with "@" indicating it's an alias (stored text)
  if (textOrAlias.startsWith("@")) {
    cy.get(textOrAlias).then((storedText: any) => {
      // Type the stored text into the already chained element
      getCypressElement().type(storedText);
    });
  } else {
    // If it's not an alias, just type the string directly
    getCypressElement().type(textOrAlias);
  }
}

export function When_I_copy_text(textOrAlias: string, options?: DataTable) {
  // Check if the text starts with "@" indicating it's an alias (stored text)
  if (textOrAlias.startsWith("@")) {
    getCypressElement()
      .type(textOrAlias)
      .then((storedText: any) => {
        // Type the stored text into the already chained element
        getCypressElement().invoke("val", storedText, getOptions(options));
      });
  } else {
    // If it's not an alias, just type the string directly
    getCypressElement().invoke("val", textOrAlias, getOptions(options));
  }
}

// Gherkin step definition
When("I type the stored {string}", When_I_type);
// Add faker mapping for each field
const fakerMapping: { [key: string]: () => string } = {
  "First Name": () => faker.person.middleName(),
  "Last Name": () => faker.person.middleName(),
  Email: () => faker.internet.email(),
  "Phone Number": () => faker.string.numeric(11),
  Number: () => faker.string.numeric(6),
  "Company Name": () => faker.company.name(),
  "Full Name": () => faker.person.fullName(),
  "User Name": () => faker.internet.username(),
  Address: () => faker.location.streetAddress({ useFullAddress: true }),
  "Disposable Email": () =>
    faker.internet.email({ provider: "inboxkitten.com" }), // Default to a random email if emailAddress is undefined
  "Alpha Numeric": () => faker.string.numeric(11) + "e",
  "Lorem Word": () => faker.lorem.sentences({ min: 1, max: 3 }),
  "Current Date": () => dayjs().format("YYYY-MM-DD"),

  // Add more field mappings as necessary
};

function getFakerValue(fieldLabel: string): string {
  return fakerMapping[fieldLabel] ? fakerMapping[fieldLabel]() : fieldLabel;
}

export function When_I_type_random(fieldLabel: string, options?: DataTable) {
  const text = getFakerValue(fieldLabel); // Use faker to generate value if applicable
  const optionSettings = getOptions(options); // Retrieve options from DataTable

  getCypressElement().type(text, optionSettings); // Use options if available
}

export function When_I_fill_random(fieldLabel: string, options?: DataTable) {
  const text = getFakerValue(fieldLabel); // Use faker to generate value if applicable
  const optionSettings = getOptions(options); // Retrieve options from DataTable

  getCypressElement().invoke("val", text, optionSettings); // Use options if available
}

/**
 * Get the current date in 'YYYY-MM-DD' format.
 * @returns The current date.
 */
export function getCurrentDate(): string {
  return dayjs().format("YYYY-MM-DD");
}
// Gherkin step definition

When("I type stored {string}", When_I_type);
When("I type random {string}", When_I_type_random);
When("I fill stored {string}", When_I_copy_text);
When("I fill {string}", When_I_fill_random);
When("I fill random {string}", When_I_fill_random);

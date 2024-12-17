import { When } from "@badeball/cypress-cucumber-preprocessor";

/**
 * Writes stored alias data to a JSON file in the Cypress fixtures folder.
 *
 * @param aliasName - The alias name containing the stored text.
 * @param fileName - The name of the JSON file to write into the fixtures folder.
 */
export function writeAliasToJsonFile(
  aliasName: string,
  fileName: string
): void {
  cy.get(`@${aliasName}`).then((storedData) => {
    if (!storedData) {
      throw new Error(`No data found in alias "${aliasName}".`);
    }

    // Structure the data to be written into the JSON file
    const jsonData = {
      [aliasName]: storedData,
    };

    const filePath = `cypress/fixtures/${fileName}.json`;

    // Write the data to the JSON file
    cy.writeFile(filePath, jsonData).then(() => {
      cy.log(`Alias "${aliasName}" written to ${filePath}`);
    });
  });
}

export function updateJsonFileWithAlias(aliasName: string, fileName: string) {
  cy.get(`@${aliasName}`).then((storedValue) => {
    if (typeof storedValue !== "string") {
      throw new Error(`Alias "${aliasName}" does not contain a string value.`);
    }

    const filePath = `cypress/fixtures/${fileName}`;

    // Attempt to read the existing file and handle it if it doesn't exist
    cy.readFile(filePath).then((currentData) => {
      let jsonData = {};

      /// If the file exists and contains data, merge it with the new value
      if (currentData && typeof currentData === "object") {
        jsonData = currentData;
      }

      // Dynamically set the key as the alias name and value as the stored alias value
      jsonData[aliasName] = storedValue;

      // Write the updated data back to the file
      cy.writeFile(filePath, jsonData, { log: false }).then(() => {
        cy.log(
          `Successfully updated ${fileName}: added key "${aliasName}" with value "${storedValue}"`
        );
      });
    });
  });
}

// Step Definition
When(
  "I update the JSON file {string} with the stored alias {string}",
  (fileName: string, aliasName: string) => {
    updateJsonFileWithAlias(aliasName, fileName);
  }
);

When(
  "I write the alias {string} to the JSON file {string}",
  (aliasName: string, fileName: string) => {
    writeAliasToJsonFile(aliasName, fileName);
  }
);

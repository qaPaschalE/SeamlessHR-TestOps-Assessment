import { DataTable, When, Then } from "@badeball/cypress-cucumber-preprocessor";

/**
 * Function to make an HTTP request dynamically.
 * Supports multiple methods (GET, POST, etc.), with dynamic data, headers, and parameters.
 * Handles dynamically captured Authorization token.
 */
const methods = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
  "HEAD",
  "OPTIONS",
  "TRACE",
  "COPY",
  "LOCK",
  "MKCOL",
  "MOVE",
  "PURGE",
  "PROPFIND",
  "PROPPATCH",
  "UNLOCK",
  "REPORT",
  "MKACTIVITY",
  "CHECKOUT",
  "MERGE",
  "M-SEARCH",
  "NOTIFY",
  "SUBSCRIBE",
  "UNSUBSCRIBE",
  "SEARCH",
  "CONNECT",
];
export function When_I_make_a_request(
  method: (typeof methods)[number],
  url: string,
  dataTable?: DataTable,
) {
  cy.get("@apiKey").then((apiKey) => {
    const requestOptions: any = { method, url, headers: {} };

    // Add authorization header based on API key
    if (apiKey) {
      requestOptions.headers["X-Api-Key"] = apiKey;
    }

    // Handle data table parameters (if provided)
    if (dataTable?.rowsHash()) {
      if (method.toUpperCase() === "GET") {
        requestOptions.qs = dataTable.rowsHash(); // Query parameters for GET
      } else {
        requestOptions.body = dataTable.rowsHash(); // Body for POST, PUT, etc.
      }
    }

    // Make the request and assign the response to the global variable
    cy.request(requestOptions).then((response) => {
      cy.wrap(response).as("response");
      captureAuthorizationTokenFromResponse(response); // Store response body in global variable
    });
  });
}
export function When_I_make_simple_a_request(
  method: (typeof methods)[number],
  url: string,
  dataTable?: DataTable,
) {
  const requestOptions: any = { method, url };

  // Handle data table parameters (if provided)
  if (dataTable?.rowsHash()) {
    if (method.toUpperCase() === "GET") {
      requestOptions.qs = dataTable.rowsHash(); // Query parameters for GET
    } else {
      requestOptions.body = dataTable.rowsHash(); // Body for POST, PUT, etc.
    }
  }

  // Make the request and assign the response to the global variable
  cy.request(requestOptions).then((response) => {
    cy.wrap(response).as("response");
    captureAuthorizationTokenFromResponse(response); // Store response body in global variable
  });
}
export function When_I_get_exiting_email_or_create_disposable_email(
  method: (typeof methods)[number],
  url: string,
  dataTable?: DataTable,
) {
  cy.get("@apiKey").then((apiKey) => {
    const requestOptions: any = { method, url, headers: {} };

    // Add authorization header based on API key
    if (apiKey) {
      requestOptions.headers["X-Api-Key"] = apiKey;
    }

    // Handle data table parameters (if provided)
    if (dataTable?.rowsHash()) {
      if (method.toUpperCase() === "GET") {
        requestOptions.qs = dataTable.rowsHash(); // Query parameters for GET
      } else {
        requestOptions.body = dataTable.rowsHash(); // Body for POST, PUT, etc.
      }
    }

    // Make the request and assign the response to the global variable
    cy.request(requestOptions).then((response) => {
      if (
        Array.isArray(response.body.content) &&
        response.body.content.length === 0
      ) {
        cy.request({
          method: "POST",
          url: `https://api.mailslurp.com/inboxes?emailAddress=product.tester@mailslurp.net&inboxType=HTTP_INBOX`,
          headers: {
            "x-api-key": apiKey, // Replace 'your-api-key' with your actual API key
          },
        }).then((res) => {
          expect(res.body.content[0].emailAddress).to.include(
            "product.tester@mailslurp.net",
          );
        });
      }
      cy.wrap(response).as("response");
      captureAuthorizationTokenFromResponse(response); // Store response body in global variable
    });
  });
}

export function captureHrefFromNestedArray(
  response: any,
  arrayField: string,
  nestedField: string,
  aliasName: string,
) {
  const dataArray = response.body[arrayField];
  const href = dataArray.find((item: any) => item[nestedField]).emailBody.href; // Assuming href is inside emailBody
  const trimmedHref = href.trim(); // Trim the href if necessary
  cy.wrap(trimmedHref).as(aliasName); // Store the href under the alias
}
let globalResponse: any = {}; // Declare a global variable to store the response
let value: any = {};
export function captureAuthorizationTokenFromResponse(response: any) {
  globalResponse = response.body; // Assign the response body to the global variable
}

/**
 * Function to replace stored alias in the request body and make a new request.
 */
export function useStoredAliasInRequest(
  method: string,
  url: string,
  requestData: any,
) {
  const modifiedData = { ...requestData };

  // Replace placeholders with stored alias values
  Object.keys(modifiedData).forEach((key) => {
    if (modifiedData[key].includes("{")) {
      const alias = modifiedData[key].replace(/[{}]/g, ""); // Remove curly braces
      cy.get(`@${alias}`).then((aliasValue) => {
        modifiedData[key] = aliasValue; // Replace with actual value
      });
    }
  });

  // Fetch the API Key dynamically
  cy.get("@apiKey").then((apiKey) => {
    const headers: any = {};

    if (apiKey) {
      headers["X-Api-Key"] = apiKey;
    }

    // Make the new request using the modified data
    cy.request({
      method,
      url,
      headers,
      body: modifiedData,
    }).then((response) => {
      cy.wrap(response).as("response");
      captureAuthorizationTokenFromResponse(response); // Store token or other data as needed
    });
  });
}

/**
 * Function to validate that the response status matches the expected status.
 */
export function validateResponseStatus(statusCode: number) {
  cy.get("@response").its("status").should("eq", statusCode);
}

When("I make a {string} request to {string} with body", When_I_make_a_request);
When(
  "I make a {string} request to {string} with params",
  When_I_make_a_request,
);
When(
  "I make request {string} {string} if email exists or create disposable email",
  When_I_get_exiting_email_or_create_disposable_email,
);
When(
  "I make a simple {string} request to {string}",
  When_I_make_simple_a_request,
);
When(
  "I make a {string} request to {string} with token",
  (method: string, url: string, dataTable: DataTable) => {
    const requestData = dataTable?.rowsHash();
    cy.wait(5000);
    useStoredAliasInRequest(method, url, requestData);
  },
);

When(
  "I make a {string} request to {string} with params and token",
  (method: any, url: string, dataTable: DataTable) => {
    const requestData = dataTable?.rowsHash();
    When_I_make_a_request(method, url, dataTable);
  },
);
When(
  "I make a {string} request to {string} with params and token",
  (method: any, url: string, dataTable: DataTable) => {
    const requestData = dataTable?.rowsHash();
    When_I_make_a_request(method, url, dataTable);
  },
);

When(
  "I make a {string} request to {string} and use stored Authorization token",
  (method: any, url: string) => {
    When_I_make_a_request(method, url);
  },
);
When(
  "I capture href from response field {string}, nested field {string}, and store it as {string}",
  (arrayField: string, nestedField: string, aliasName: string) => {
    cy.get("@response").then((response) => {
      captureHrefFromNestedArray(response, arrayField, nestedField, aliasName);
    });
  },
);

When("I have an {string} API key", (app: string) => {
  Cypress.env();
  const apiKey = Cypress.env(`${app}_API_KEY`);
  expect(apiKey).to.exist;
  cy.wrap(apiKey).as("apiKey");
});
When(
  "I make a {string} request to {string} with API key",
  (method: string, url: string) => {},
);
Then("I should be able to access the {string}", (field: string) => {
  // Split the field string by dots and brackets to handle nested properties
  const fieldParts = field.split(/\.|\[|\].?/).filter(Boolean);
  let value = globalResponse.body;

  // Dynamically access each part of the field string
  fieldParts.forEach((part) => {
    value = value[part];
  });

  // Assert the value exists
  expect(value).to.exist;
  // Store the dynamically accessed value for later use as a Cypress alias
  cy.wrap(value).as(field); // This will allow you to access it later using `cy.get("@fieldName")`
});

Then(
  "I should access the {string} and store as {string}",
  (field: string, aliasName: string) => {
    const dynamicFieldParts = field.split(/[\[\]\.]+/).filter(Boolean); // Split the field on `[]` and `.` to handle arrays and nested fields

    let value = globalResponse;
    console.log(value);

    dynamicFieldParts.forEach((part) => {
      if (Array.isArray(value)) {
        // Handle array indexing (e.g., pick first/last or other strategies)
        if (part.toLowerCase() === "first") {
          value = value[0]; // Pick the first element
        } else if (part.toLowerCase() === "last") {
          value = value[value.length - 1]; // Pick the last element
        } else if (!isNaN(parseInt(part))) {
          value = value[parseInt(part)]; // If numeric, treat it as an array index
        }
      } else {
        value = value?.[part]; // Handle nested objects by dynamically accessing the field
      }
    });

    // Assert that the value exists
    expect(value).to.exist;
    console.log(value);
    // Store the value using the provided alias name
    cy.wrap(value).as(aliasName);
  },
);

When(
  'I make a {string} request to "{string}" with {string} as dynamic placeholder',
  (method: string, url: string, placeholder: string) => {
    // Match placeholders in the URL, e.g., {userId}
    const dynamicPlaceholderRegex = new RegExp(`\{${placeholder}\}`, "g");

    // Get the value stored in the placeholder alias
    cy.get(`@${placeholder}`).then((placeholderValue: any) => {
      // Replace the placeholder in the URL with the actual value
      const dynamicUrl = url.replace(dynamicPlaceholderRegex, placeholderValue);

      const requestOptions: any = {
        method,
        url: dynamicUrl,
      };

      // Make the request and alias the response
      cy.request(requestOptions).then((response) => {
        console.log(response);
        cy.wrap(response).as("response"); // Store the response for later use
        captureAuthorizationTokenFromResponse(response); // Optionally capture token or other data
      });
    });
  },
);

// Step to use a stored variable, trim its content, and extract OTP or href
When(
  "I extract {string} from stored {string} and store as {string}",
  (searchType: string, storedAlias: string, aliasName: string) => {
    cy.get(`@${storedAlias}`).then((storedValue: any) => {
      let extractedValue;

      // Trimming and extracting based on searchType
      if (searchType.toLowerCase() === "otp") {
        // Assume the OTP is a 6-digit code
        const otpRegex = /\b\d{6}\b/;
        extractedValue = storedValue.match(otpRegex)?.[0]; // Extract the first 6-digit number
      } else if (searchType.toLowerCase() === "href") {
        // Extract href link (basic href pattern)
        const hrefRegex = /href="([^"]+)"/;
        extractedValue = storedValue.match(hrefRegex)?.[1]; // Extract href value
      }

      // Assert that the extracted value exists
      expect(extractedValue).to.exist;

      // Store the extracted value with a new alias
      cy.wrap(extractedValue).as(aliasName);
    });
  },
);
// Step to use a stored variable, parse its content using DOMParser, and extract OTP or href
When(
  "I extract {string} from stored {string} using DOM parser and store as {string}",
  (searchType: string, storedAlias: string, aliasName: string) => {
    cy.get(`@${storedAlias}`).then((storedValue: any) => {
      let extractedValue;

      // Parse the stored HTML content using DOMParser
      const parser = new DOMParser();
      const doc = parser.parseFromString(storedValue, "text/html");

      // Extract based on the search type (otp or href)
      if (searchType.toLowerCase() === "otp") {
        // Assuming the OTP is inside an element, let's say a <span> with class "otp"
        const otpElement = doc.querySelector("span.otp");
        extractedValue = otpElement ? otpElement.textContent?.trim() : null;
      } else if (searchType.toLowerCase() === "href") {
        // Extract the href link from an <a> tag
        const anchorElement = doc.querySelector("a[href]");
        extractedValue = anchorElement
          ? anchorElement.getAttribute("href")
          : null;
      }

      // Assert that the extracted value exists
      expect(extractedValue).to.exist;

      // Store the extracted value with a new alias
      cy.wrap(extractedValue).as(aliasName);
    });
  },
);

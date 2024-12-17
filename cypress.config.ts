import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { preprocessor } from "@badeball/cypress-cucumber-preprocessor/browserify";
import cypressOnFix from "cypress-on-fix";
async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);
  // "cypress-on-fix" is required because "cypress-mochawesome-reporter" and "cypress-cucumber-preprocessor" use the same hooks
  on = cypressOnFix(on);

  require("cypress-mochawesome-reporter/plugin")(on);

  on(
    "file:preprocessor",
    preprocessor(config, {
      typescript: require.resolve("typescript"),
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  reporter: "cypress-mochawesome-reporter",
  video: true,
  retries: 1,
  env: {
    PARABANK_BASE_URL: process.env.BASE_URL,
  },
  e2e: {
    baseUrl: process.env.BASE_URL,
    specPattern: "**/*.feature",
    setupNodeEvents,
  },
});

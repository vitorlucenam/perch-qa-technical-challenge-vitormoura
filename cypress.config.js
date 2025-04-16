const { defineConfig } = require('cypress');
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: true,
    html: true,              
    json: false,               
    embeddedScreenshots: true,
    inlineAssets: true,
    charts: true
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('file:preprocessor', cucumber());
      return config;
    },
    specPattern: 'cypress/integration/**/*.feature',
    baseUrl: 'http://localhost:3000/',
    supportFile: 'cypress/support/e2e.js',
    video: false,
    screenshotOnRunFailure: true,
    experimentalRunAllSpecs: true,
    testIsolation: false
  },
});
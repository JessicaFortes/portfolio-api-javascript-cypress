const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: false,
    json: true,
    charts: true
  },
  e2e: {
    baseUrl: "https://fakestoreapi.com",
    video: false,
    setupNodeEvents(on, config) {
    },
  },
});

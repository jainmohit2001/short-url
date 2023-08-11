import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: Cypress.env('BASE_URL'),
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})

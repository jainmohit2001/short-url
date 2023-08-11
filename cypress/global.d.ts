declare namespace Cypress {
  interface Chainable<Subject = any> {
    loginWithGoogle(): Chainable<void>
  }
}

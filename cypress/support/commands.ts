Cypress.Commands.add('loginWithGoogle', () => {
  Cypress.Cookies.debug(true)
  // Stub the API to return a pre configured test session
  cy.intercept('/api/auth/session', { fixture: 'session.json' }).as('session')

  // Set cookie. This is currently being done manually.
  // TODO: Automate this
  cy.setCookie(
    'next-auth.session-token',
    Cypress.env('NEXT_AUTH_SESSION_TOKEN')
  )
})

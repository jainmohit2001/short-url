describe('Unauthenticated actions', () => {
  it('Should show Sign in with Google option when clicked on Dive in', () => {
    cy.visit('/')

    // Click on Dive In button
    cy.get('main').contains('Dive In').click()

    // Dashboard should be visible
    cy.url().should('include', '/dashboard')

    // Dashboard should have a Sign In with Google Button
    cy.get('main').contains('Sign in with Google')
  })

  it('Should go to homepage when clicked on Home button ', () => {
    cy.visit('/dashboard')

    // Click on the Home button
    cy.get('header').contains('Home').click()

    // Url should be equal to the HOST
    cy.url().should('equal', Cypress.env('BASE_URL') + '/')
  })
})

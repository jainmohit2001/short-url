describe('Unauthenticated content checks', () => {
  it('Homepage', () => {
    cy.visit('/')

    // Validate contents in Header
    cy.get('header a').get('img')
    cy.get('header a').contains('Home')
    cy.get('header').contains('Sign In')

    // Validate contents in body
    cy.get('main').contains('Short Url')
    cy.get('main').get('a').contains('Dive In')
    cy.get('main a').invoke('attr', 'href').should('eq', '/dashboard')
  })

  it('Dashboard', () => {
    cy.visit('/dashboard')

    // Check for Google Sign In Button
    cy.get('main').contains('Sign in with Google')
  })

  it('URLS API', () => {
    cy.visit('/api/urls')

    // Should redirect to Dashboard
    cy.url().should('include', '/dashboard')
  })
})

describe('Authenticated content checks', function () {
  beforeEach(() => {
    cy.loginWithGoogle()
  })

  it('Homepage', () => {
    cy.visit('/')
    // Check Content in Header
    cy.get('header').get('button').contains('Sign Out')
    cy.get('header').get('button').get('img')
  })

  it('Dashboard', () => {
    cy.visit('/dashboard')

    cy.get('main').should('contain', 'Total Urls')
  })
})

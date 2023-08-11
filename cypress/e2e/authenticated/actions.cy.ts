describe('Authenticated actions', () => {
  beforeEach(() => {
    cy.loginWithGoogle()
    cy.intercept({ method: 'GET', url: /\/api\/urls\?skip=\d+&take=\d+$/ }).as(
      'getUrls'
    )
    cy.intercept({ method: 'POST', url: '/api/urls' }).as('postUrl')
    cy.intercept({ method: 'DELETE', url: '/api/urls' }).as('deleteUrl')
  })

  it('Add Url', () => {
    const url = 'https://google.co.in'
    cy.visit('/dashboard')

    // Wait for URls to show up in the table
    cy.wait('@getUrls')

    // Click on Add URL Button
    cy.get('main').contains('Add Url').click()

    // Add input to the URL textField and submit the form
    cy.get('.MuiModal-root form').find('input[name="url"]').type(url)
    cy.get('.MuiModal-root form').submit()

    // Wait for the POST call to complete
    cy.wait('@postUrl')

    // Check if the url is now visible in the Table
    cy.get('table').contains(url)
  })

  it('Delete URL', () => {
    cy.visit('/dashboard')

    // Wait for URLs to show up in the Table
    cy.wait('@getUrls')

    // Make sure that at least one URL is present
    cy.get('table tbody tr').first()

    // Get the Short URL of the first row
    cy.get('table tbody tr')
      .first()
      .find('td:nth-child(2)')
      .find('p')
      .then(($p) => {
        const text = $p.text()
        // Click on the delete button of this row
        cy.get('table tbody tr')
          .first()
          .children()
          .last()
          .find('button')
          .click()

        // Wait for Delete API to complete
        cy.wait('@deleteUrl')

        // Element should not be in table now
        cy.get('table').should('not.contain', text)
      })
  })

  it('Check redirect functionality', () => {
    cy.visit('/dashboard')

    // Make sure a URL entry exists
    cy.get('table tbody tr').first()

    // Get the first short url
    cy.get('table tbody tr')
      .first()
      .children()
      .then(($tds) => {
        // Get the data from the row
        const expectedUrl = $tds.eq(0).find('p').text()
        const url = $tds.eq(1).find('p').text()

        // Cross check for thr redirect
        cy.request({ url: url, followRedirect: false }).then((resp) => {
          expect(resp.status).to.eq(307)
          expect(resp.redirectedToUrl).to.eq(expectedUrl)
        })
      })
  })
})

import {buildUser} from '../support/generate'

describe('smoke', () => {
  it('should allow a typical user flow', () => {
    // create a faker user
    const user = buildUser()
    // visit '/' (https://docs.cypress.io/api/commands/visit.html)
    cy.visit('/')

    // find the button named "register" and click it
    cy.findByRole('button', {name: /register/i}).click()

    // https://docs.cypress.io/api/commands/within.html#Syntax
    // https://docs.cypress.io/api/commands/type.html#Syntax
    // within the dialogue
    cy.findByRole('dialog').within(() => {
      // find the username field
      cy.get('#username').type('FAKE_USERNAME')
      // find the password field
      cy.get('#password').type('FAKE_PASSWORD')
      // click the reigster button to submit the form
      cy.findByRole('button', {name: /register/i}).click()
    })

    // wtihin the navigation
    cy.findByRole('navigation').within(() => {
      // find the link named 'discover' and click it
      cy.findByRole('link', {name: /discover/i}).click()
    })

    // within the main
    cy.findByRole('main').within(() => {
      // type in the searchbox the title of a book and hit enter
      cy.get('#search').type('The Hobbit').type('{enter}')
      // within the listItem with the name of your book
      cy.findByRole('listitem', {name: /the hobbit/i}).within(() => {
        // find the button named 'add to list' and click it
        cy.findByRole('button', {name: /add to list/i}).click()
      })
    })

    // click the reading list link in the navigation
    cy.findByRole('link', {name: /reading list/i}).click()

    // within the main
    cy.findByRole('main').within(() => {
      // ensure the main only has one element "listitem"
      // https://docs.cypress.io/api/commands/should.html (.should('have.length', 1))
      cy.findByRole('listitem').should('have.length', 1)
      // click the link with the name of the book added to the list to go the book's page
      cy.findByRole('link', {name: /the hobbit/i}).click()
    })

    // type in the notes textbox
    cy.findByRole('textbox', {name: /notes/i}).type(
      'Some dummy notes I made up on the spot.',
    )
    // the textbox is debounced, so the loading spinner won't show up immediately,
    // so to make sure this is working, we need to wait for the spinner to show up,
    // and then wait for it to go away
    cy.get('[aria-label="loading"]').should('exist')
    cy.get('[aria-label="loading"]').should('not.exist')

    // mark the book as read
    cy.findByRole('button', {name: /mark as read/i}).click()

    // click the 5 star rating radio button
    // {force: true} forces the radio buttons to be clickable as they're hidden normally in favour of the stars
    // https://docs.cypress.io/api/commands/click.html#Arguments
    cy.findByRole('radio', {name: /5 stars/i}).click({force: true})

    // navigate to the finished books page
    cy.findByRole('link', {name: /finished books/i}).click()

    // within main
    cy.findByRole('main').within(() => {
      // make sure there is only one listitem here
      cy.findByRole('listitem').should('have.length', 1)
      // make sure the 5 star radio button is checked
      cy.findByRole('radio', {name: /5 stars/i}).should('be.checked')
      // click the link for the book to go back to the books page again
      cy.findByRole('link', {name: /the hobbit/i}).click()
    })

    // remove the book from the list
    cy.findByRole('button', {name: /remove from list/i}).click()

    // ensure the notes textbox is gone
    cy.findByRole('textbox', {name: /notes/i}).should('not.exist')
    // ensure the rating radio buttons are gone
    cy.findByRole('radio').should('not.exist')

    //  navigate back to the finished books page
    cy.findByRole('link', {name: /finished books/i}).click()

    // ensure there are no books in the list
    cy.findByRole('listitem').should('have.length', 0)
  })
})

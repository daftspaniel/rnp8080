/* eslint-disable no-undef */
describe('Basic Text Entry Test', function() {
  before(() => {
    cy.visit('http://localhost:3000/')
    cy.get('.Editor').type('{selectall}Hello world!')
  })

  it('Entering text into the editor', function() {
    cy.get('.Editor').should('have.text', 'Hello world!')
  })
})

/* eslint-disable no-undef */
describe('Main menu display Test', function() {
  before(() => {
    cy.visit('http://localhost:3001/')
  })

  it('should have a Start menu', function() {
    cy.get('.Menu')
      .eq(0)
      .should('have.text', 'Start')
  })

  it('should have a Modify menu', function() {
    cy.get('.Menu')
      .eq(1)
      .should('have.text', 'Modify')
  })

  it('should have a Add menu', function() {
    cy.get('.Menu')
      .eq(2)
      .should('have.text', 'Add')
  })

  it('should have a Remove menu', function() {
    cy.get('.Menu')
      .eq(3)
      .should('have.text', 'Remove')
  })

  it('should have a Advanced menu', function() {
    cy.get('.Menu')
      .eq(4)
      .should('have.text', 'Advanced')
  })

  it('should have a View menu', function() {
    cy.get('.Menu')
      .eq(5)
      .should('have.text', 'View')
  })
  it('should have a Help menu', function() {
    cy.get('.Menu')
      .eq(6)
      .should('have.text', 'Help')
  })
})

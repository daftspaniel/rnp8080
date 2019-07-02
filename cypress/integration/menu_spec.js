/* eslint-disable no-undef */
describe('Main menu display Test', function () {
  before(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should have a Start menu', function () {
    cy.get('.Menu')
      .eq(0)
      .should('have.text', 'Start')
  })

  describe('Main menu display Test', function () {
    before(() => {
      cy.get('.Menu')
        .eq(0)
        .click('top')
    })

    it('should have a Clear text menu item', function () {
      cy.get('.menuItem')
        .eq(0)
        .should('have.text', 'Clear text')
    })

    it('should have a Welcome text menu item', function () {
      cy.get('.menuItem')
        .eq(1)
        .should('have.text', 'Welcome text')
    })

    it('should have a Markdown menu item', function () {
      cy.get('.menuItem')
        .eq(2)
        .should('have.text', 'Markdown')
    })

    it('should have a Todo Template menu item', function () {
      cy.get('.menuItem')
        .eq(3)
        .should('have.text', 'Todo Template')
    })

    it('should have a PMI Template menu item', function () {
      cy.get('.menuItem')
        .eq(4)
        .should('have.text', 'PMI Template')
    })

    it('should have a SMART Goal menu item', function () {
      cy.get('.menuItem')
        .eq(5)
        .should('have.text', 'SMART Goal')
    })

    it('should have a Week Planner menu item', function () {
      cy.get('.menuItem')
        .eq(6)
        .should('have.text', 'Week Planner')
    })

    it('should have a HTML starter menu item', function () {
      cy.get('.menuItem')
        .eq(7)
        .should('have.text', 'HTML Starter')
    })
  })

  it('should have a Modify menu', function () {
    cy.get('.Menu')
      .eq(1)
      .should('have.text', 'Modify')
  })

  it('should have a Add menu', function () {
    cy.get('.Menu')
      .eq(2)
      .should('have.text', 'Add')
  })

  it('should have a Remove menu', function () {
    cy.get('.Menu')
      .eq(3)
      .should('have.text', 'Remove')
  })

  it('should have a Advanced menu', function () {
    cy.get('.Menu')
      .eq(4)
      .should('have.text', 'Advanced')
  })

  it('should have a View menu', function () {
    cy.get('.Menu')
      .eq(5)
      .should('have.text', 'View')
  })

  it('should have a Help menu', function () {
    cy.get('.Menu')
      .eq(6)
      .should('have.text', 'Help')
  })
})

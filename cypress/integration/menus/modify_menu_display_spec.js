/* eslint-disable no-undef */
describe('Modify menu display Test', function () {
    before(() => {
        cy.visit('http://localhost:3000/')
    })

    describe('Modify menu display Test', function () {
        before(() => {
            cy.get('.Menu')
                .eq(1)
                .click('center')
        })

        it('should have a Replace menu item', function () {
            cy.get('.menuItem')
                .eq(0)
                .should('have.text', 'Replace...')
        })

        it('should have a Pre/Post menu item', function () {
            cy.get('.menuItem')
                .eq(1)
                .should('have.text', 'Pre/Post...')
        })

        it('should have a Number menu item', function () {
            cy.get('.menuItem')
                .eq(2)
                .should('have.text', 'Number')
        })

        it('should have a Tabs to Spaces menu item', function () {
            cy.get('.menuItem')
                .eq(3)
                .should('have.text', 'Tabs to Spaces')
        })

        it('should have a Doublespace menu item', function () {
            cy.get('.menuItem')
                .eq(4)
                .should('have.text', 'Doublespace')
        })

        it('should have a Reverse menu item', function () {
            cy.get('.menuItem')
                .eq(5)
                .should('have.text', 'Reverse')
        })

        it('should have a Randomise menu item', function () {
            cy.get('.menuItem')
                .eq(6)
                .should('have.text', 'Randomise')
        })
        it('should have a Sort A to Z item', function () {
            cy.get('.menuItem')
                .eq(7)
                .should('have.text', 'Sort A to Z')
        })
        it('should have a Sort by line length menu item', function () {
            cy.get('.menuItem')
                .eq(8)
                .should('have.text', 'Sort by line length')
        })
    })
})
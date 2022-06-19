/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl);
  })

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })

  it('Verify the log in to the application', () => {
    cy.title().should('eq', 'Global Print On Demand Platform | Gelato');
    cy.get('.login-btn').click();
    cy.get('#username').should('be.visible');
    cy.get('#username').type('lasithdilshan20@gmail.com');
    cy.get('#password').type('Lasithdilshan20@');
    cy.get('#kc-login').click();
    cy.xpath('//*[contains(text(),"Welcome Lasitha Wijenayake")]').should('be.visible');
    cy.get('nav div#user-info').click();
    cy.xpath('//*[contains(text(),"Sign Out")]').click();
    cy.get('#kc-page-title').should('contains.text', 'Sign in to Gelato');
  })
})

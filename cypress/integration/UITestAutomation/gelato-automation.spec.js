/// <reference types="cypress" />
const TestData = require('../../testdata/testdata.json');
const HomePage = require('../../pageobjects/home.json');
const LoginPage = require('../../pageobjects/login.json');
const DashboardPage = require('../../pageobjects/dashboard.json');

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl);
  })

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })

  it('Verify the log in to the application', () => {
    cy.title().should('eq', TestData.homePage.title);
    cy.get(HomePage.signIn).click();
    cy.get(LoginPage.userSignIn.txt_Username).should('be.visible');
    cy.get(LoginPage.userSignIn.txt_Username).type(TestData.user.email);
    cy.get(LoginPage.userSignIn.txt_Password).type(TestData.user.password,{ log: false });
    cy.get(LoginPage.userSignIn.btn_LogIn).click();
    cy.xpath('//*[contains(text(),"Welcome '+(TestData.user.name)+'")]').should('be.visible');
    cy.get(DashboardPage.userInfo.lbl_UserInfo).click();
    cy.xpath(DashboardPage.userInfo.btn_SingOut).click();
    cy.get(LoginPage.userSignIn.lbl_Title).should('contains.text', TestData.user.title);
  })
})

/// <reference types="cypress" />
const baseUrl = Cypress.config().baseUrl;

const I = require('../../testbase/commandBase');
const TestData = require('../../testdata/testdata.json');
const HomePage = require('../../pageobjects/home.json');
const LoginPage = require('../../pageobjects/login.json');
const DashboardPage = require('../../pageobjects/dashboard.json');
const {I_GetContainsText} = require("../../helpers/common");

describe('example to-do app', () => {
  beforeEach(() => {
    I.Open(baseUrl);
  })

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })

  it('Verify the log in to the application', () => {
    I.GetTitle().should('eq', TestData.homePage.title);
    I.Click(HomePage.signIn);
    I.GetElement(LoginPage.userSignIn.txt_Username).should('be.visible');
    I.Fill(LoginPage.userSignIn.txt_Username,TestData.user.email);
    I.Fill(LoginPage.userSignIn.txt_Password,TestData.user.password);
    I.Click(LoginPage.userSignIn.btn_LogIn);
    I_GetContainsText("Welcome "+(TestData.user.name)).should('be.visible');
    I.Click(DashboardPage.userInfo.lbl_UserInfo);
    I.Click(DashboardPage.userInfo.btn_SingOut);
    I.GetElement(LoginPage.userSignIn.lbl_Title).should('contains.text', TestData.user.title);
  })
})

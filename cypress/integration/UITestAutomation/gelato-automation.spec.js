/// <reference types="cypress" />
///<reference types="cypress-iframe" />
const baseUrl = Cypress.config().baseUrl;

const I = require('../../testbase/commandBase');
const TestData = require('../../testdata/testdata.json');
const HomePage = require('../../pageobjects/home.json');
const StorePage = require('../../pageobjects/store.json');
const LoginPage = require('../../pageobjects/login.json');
const ProductPage = require('../../pageobjects/product.json');
const DashboardPage = require('../../pageobjects/dashboard.json');
const {I_GetContainsText, I_LoginToApplication} = require("../../helpers/common");

describe('example to-do app', () => {
  before(() => {
    I.Open(baseUrl);
    I_LoginToApplication(TestData.user.email, TestData.user.password);
  })

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })

  it('Verify the log in to the application', () => {
    I_GetContainsText("Welcome "+(TestData.user.name)).should('be.visible');
    I.GetElement(DashboardPage.userInfo.lbl_UserInfo).should('be.visible');
    I_GetContainsText("Welcome "+(TestData.user.name)).should('be.visible');
   /* I.Click(DashboardPage.userInfo.btn_SingOut);
    I.GetElement(LoginPage.userSignIn.lbl_Title).should('contains.text', TestData.user.title);*/
  })

  it('Verify the user can add a store', () => {
    I.GetElement(HomePage.NavigationItems.Store).contains('Stores').click({force: true});
    I.GetElement(StorePage.lbl_Title).should('be.visible');
    I.GetElement(StorePage.btn_CreateManualStore).click({force: true});
    I.Fill(StorePage.txt_name, TestData.store.name);
    I.Click(StorePage.btn_AddStore);
    I.GetElement(StorePage.lbl_StoreTitle).should('contains.text', TestData.store.name);
  })

  it('Verify the user can add a new orders', () => {
    cy.pause();
    I.Click(StorePage.btn_AddProduct);
    I.Click(ProductPage.AddProduct.lbl_MensClothing);
    I.Click(ProductPage.AddProduct.lbl_TShirtsMen);
    I.Click(ProductPage.AddProduct.lbl_Premium);
    cy.iframe('#printFileEditor').find('cy-color-box-white').should('be.visible').click();
    cy.iframe('#printFileEditor').find('div.cy-color-box-red').should('be.visible').click();
    cy.iframe('#printFileEditor').find('button.cy-continue-btn').should('be.visible').click();
    I_GetContainsText("Set details of your print").should('be.visible');
  })

/*  it('Verify the log in to the application', () => {
    I_GetContainsText("Welcome "+(TestData.user.name)).should('be.visible');
    I.Click(DashboardPage.userInfo.lbl_UserInfo);
    I.Click(DashboardPage.userInfo.btn_SingOut);
    I.GetElement(LoginPage.userSignIn.lbl_Title).should('contains.text', TestData.user.title);
  })

  it('Verify the log in to the application', () => {
    I_GetContainsText("Welcome "+(TestData.user.name)).should('be.visible');
    I.Click(DashboardPage.userInfo.lbl_UserInfo);
    I.Click(DashboardPage.userInfo.btn_SingOut);
    I.GetElement(LoginPage.userSignIn.lbl_Title).should('contains.text', TestData.user.title);
  })

  it('Verify the log in to the application', () => {
    I_GetContainsText("Welcome "+(TestData.user.name)).should('be.visible');
    I.Click(DashboardPage.userInfo.lbl_UserInfo);
    I.Click(DashboardPage.userInfo.btn_SingOut);
    I.GetElement(LoginPage.userSignIn.lbl_Title).should('contains.text', TestData.user.title);
  })*/
})

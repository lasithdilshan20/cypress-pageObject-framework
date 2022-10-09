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
const DesignPage = require('../../pageobjects/design.json');
const OrderPage = require('../../pageobjects/orders.json');
const {I_GetContainsText, I_LoginToApplication} = require("../../helpers/common");
const {GetIFrameElement} = require("../../testbase/commandBase");

describe('Gelato Test Automation', () => {
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
    I.Click(StorePage.btn_AddProduct);
    I.Click(ProductPage.AddProduct.lbl_MensClothing);
    I.Click(ProductPage.AddProduct.lbl_TShirtsMen);
    I.Click(ProductPage.AddProduct.lbl_Premium);
    I.GetIFrameElement(DesignPage.design.iFrame,DesignPage.design.lbl_Text).should('be.visible').click();
    I.GetIFrameElement(DesignPage.design.iFrame,DesignPage.design.btn_AddText).should('be.visible').click();
    I.GetIFrameElement(DesignPage.design.iFrame,DesignPage.design.ara_canvas).should('be.visible').click();
    I.Wait(3000);
    I.Click(DesignPage.design.btn_Continue);
    I_GetContainsText("Set details of your print").should('be.visible');
    I.Click(DesignPage.design.btn_Continue);
    I.GetElement(StorePage.lbl_StoreTitle).should('contains.text', TestData.store.name);
    I.GetElement(StorePage.lbl_AddedProductTitle).should('contains.text', TestData.product.name);
  })

  it('Verify order should able to Check orders', () => {
    I.GetElement(HomePage.NavigationItems.Home).contains('Home').click({force: true});
    I.GetElement(HomePage.NavigationItems.Orders).contains('Orders').click({force: true});
    I.Click(OrderPage.lbl_Draft);
    I.GetElement(OrderPage.tr_row).should('be.visible');
    I.GetElement(OrderPage.tr_row).should('have.attr', 'data-id');
  })

  it('Verify the should able to delete the store', () => {
    I.GetElement(HomePage.NavigationItems.Store).contains('Stores').click({force: true});
    I.Click(StorePage.btn_More);
    I.Click(StorePage.lbl_EditStore);
    I.Click(StorePage.btn_DeleteStore);
    I.Fill(StorePage.txt_StoreNameToDelete, TestData.store.name);
    I.Click(StorePage.btn_DeleteStoreConfirm);
  })

  it('Verify the user should able to log out', () => {
    I.Click(DashboardPage.userInfo.lbl_UserInfo);
    I.Click(DashboardPage.userInfo.btn_SingOut);
    I.GetElement(LoginPage.userSignIn.lbl_Title).should('contains.text', TestData.user.title);
  })
})

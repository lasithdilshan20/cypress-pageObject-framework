const I = require('../testbase/commandBase');
const TestData = require('../testdata/testdata.json');
const HomePage = require('../pageobjects/home.json');
const LoginPage = require('../pageobjects/login.json');
const DashboardPage = require('../pageobjects/dashboard.json');

export function I_GetContainsText(text) {
    return cy.xpath('//*[contains(text(),"'+(text)+'")]');
}

export function I_LoginToApplication(email,password) {
    I.GetTitle().should('contain', TestData.homePage.title);
    I.Click(HomePage.signIn);
    I.GetElement(LoginPage.userSignIn.txt_Username).should('be.visible');
    I.Fill(LoginPage.userSignIn.txt_Username,email);
    I.Fill(LoginPage.userSignIn.txt_Password,password);
    I.Click(LoginPage.userSignIn.btn_LogIn);
}
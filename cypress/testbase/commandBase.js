/// <reference types="Cypress" />

/**
 *  Open web pages
 * @param url
 * @constructor
 */
export function Open(url) {
    cy.visit(url);
}

/**
 * Get element by selector and click
 * @param locator
 * @constructor
 */
export function Click(locator)
{
    if(locator.includes('//')) {
        cy.xpath(locator).then(($element) => {
                cy.xpath(locator).click();
        })
    }
    else
    {
        cy.get(locator).then(($element) => {
                cy.get(locator).click();
        })
    }
}

/**
 * Get element by selector and type text
 * @param locator
 * @param text
 * @constructor
 */
export function Fill(locator, text)
{
    if(locator.includes('//')) {
        cy.xpath(locator).then(($element) => {
                cy.xpath(locator).type(text);
        })
    }
    else
    {
        cy.get(locator).then(($element) => {
                cy.get(locator).type(text);
        })
    }
}

//export function to  get title and return it
export function GetTitle() {
    return cy.title();
}

//get element and return it to assert
export function GetElement(locator) {

    if(locator.includes('//')) {
        return cy.xpath(locator);
    }
    else
    {
        return cy.get(locator);
    }
}

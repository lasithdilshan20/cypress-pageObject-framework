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
            if($element.is(":visible"))
                cy.xpath(locator).click();
            else
                cy.xpath(locator).click({force:true});
        })
    }
    else
    {
        cy.get(locator).then(($element) => {
            if($element.is(":visible"))
                cy.get(locator).click();
            else
                cy.get(locator).click({force:true});
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
            if($element.is(":visible"))
                cy.xpath(locator).type(text);
            else
                cy.xpath(locator).type(text,{force:true});
        })
    }
    else
    {
        cy.get(locator).then(($element) => {
            if($element.is(":visible"))
                cy.get(locator).type(text);
            else
                cy.get(locator).type(text,{force:true});
        })
    }
}

//export function to  get title and return it
export function GetTitle() {
    return cy.title();
}

//get element and return it to assert
export function GetElement(locator) {
    return cy.get(locator);
}

export function I_GetContainsText(text) {
    return cy.xpath('//*[contains(text(),"'+(text)+'")]');
}
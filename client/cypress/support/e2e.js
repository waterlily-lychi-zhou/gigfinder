import './commands';

beforeEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
  cy.log('Cleared local storage and cookies before test');
});

afterEach(() => {
  cy.screenshot();
});

Cypress.on('uncaught:exception', (err) => {
  console.error('Uncaught exception:', err);
  return false; 
});

Cypress.Commands.add('favoriteEvent', (eventId) => {
    cy.request('POST', '/favourites', { id: eventId }).then((response) => {
      expect(response.status).to.eq(200);
    });
});
  
Cypress.Commands.add('unfavoriteEvent', (eventId) => {
    cy.request('DELETE', `/favourites/${eventId}`).then((response) => {
      expect(response.status).to.eq(200);
    });
});
  
Cypress.Commands.add('loadEvents', () => {
    cy.intercept('GET', '/events', { fixture: 'events.json' }).as('getEvents');
    cy.visit('/events');
    cy.wait('@getEvents');
});
  
Cypress.Commands.add('loadFavorites', () => {
    cy.intercept('GET', '/favourites', { fixture: 'favourites.json' }).as('getFavorites');
    cy.visit('/favourites');
    cy.wait('@getFavorites');
});
  
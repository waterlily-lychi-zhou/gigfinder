import '../support/commands';

beforeEach(() => {
  // load mock data
  cy.fixture('events.json').as('mockEvents');
  // mock API requests
  cy.intercept('GET', '/events', { fixture: 'events.json' }).as('getEvents');
  cy.intercept('POST', '/favourites', { statusCode: 200 }).as('addToFavorites');
  cy.intercept('DELETE', '/favourites/*', { statusCode: 200 }).as('removeFromFavorites');
});

describe('Load nearby events', () => {
  it('should display a list of nearby events based on user location', () => {
    cy.loadEvents();
    cy.get('.event-list').should('exist');
    cy.get('.event-card').should('have.length.greaterThan', 0);
  });
});

describe('Favorite an event', () => {
  it('should allow a user to favorite an event', () => {
    cy.loadEvents();
    cy.get('.event-card').first().within(() => {
      cy.get('.favorite-button').click();
    });
    cy.wait('@addToFavorites').its('response.statusCode').should('eq', 200);
    cy.get('.event-card').first().within(() => {
      cy.get('.favorite-button').should('contain', '已收藏');
    });
  });
});

describe('Unfavorite an event', () => {
  it('should allow a user to unfavorite an event', () => {
    cy.loadFavorites();
    cy.get('.favourites-card').first().within(() => {
      cy.get('.unfavorite-button').click();
    });
    cy.wait('@removeFromFavorites').its('response.statusCode').should('eq', 200);
    cy.get('.favourites-card').should('have.length.lessThan', 2);
  });
});

describe('View event details', () => {
  it('should allow a user to view event details', () => {
    cy.loadEvents();
    cy.get('.event-card').first().within(() => {
      cy.get('.details-button').click();
    });
    cy.url().should('include', '/event-details');
    cy.get('.event-details-map').should('exist');
  });
});

  
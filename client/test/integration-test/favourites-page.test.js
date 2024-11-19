import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FavouritesPage from '../../src/pages/favourites-page/favourites-page';
import { FavouritesContext } from '../../src/context/favourites-context';

// Mock dependencies
jest.mock('../../src/components/favourites-list/favourites-list', () => ({
  FavouritesList: ({ events }) => <div data-testid="favourites-list">{events.length} favourite events</div>,
}));

describe('FavouritesPage Component', () => {
  const renderWithFavourites = (favourites) => {
    render(
      <BrowserRouter>
        <FavouritesContext.Provider value={{ favourites }}>
          <FavouritesPage />
        </FavouritesContext.Provider>
      </BrowserRouter>
    );
  };

  it('renders "No favourites added yet.." message when favourites list is empty', () => {
    renderWithFavourites([]);
    expect(screen.getByText('No favourites added yet..')).toBeInTheDocument();
    expect(screen.queryByTestId('favourites-list')).not.toBeInTheDocument();
  });

  it('renders FavouritesList when there are favourite events', () => {
    const mockFavourites = [
      { id: '1', eventDetails: { name: 'Event 1' } },
      { id: '2', eventDetails: { name: 'Event 2' } },
    ];
    renderWithFavourites(mockFavourites);

    expect(screen.getByText('YOUR FAVOURITE EVENTS')).toBeInTheDocument();
    expect(screen.getByTestId('favourites-list')).toHaveTextContent('2 favourite events');
  });
});

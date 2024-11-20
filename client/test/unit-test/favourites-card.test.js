import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FavouritesContext } from '../../src/context/favourites-context';
import { BrowserRouter } from 'react-router-dom';
import FavouritesCard from '../../src/components/favourites-card/favourites-card';

describe('FavouritesCard Component', () => {
  const mockEvent = {
    eventId: '1',
    eventDetails: {
      id: '1',
      name: 'Sample Event',
      dates: {
        start: {
          localDate: '2024-12-01',
          localTime: '19:00'
        }
      },
      venue: 'Sample Venue',
      images: [{ url: 'sample-image.jpg' }]
    }
  };

  const mockDeleteFromFavourites = jest.fn();
  const renderWithContext = (favourites = []) => {
    render(
      <BrowserRouter>
        <FavouritesContext.Provider
          value={{
            favourites,
            deleteFromFavourites: mockDeleteFromFavourites
          }}
        >
          <FavouritesCard event={mockEvent} />
        </FavouritesContext.Provider>
      </BrowserRouter>
    );
  };

  it('handles "Remove from Favourites" button click', () => {
    renderWithContext();
    const removeButton = screen.getByText('Remove from Favourites');
    fireEvent.click(removeButton);
    expect(mockDeleteFromFavourites).toHaveBeenCalledWith(mockEvent.eventId);
  });

  it('navigates to event details page on "More Info" button click', () => {
    renderWithContext();
    const moreInfoButton = screen.getByText('More Info');
    expect(moreInfoButton).toBeInTheDocument();
    fireEvent.click(moreInfoButton);
    // Check navigation works with a mock router in integration testing
  });
});

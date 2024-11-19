import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavouritesList } from '../../src/components/favourites-list/favourites-list';

jest.mock('../../src/components/favourites-card/favourites-card', () => ({ event }) => <div data-testid="favourites-card">{event.eventDetails.name}</div>);

describe('FavouritesList Component', () => {
  const mockEvents = [
    {
      id: '1',
      eventDetails: { name: 'Event 1' }
    },
    {
      id: '2',
      eventDetails: { name: 'Event 2' }
    }
  ];

  it('renders a FavouritesCard for each event', () => {
    render(<FavouritesList events={mockEvents} />);
    const favouritesCards = screen.getAllByTestId('favourites-card');
    expect(favouritesCards).toHaveLength(mockEvents.length);
    mockEvents.forEach((event, index) => {
      expect(favouritesCards[index]).toHaveTextContent(event.eventDetails.name);
    });
  });

  it('displays "No events found." when no events are provided', () => {
    render(<FavouritesList events={[]} />);
    expect(screen.getByText('No events found.')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EventsListPage from '../../src/pages/events-list-page/events-list-page';
import { LocationContext } from '../../src/context/location-context';
import { FavouritesContext } from '../../src/context/favourites-context';

// Mock dependencies
jest.mock('../../src/components/event-map/event-map', () => () => <div data-testid="event-map" />);
jest.mock('../../src/components/event-list/event-list', () => ({
  EventList: ({ events }) => <div data-testid="event-list">{events.length} events</div>,
}));

// Mock fetch
global.fetch = jest.fn();

describe('EventsListPage Component', () => {
  const mockLocationContextValue = {
    location: { latitude: 40.7128, longitude: -74.006 },
    future: {}
  };

  const mockEvents = {
    futureEvents: [
      { id: '1', name: 'Event 1' },
      { id: '2', name: 'Event 2' },
    ],
  };

  beforeEach(() => {
    fetch.mockClear();
  });

  const renderWithContext = () => {
    render(
      <BrowserRouter>
        <LocationContext.Provider value={mockLocationContextValue}>
          <FavouritesContext.Provider value={{ favourites: [] }}>
            <EventsListPage />
          </FavouritesContext.Provider>
        </LocationContext.Provider>
      </BrowserRouter>
    );
  };

  it('renders the loading spinner initially', () => {
    renderWithContext();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('fetches events and renders EventList and EventMap', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockEvents),
    });

    renderWithContext();

    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:3001/api/events?lat=${mockLocationContextValue.location.latitude}&long=${mockLocationContextValue.location.longitude}`
    );

    await waitFor(() => {
      expect(screen.getByTestId('event-list')).toHaveTextContent('2 events');
      expect(screen.getByTestId('event-map')).toBeInTheDocument();
    });
  });

  it('renders an error message when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    renderWithContext();

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    expect(screen.queryByTestId('event-list')).not.toBeInTheDocument();
    expect(screen.queryByTestId('event-map')).not.toBeInTheDocument();
  });

  it('renders no events when location is unavailable', () => {
    render(
      <BrowserRouter>
        <LocationContext.Provider value={{ location: {} }}>
          <FavouritesContext.Provider value={{ favourites: [] }}>
            <EventsListPage />
          </FavouritesContext.Provider>
        </LocationContext.Provider>
      </BrowserRouter>
    );

    expect(fetch).not.toHaveBeenCalled();
    expect(screen.queryByTestId('event-list')).not.toBeInTheDocument();
    expect(screen.queryByTestId('event-map')).not.toBeInTheDocument();
  });
});

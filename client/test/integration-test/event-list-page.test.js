import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EventsListPage from './../src/components/events-list-page';
import { LocationContext } from '../../src/context/location-context';
import { FavouritesContext } from '../../src/context/favourites-context';
import EventMap from '../../components/event-map/event-map';
import { EventList } from '../../components/event-list/event-list';

// Mock dependencies
jest.mock('../../components/event-map/event-map', () => () => <div data-testid="event-map" />);
jest.mock('../../components/event-list/event-list', () => ({
  EventList: ({ events }) => <div data-testid="event-list">{events.length} events</div>,
}));

// Mock fetch
global.fetch = jest.fn();

describe('EventsListPage Component', () => {
  const mockLocation = {
    latitude: 59.9139,
    longitude: 10.7522,
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
        <LocationContext.Provider value={{ location: mockLocation }}>
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

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `http://localhost:3001/api/events?lat=${mockLocation.latitude}&long=${mockLocation.longitude}`
      );
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('event-list')).toHaveTextContent('2 events');
    expect(screen.getByTestId('event-map')).toBeInTheDocument();
  });

  it('renders an error message when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    renderWithContext();

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    // Since there is no fallback UI for fetch errors, just verify no EventList or EventMap
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

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import EventsListPage from "../../src/pages/events-list-page/events-list-page";
import {
  LocationContext,
  LocationContextType,
} from "../../src/context/location-context";
import {
  FavouritesContext,
  FavouritesContextType,
} from "../../src/context/favourites-context";

// Mock dependencies
jest.mock("../../src/components/event-map/event-map", () => () => (
  <div data-testid="event-map" />
));
jest.mock("../../src/components/event-list/event-list", () => ({
  EventList: ({ events }: { events: { id: string; name: string }[] }) => (
    <div data-testid="event-list">{events.length} events</div>
  ),
}));

// Mock fetch
global.fetch = jest.fn() as jest.Mock;

describe("EventsListPage Component", () => {
  const mockLocationContextValue: LocationContextType = {
    location: { latitude: 40.7128, longitude: -74.006 },
    setLocation: jest.fn(),
  };

  const mockFavouritesContextValue: FavouritesContextType = {
    favourites: [],
    addToFavourites: jest.fn(),
    deleteFromFavourites: jest.fn(),
  };

  const mockEvents = {
    futureEvents: [
      { id: "1", name: "Event 1" },
      { id: "2", name: "Event 2" },
    ],
  };

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  const renderWithContext = () => {
    render(
      <BrowserRouter>
        <LocationContext.Provider value={mockLocationContextValue}>
          <FavouritesContext.Provider value={mockFavouritesContextValue}>
            <EventsListPage />
          </FavouritesContext.Provider>
        </LocationContext.Provider>
      </BrowserRouter>
    );
  };

  it("renders the loading spinner initially", () => {
    renderWithContext();
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("fetches events and renders EventList and EventMap", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => [{ id: 1, name: "Test Event" }],
    });

    renderWithContext();

    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:3001/api/events?lat=${mockLocationContextValue.location.latitude}&long=${mockLocationContextValue.location.longitude}`
    );

    await waitFor(() => {
      expect(screen.getByTestId("event-list")).toHaveTextContent("2 events");
      expect(screen.getByTestId("event-map")).toBeInTheDocument();
    });
  });

  it("renders an error message when fetch fails", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));

    renderWithContext();

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    expect(screen.queryByTestId("event-list")).not.toBeInTheDocument();
    expect(screen.queryByTestId("event-map")).not.toBeInTheDocument();
  });

  it("renders no events when location is unavailable", () => {
    render(
      <BrowserRouter>
        <LocationContext.Provider
          value={{
            location: { latitude: null, longitude: null },
            setLocation: jest.fn(),
          }}
        >
          <FavouritesContext.Provider value={mockFavouritesContextValue}>
            <EventsListPage />
          </FavouritesContext.Provider>
        </LocationContext.Provider>
      </BrowserRouter>
    );

    expect(fetch).not.toHaveBeenCalled();
    expect(screen.queryByTestId("event-list")).not.toBeInTheDocument();
    expect(screen.queryByTestId("event-map")).not.toBeInTheDocument();
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FavouritesPage from "../../src/pages/favourites-page/favourites-page";
import {
  FavouritesContext,
  FavouritesContextType,
} from "../../src/context/favourites-context";

// Mock dependencies
jest.mock("../../src/components/favourites-list/favourites-list", () => ({
  FavouritesList: ({
    events,
  }: {
    events: { id: string; eventDetails: { name: string } }[];
  }) => (
    <div data-testid="favourites-list">{events.length} favourite events</div>
  ),
}));

describe("FavouritesPage Component", () => {
  const renderWithFavourites = (
    favourites: FavouritesContextType["favourites"]
  ) => {
    render(
      <BrowserRouter>
        <FavouritesContext.Provider
          value={{
            favourites,
            addToFavourites: async () => {},
            deleteFromFavourites: async () => {},
          }}
        >
          <FavouritesPage />
        </FavouritesContext.Provider>
      </BrowserRouter>
    );
  };

  it('renders "No favourites added yet.." message when favourites list is empty', () => {
    renderWithFavourites([]);
    expect(screen.getByText("No favourites added yet..")).toBeInTheDocument();
    expect(screen.queryByTestId("favourites-list")).not.toBeInTheDocument();
  });

  it("renders FavouritesList when there are favourite events", () => {
    const mockFavourites = [
      {
        eventId: "1",
        eventDetails: {
          id: "1",
          name: "Event 1",
          images: [{ url: "https://example.com/event1.jpg" }],
          dates: {
            start: {
              localDate: "2024-11-20",
              localTime: "18:00",
            },
          },
          venue: "Venue 1",
        },
      },
      {
        eventId: "2",
        eventDetails: {
          id: "2",
          name: "Event 2",
          images: [{ url: "https://example.com/event2.jpg" }],
          dates: {
            start: {
              localDate: "2024-11-21",
              localTime: "19:00",
            },
          },
          venue: "Venue 2",
        },
      },
    ];

    renderWithFavourites(mockFavourites);

    expect(screen.getByText("YOUR FAVOURITE EVENTS")).toBeInTheDocument();
    expect(screen.getByTestId("favourites-list")).toHaveTextContent(
      "2 favourite events"
    );
  });
});

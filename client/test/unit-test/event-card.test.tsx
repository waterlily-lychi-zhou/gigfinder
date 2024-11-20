import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FavouritesContext } from "../../src/context/favourites-context";
import { BrowserRouter } from "react-router-dom";
import EventCard from "../../src/components/event-card/event-card";
import "@testing-library/jest-dom";

interface Event {
  id: string;
  name: string;
  dates: {
    start: {
      localDate: string;
      localTime: string;
    };
  };
  venue: string;
  images: { url: string }[];
}

describe("EventCard Component", () => {
  const mockEvent: Event = {
    id: "1",
    name: "Sample Event",
    dates: {
      start: {
        localDate: "2024-12-01",
        localTime: "19:00",
      },
    },
    venue: "Sample Venue",
    images: [{ url: "sample-image.jpg" }],
  };

  const mockAddToFavourites = jest.fn();
  const mockDeleteFromFavourites = jest.fn();

  const renderWithFavouritesContext = (
    favourites: { eventId: string; eventDetails: Event }[] = []
  ) => {
    render(
      <BrowserRouter>
        <FavouritesContext.Provider
          value={{
            favourites,
            addToFavourites: mockAddToFavourites,
            deleteFromFavourites: mockDeleteFromFavourites,
          }}
        >
          <EventCard event={mockEvent} />
        </FavouritesContext.Provider>
      </BrowserRouter>
    );
  };

  it("renders event details correctly", () => {
    renderWithFavouritesContext();
    expect(screen.getByText(mockEvent.name)).toBeInTheDocument();
    expect(
      screen.getByText(mockEvent.dates.start.localDate)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockEvent.dates.start.localTime)
    ).toBeInTheDocument();
    expect(screen.getByText(mockEvent.venue)).toBeInTheDocument();
    expect(screen.getByAltText(mockEvent.name)).toHaveAttribute(
      "src",
      mockEvent.images[0].url
    );
  });

  it('shows "Add to Favourites" button when event is not a favourite', () => {
    renderWithFavouritesContext();
    const addButton = screen.getByText("Add to Favourites");
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    expect(mockAddToFavourites).toHaveBeenCalledWith(mockEvent);
  });

  it('shows "Remove from Favourites" button when event is a favourite', () => {
    renderWithFavouritesContext([{ eventId: "1", eventDetails: mockEvent }]);
    const removeButton = screen.getByText("Remove from Favourites");
    expect(removeButton).toBeInTheDocument();
    fireEvent.click(removeButton);
    expect(mockDeleteFromFavourites).toHaveBeenCalledWith("1");
  });

  it('navigates to event details page on "More Info" button click', () => {
    renderWithFavouritesContext();
    const moreInfoButton = screen.getByText("More Info");
    expect(moreInfoButton).toBeInTheDocument();
    fireEvent.click(moreInfoButton);
  });
});

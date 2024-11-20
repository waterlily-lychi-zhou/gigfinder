import React from "react";
import { render, screen } from "@testing-library/react";
import { FavouritesList } from "../../src/components/favourites-list/favourites-list";

// Mock FavouritesCard Component
jest.mock(
  "../../src/components/favourites-card/favourites-card",
  () =>
    ({ event }: { event: { eventDetails: { name: string } } }) =>
      <div data-testid="favourites-card">{event.eventDetails.name}</div>
);

// Interfaces for mock data
interface EventDetails {
  id: string;
  name: string;
  images: { url: string }[];
  dates: {
    start: {
      localDate: string;
      localTime: string;
    };
  };
  venue: string;
}

interface FavouriteEvent {
  eventId: string;
  eventDetails: EventDetails;
}

describe("FavouritesList Component", () => {
  const mockEvents: FavouriteEvent[] = [
    {
      eventId: "1",
      eventDetails: {
        id: "1",
        name: "Event 1",
        images: [{ url: "https://example.com/event1.jpg" }],
        dates: {
          start: {
            localDate: "2024-12-01",
            localTime: "19:00",
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
            localDate: "2024-12-02",
            localTime: "20:00",
          },
        },
        venue: "Venue 2",
      },
    },
  ];

  it("renders a FavouritesCard for each event", () => {
    render(<FavouritesList events={mockEvents} />);
    const favouritesCards = screen.getAllByTestId("favourites-card");
    expect(favouritesCards).toHaveLength(mockEvents.length);
    mockEvents.forEach((event, index) => {
      expect(favouritesCards[index]).toHaveTextContent(event.eventDetails.name);
    });
  });

  it('displays "No events found." when no events are provided', () => {
    render(<FavouritesList events={[]} />);
    expect(screen.getByText("No events found.")).toBeInTheDocument();
  });
});

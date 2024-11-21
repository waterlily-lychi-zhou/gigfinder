import React from "react";
import { render, screen } from "@testing-library/react";
import { EventList } from "../../src/components/event-list/event-list";

// Mock the EventCard component to simplify testing
jest.mock("../../src/components/event-card/event-card", () => {
  return ({ event }: { event: { name: string } }) => (
    <div data-testid="event-card">{event.name}</div>
  );
});

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

describe("EventList Component", () => {
  const mockEvents: Event[] = [
    {
      id: "1",
      name: "Event 1",
      dates: {
        start: {
          localDate: "2024-12-01",
          localTime: "19:00",
        },
      },
      venue: "Venue 1",
      images: [{ url: "image1.jpg" }],
    },
    {
      id: "2",
      name: "Event 2",
      dates: {
        start: {
          localDate: "2024-12-02",
          localTime: "20:00",
        },
      },
      venue: "Venue 2",
      images: [{ url: "image2.jpg" }],
    },
    {
      id: "3",
      name: "Event 3",
      dates: {
        start: {
          localDate: "2024-12-03",
          localTime: "21:00",
        },
      },
      venue: "Venue 3",
      images: [{ url: "image3.jpg" }],
    },
  ];

  it("renders event cards for each event", () => {
    console.log(global.TextDecoder);
    render(<EventList events={mockEvents} />);
    const eventCards = screen.getAllByTestId("event-card");
    expect(eventCards).toHaveLength(mockEvents.length);
    mockEvents.forEach((event, index) => {
      expect(eventCards[index]).toHaveTextContent(event.name);
    });
  });

  it('displays "No events found." when events array is empty', () => {
    render(<EventList events={[]} />);
    expect(screen.getByText("No events found.")).toBeInTheDocument();
  });
});

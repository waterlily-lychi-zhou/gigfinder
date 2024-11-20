import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EventDetailsPage from "../../src/pages/event-details-page/event-details-page";
import { generateICSFile } from "../../src/utils/calendar";

jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({
    on: jest.fn(),
    remove: jest.fn(),
  })),
  Marker: jest.fn(() => ({
    setLngLat: jest.fn().mockReturnThis(),
    addTo: jest.fn(),
  })),
}));

jest.mock("../../src/utils/calendar", () => ({
  generateICSFile: jest.fn(),
}));

const mockEvent = {
  name: "Sample Event",
  dates: { start: { localDate: "2024-12-01", localTime: "19:00" } },
  images: [{ url: "sample-image.jpg" }],
  _embedded: {
    venues: [
      {
        name: "Sample Venue",
        address: { line1: "123 Street" },
        city: { name: "Sample City" },
        country: { name: "Sample Country" },
        location: { longitude: "12.34", latitude: "56.78" },
      },
    ],
  },
  url: "https://example.com",
};

const renderWithRouter = (state) => {
  render(
    <MemoryRouter initialEntries={[{ state: state ? { event: state } : null }]}>
      <EventDetailsPage />
    </MemoryRouter>
  );
};

describe("EventDetailsPage Component", () => {
  it("renders event details correctly", () => {
    renderWithRouter(mockEvent);

    expect(screen.getByText("Sample Event")).toBeInTheDocument();
    expect(screen.getByText("Date: 2024-12-01")).toBeInTheDocument();
    expect(screen.getByText("Time: 19:00")).toBeInTheDocument();
    expect(screen.getByText(/Sample Venue/i)).toBeInTheDocument();
    expect(screen.getByText(/Address: 123 Street, Sample City, Sample Country/i)).toBeInTheDocument();
  });

  it("calls generateICSFile when 'Add to Calendar' button is clicked", () => {
    renderWithRouter(mockEvent);

    const button = screen.getByText("Add to Calendar");
    fireEvent.click(button);

    expect(generateICSFile).toHaveBeenCalledWith(mockEvent);
  });
});


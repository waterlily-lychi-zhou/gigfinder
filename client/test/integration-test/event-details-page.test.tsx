import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EventDetailsPage from "../../src/pages/event-details-page/event-details-page";
import { generateICSFile } from "../../src/utils/calendar";

// Mock Mapbox
jest.mock("mapbox-gl", () => ({
  Map: jest.fn(() => ({
    on: jest.fn(),
    remove: jest.fn(),
  })),
  Marker: jest.fn(() => ({
    setLngLat: jest.fn().mockReturnThis(),
    addTo: jest.fn(),
  })),
}));

// Mock generateICSFile
jest.mock("../../src/utils/calendar", () => ({
  generateICSFile: jest.fn(),
}));

// Define mockEvent type
interface EventVenue {
  name: string;
  address: { line1: string };
  city: { name: string };
  country: { name: string };
  location: { longitude: string; latitude: string };
}

interface EventDetails {
  name: string;
  dates: { start: { localDate: string; localTime: string } };
  images: { url: string }[];
  _embedded: { venues: EventVenue[] };
  url: string;
}

// Mock Event data
const mockEvent: EventDetails = {
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

// Helper function to render with router
const renderWithRouter = (state: EventDetails | null) => {
  render(
    <MemoryRouter
      initialEntries={[{ state: state ? { event: state } : undefined }]}
    >
      <EventDetailsPage />
    </MemoryRouter>
  );
};

// Tests
describe("EventDetailsPage Component", () => {
  it("renders event details correctly", () => {
    renderWithRouter(mockEvent);

    expect(screen.getByText("Sample Event")).toBeInTheDocument();
    expect(screen.getByText("Date: 2024-12-01")).toBeInTheDocument();
    expect(screen.getByText("Time: 19:00")).toBeInTheDocument();
    expect(screen.getByText(/Sample Venue/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Address: 123 Street, Sample City, Sample Country/i)
    ).toBeInTheDocument();
  });

  it("calls generateICSFile when 'Add to Calendar' button is clicked", () => {
    renderWithRouter(mockEvent);

    const button = screen.getByText("Add to Calendar");
    fireEvent.click(button);

    expect(generateICSFile).toHaveBeenCalledWith(mockEvent);
  });
});

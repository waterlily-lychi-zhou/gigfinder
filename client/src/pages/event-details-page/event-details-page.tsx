import React from "react";
import { useLocation } from "react-router-dom";
import "./event-details-page.css";
import Navbar from "../../components/navbar/navbar";
import { generateICSFile } from "../../utils/calendar";
import EventDetailsMap from "../../components/event-details-map/event-details-map";

interface Event {
  name: string;
  images: { url: string }[];
  dates: {
    start: {
      localDate: string;
      localTime: string;
    };
  };
  url: string;
  _embedded: {
    venues: {
      name: string;
      address: {
        line1: string;
      };
      city: {
        name: string;
      };
      country: {
        name: string;
      };
      location: {
        latitude: string;
        longitude: string;
      };
    }[];
  };
}

const EventDetailsPage: React.FC = () => {
  const location = useLocation();
  const { event } = location.state as { event: Event };

  if (!event) return <p>Event details not available.</p>;

  return (
    <div className="page">
      <Navbar />
      <div className="event-details-page">
        <h1 className="event-details-name">{event.name}</h1>
        <div className="img-map-container">
          <img
            src={event.images[0].url}
            alt={event.name}
            className="event-details-image"
          />
          <EventDetailsMap
            longitude={event._embedded.venues[0].location.longitude}
            latitude={event._embedded.venues[0].location.latitude}
          />
        </div>
        <p className="event-details-date">
          Date: {event.dates.start.localDate}
        </p>
        <p className="event-details-time">
          Time: {event.dates.start.localTime}
        </p>
        <p className="event-details-venue">
          Venue: {event._embedded.venues[0].name}
        </p>
        <p className="event-details-venue-address">
          Address: {event._embedded.venues[0].address.line1},{" "}
          {event._embedded.venues[0].city.name},{" "}
          {event._embedded.venues[0].country.name}
        </p>
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          className="tickets-link"
        >
          Buy Tickets
        </a>
        <button
          className="add-to-calendar"
          onClick={() => generateICSFile(event)}
        >
          Add to Calendar
        </button>
      </div>
    </div>
  );
};

export default EventDetailsPage;

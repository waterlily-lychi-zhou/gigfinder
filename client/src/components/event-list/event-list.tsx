import React from "react";
import EventCard from "../event-card/event-card";
import "./event-list.css";

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

interface EventListProps {
  events: Event[];
}

export const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <div className="events-list-container">
      {events.length > 0 ? (
        events.map((event) => (
          <EventCard key={event.id} event={event} /> // Render EventCard for each event
        ))
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

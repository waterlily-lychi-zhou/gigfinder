import React from "react";
import FavouritesCard from "../favourites-card/favourites-card";
import "../event-list/event-list.css";

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

interface FavouritesEvent {
  eventId: string;
  eventDetails: EventDetails;
}

interface FavouritesListProps {
  events: FavouritesEvent[];
}

export const FavouritesList: React.FC<FavouritesListProps> = ({ events }) => {
  return (
    <div className="events-list-container">
      {events.length > 0 ? (
        events.map((event) => (
          <FavouritesCard key={event.eventId} event={event} /> // Render FavouritesCard for each event
        ))
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

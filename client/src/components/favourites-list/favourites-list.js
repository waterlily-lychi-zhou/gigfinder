import React from "react";
import FavouritesCard from "../favourites-card/favourites-card";
import '../event-list/event-list.css';

export function FavouritesList ({events}) {

  return (
    <div className="events-list-container">
            {events.length > 0 ? (
              events.map((event) => (
                <FavouritesCard key={event.id} event={event} /> // Render EventCard for each event
              ))
            ) : (
              <p>No events found.</p>
            )}
          </div>
  

  )
}
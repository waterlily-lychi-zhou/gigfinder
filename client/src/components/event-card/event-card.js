import React, { useContext } from "react";
import './event-card.css';
import { FavouritesContext } from "../../context/favourites-context";

function EventCard( {event}) {
  const { favourites, addToFavourites, deleteFromFavourites } = useContext(FavouritesContext);

  return (
    <div className="event-card">
    <img src={event.images[0].url} alt={event.name} className="event-image" />
    <div className="event-details">
      <h2 className="event-name">{event.name}</h2>
      <p className="event-date">{event.dates.start.localDate}</p>
      <p className="event-time">{event.dates.start.localTime}</p>
      <p className="event-venue">{event.venue}</p>
      <button className="add-to-favorites-button"> 
        {/* IMPLEMENT FUNCTIONALITY HERE */}
          Add to Favorites
      </button>
    </div>
  </div>
  )
}

export default EventCard;
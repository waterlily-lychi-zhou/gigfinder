import React, { useContext, useEffect } from "react";
import "../event-card/event-card.css";
import { FavouritesContext } from "../../context/favourites-context";
import { useNavigate } from "react-router-dom";

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

interface FavouritesCardProps {
  event: FavouritesEvent;
}

const FavouritesCard: React.FC<FavouritesCardProps> = ({ event }) => {
  const { favourites, deleteFromFavourites } = useContext(FavouritesContext);
  const navigate = useNavigate();

  useEffect(() => {}, [favourites, event.eventDetails.id]);

  const handleMoreInfo = (event: EventDetails) => {
    console.log(event);
    navigate(`/event-details/`, { state: { event } });
  };

  return (
    <div className="event-card">
      <img
        src={event.eventDetails.images[0].url}
        alt={event.eventDetails.name}
        className="event-image"
      />
      <div className="event-details">
        <h2 className="event-name">{event.eventDetails.name}</h2>
        <p className="event-date">{event.eventDetails.dates.start.localDate}</p>
        <p className="event-time">{event.eventDetails.dates.start.localTime}</p>
        <p className="event-venue">{event.eventDetails.venue}</p>
        <button
          className="remove-from-favourites"
          onClick={() => deleteFromFavourites(event.eventId)}
        >
          Remove from Favourites
        </button>
        <button
          className="more-info"
          onClick={() => handleMoreInfo(event.eventDetails)}
        >
          More Info
        </button>
      </div>
    </div>
  );
};

export default FavouritesCard;

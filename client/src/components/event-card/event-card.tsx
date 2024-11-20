import React, { useContext, useState, useEffect } from "react";
import "./event-card.css";
import { FavouritesContext } from "../../context/favourites-context";
import { useNavigate } from "react-router-dom";

interface Event {
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

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { favourites, addToFavourites, deleteFromFavourites } =
    useContext(FavouritesContext);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (favourites.some((fav: Event) => fav.id === event.id))
      setIsFavourite(true);
    else setIsFavourite(false);
  }, [favourites, event.id]);

  const handleMoreInfo = (event: Event) => {
    navigate(`/event-details/`, { state: { event } });
  };

  return (
    <div className="event-card">
      <img src={event.images[0].url} alt={event.name} className="event-image" />
      <div className="event-details">
        <h3 className="event-name">{event.name}</h3>
        <p className="event-date">{event.dates.start.localDate}</p>
        <p className="event-time">{event.dates.start.localTime}</p>
        <p className="event-venue">{event.venue}</p>
        {isFavourite ? (
          <button
            className="remove-from-favourites"
            onClick={() => deleteFromFavourites(event.id)}
          >
            Remove from Favourites
          </button>
        ) : (
          <button
            className="add-to-favourites"
            onClick={() => addToFavourites(event)}
          >
            Add to Favourites
          </button>
        )}
        <button className="more-info" onClick={() => handleMoreInfo(event)}>
          More Info
        </button>
      </div>
    </div>
  );
};

export default EventCard;

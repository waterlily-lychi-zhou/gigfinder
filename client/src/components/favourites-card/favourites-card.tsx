import React, { useEffect } from "react";
import { useFavourites } from "../../context/favourites-context";
import { useNavigate } from "react-router-dom";

interface EventDetails {
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

interface FavouriteEvent {
  eventId: string;
  eventDetails: EventDetails;
}

interface FavouritesCardProps {
  event: FavouriteEvent;
}

const FavouritesCard: React.FC<FavouritesCardProps> = ({ event }) => {
  const { favourites, deleteFromFavourites } = useFavourites();
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
      />
      <div className="event-details">
        <h2 className="event-name">{event.eventDetails.name}</h2>
        <p className="event-date">{event.eventDetails.dates.start.localDate}</p>
        <p className="event-time">{event.eventDetails.dates.start.localTime}</p>
        <p className="event-venue">{event.eventDetails.venue}</p>
        <button onClick={() => deleteFromFavourites(event.eventId)}>
          Remove from Favourites
        </button>
        <button onClick={() => handleMoreInfo(event.eventDetails)}>
          More Info
        </button>
      </div>
    </div>
  );
};

export default FavouritesCard;

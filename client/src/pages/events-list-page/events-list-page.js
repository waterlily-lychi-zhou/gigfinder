import React, { useContext, useEffect, useState } from "react";
import './events-list-page.css';
import { LocationContext } from "../../context/location-context";
import ScaleLoader from "react-spinners/ScaleLoader";
import { EventList } from "../../components/event-list/event-list";
import { FavouritesContext } from "../../context/favourites-context";
import EventMap from "../../components/event-map/event-map";
// events map import 

function EventsListPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { location } = useContext(LocationContext);
  const { favourites, addToFavourites, deleteFromFavourites } = useContext(FavouritesContext)
  const [searchRadius, setSearchRadius] = useState(20);

  //fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/api/events?lat=${location.latitude}&long=${location.longitude}`);
        const data = await response.json();
        console.log(data);
        console.log(data.futureEvents)
        setEvents(data.futureEvents);
        
      } catch (error) {
        console.error('error fetching events:  ', error);
      } finally {
        setLoading(false);
      }
    }
    if (location.latitude && location.longitude) fetchEvents();
  }, [location]);



  return (
    // NAVBAR
    <div className="events-list-page">
      {loading ? (
        <ScaleLoader />
      ) : (
        <div>
          <div className="upcoming-events"> 
            <h1>UPCOMING EVENTS NEAR YOU</h1>
            <EventList events={events}/>
          </div>
          {favourites.length > 0 ? 
          <div className="favourite-events">
            <h1>YOUR FAVOURITE EVENTS</h1>
            {/* <EventList events={favourites}/>  */}
          </div>
          : <div></div>
        }
        </div>
      )}
      <EventMap
        events={events}
        radius={searchRadius}
        location={location}
         />
    </div>
  );
}

export default EventsListPage;
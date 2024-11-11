import React, { useContext, useEffect, useState } from "react";
import './events-list-page.css';
import { LocationContext } from "../../context/location-context";
import ScaleLoader from "react-spinners/ScaleLoader";
import { EventList } from "../../components/event-list/event-list";
import { FavouritesContext } from "../../context/favourites-context";
import EventMap from "../../components/event-map/event-map";
import { FavouritesList } from "../../components/favourites-list/favourites-list";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";

function EventsListPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { location } = useContext(LocationContext);
  const { favourites  } = useContext(FavouritesContext)
  const navigate = useNavigate();
  const [searchRadius, setSearchRadius] = useState(20); // could use later to alter search radius 

  //fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/api/events?lat=${location.latitude}&long=${location.longitude}`);
        const data = await response.json();
        console.log(data);
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
    <div className="events-list-page">
      <Navbar />
      {loading ? (
        <ScaleLoader />
      ) : (
        <div>
          <div className="upcoming-events"> 
            <h1>UPCOMING EVENTS NEAR YOU</h1>
            <EventList events={events}/>
          </div>
        <EventMap
          events={events}
          radius={searchRadius}
          location={location}
          />
        </div>
      )}
    </div>
  );
}

export default EventsListPage;
import React, { useContext, useEffect, useState } from "react";
import './events-list-page.css';
import EventCard from "../../components/event-card/event-card";
import { LocationContext } from "../../context/location-context";
// events map import 

function EventsListPage() {
  const [events, setEvents] = useState([]);
  const { location } = useContext(LocationContext);

  //fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/events?lat=${location.latitude}&long=${location.longitude}`);
        const data = await response.json();
        console.log(data.events);
        setEvents(data.events);
        
      } catch (error) {
        console.error('error fetching events:  ', error);
      }
    }

    fetchEvents();

  }, [location]);


  //add to favourites

  return (
    //NAVBAR
    //implement loading spinner while fetching data 
      <div className="events-list-page">
      <div className="events-list-container"> 
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event.id} event={event} /> // Render EventCard for each event
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
      {/* Insert map component here */}
    </div>
  )
}

export default EventsListPage;
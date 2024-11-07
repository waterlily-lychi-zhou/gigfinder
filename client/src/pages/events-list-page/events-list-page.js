import React, { useEffect, useState } from "react";
import './events-list-page.css';
// events map import 

function EventsListPage() {
  const [events, setEvents] = useState([]);

  //fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/events');
        const data = response.json();
        setEvents(data.events);
        
      } catch (error) {
        console.error('error fetching events:  ', error);
      }
    }

    fetchEvents();
    
  }, []);


  //add to favourites

  return (
    //NAVBAR
    <div className="events-list-page">
      <div className="events-list-container"> 
          {/* map through events here */}
      </div>
      {/* insert map component here */}
    </div>
  )
}

export default EventsListPage;
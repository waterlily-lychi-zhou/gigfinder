import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LocationContext } from "../../context/location-context";
import './landing-page.css';

function LandingPage() {
  const navigate = useNavigate();
  const { setLocation } = useContext(LocationContext);

  //handle 'find' button click 
  function handleFindEvents() {

    //get the users geolocation 
    navigator.geolocation.getCurrentPosition((position) => {
        const { longitude, latitude } = position.coords;

        //set location context
        setLocation({ longitude, latitude })
        
        //navigate to the events page 
        navigate(`/events`);
      },
      (error) => {
        console.error('Error getting location:  ', error);
        alert("Uh oh! We have been unable to get your location. Please ensure location services are enabled and try again.")
      }
    )
  }

  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="logo"> GIGFINDER LOGO</div>
        <div className="tagline">Click to find events near you</div>
        <button className="find-events-button" onClick={handleFindEvents}>
          FIND
        </button>
      </div>
    </div>
  )
}

export default LandingPage;
import React from "react";
import { useNavigate } from "react-router-dom";
import './landing-page.css';

function LandingPage() {
  const navigate = useNavigate();

  //handle 'find' button click 
  function handleFindEvents() {

    //get the users geolocation 
    navigator.geolocation.getCurrentPosition((position) => {
        const { longitude, latitude } = position.coords;
      
        //navigate to the events page - pass long and lat as query params
        navigate(`/events?lat=${latitude}&long=${longitude}`);
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
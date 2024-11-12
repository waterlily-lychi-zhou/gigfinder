import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './event-details-map.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlZmFuYnV0bGVyIiwiYSI6ImNtMzdmcncwMjBmamIyanNlODYyNDkwY3EifQ.1CrUKQTuJH1TKJsw3yrf-w'; 

function EventDetailsMap({ longitude, latitude }) {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!longitude || !latitude) {
      console.error('map input error')
      return;
    }

    //inititalise the map 
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [parseFloat(longitude), parseFloat(latitude)],
      zoom: 12
    });

    //add marker to the map with event location
    new mapboxgl.Marker().setLngLat([parseFloat(longitude), parseFloat(latitude)]).addTo(map);

    //cleanup on unmount
    return () => map.remove();
  }, [longitude, latitude]);

  return <div ref={mapContainerRef} className="event-details-map"></div>;
}

export default EventDetailsMap;
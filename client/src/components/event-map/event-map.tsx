import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./event-map.css";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic3RlZmFuYnV0bGVyIiwiYSI6ImNtMzdmcncwMjBmamIyanNlODYyNDkwY3EifQ.1CrUKQTuJH1TKJsw3yrf-w";

interface Location {
  latitude: number;
  longitude: number;
}

interface Event {
  name: string;
  dates: {
    start: {
      localDate: string;
      localTime: string;
    };
  };
  _embedded: {
    venues: {
      name: string;
      location: {
        latitude: string;
        longitude: string;
      };
    }[];
  };
}

interface EventMapProps {
  events: Event[];
  radius: number;
  location: Location;
}

const EventMap: React.FC<EventMapProps> = ({ events, radius, location }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log(`location = ${location.longitude}, ${location.latitude}`);

    if (!location || !location.latitude || !location.longitude) {
      console.error("location data error");
      return;
    }

    // Initialize map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLElement,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [location.longitude, location.latitude],
      zoom: 8,
      projection: { name: "mercator" },
    });

    // Add a marker for each event
    events.forEach((event) => {
      const longitude = parseFloat(
        event._embedded.venues[0].location.longitude
      );
      const latitude = parseFloat(event._embedded.venues[0].location.latitude);
      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .setPopup(
          new mapboxgl.Popup().setHTML(`
            <h3>${event.name}</h3>
            <p>${event._embedded.venues[0].name}</p>
            <p>${event.dates.start.localDate}</p>
            <p>${event.dates.start.localTime}</p>
          `)
        )
        .addTo(map);
    });

    // Cleanup on unmount
    return () => map.remove();
  }, [events, radius, location]);

  return <div ref={mapContainerRef} className="map-container"></div>;
};

export default EventMap;

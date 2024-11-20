import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./event-details-map.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic3RlZmFuYnV0bGVyIiwiYSI6ImNtMzdmcncwMjBmamIyanNlODYyNDkwY3EifQ.1CrUKQTuJH1TKJsw3yrf-w";

interface EventDetailsMapProps {
  longitude: string | number | null;
  latitude: string | number | null;
}

const EventDetailsMap: React.FC<EventDetailsMapProps> = ({
  longitude,
  latitude,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!longitude || !latitude) {
      console.error("Map input error: longitude or latitude is missing");
      return;
    }

    // Initialize the map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLElement,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [parseFloat(String(longitude)), parseFloat(String(latitude))],
      zoom: 12,
    });

    // Add marker to the map with event location
    new mapboxgl.Marker()
      .setLngLat([parseFloat(String(longitude)), parseFloat(String(latitude))])
      .addTo(map);

    // Cleanup on unmount
    return () => map.remove();
  }, [longitude, latitude]);

  return <div ref={mapContainerRef} className="event-details-map"></div>;
};

export default EventDetailsMap;

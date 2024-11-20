import React, { useContext, useEffect, useState } from "react";
import "./events-list-page.css";
import { LocationContext } from "../../context/location-context";
import ScaleLoader from "react-spinners/ScaleLoader";
import { EventList } from "../../components/event-list/event-list";
import EventMap from "../../components/event-map/event-map";
import Navbar from "../../components/navbar/navbar";

interface Event {
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

const override: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#b800a6",
};

const EventsListPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { location } = useContext(LocationContext) as {
    location: { latitude: number; longitude: number };
  };
  const [searchRadius, setSearchRadius] = useState(20);
  const color = "#b800a6";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3001/api/events?lat=${location.latitude}&long=${location.longitude}`
        );
        const data = await response.json();
        const transformedEvents: Event[] = data.futureEvents.map((e: any) => ({
          id: e.id,
          name: e.name,
          dates: {
            start: {
              localDate: e.dates.start.localDate,
              localTime: e.dates.start.localTime,
            },
          },
          venue: e.venue || "",
          images: e.images || [],
          _embedded: {
            venues: e._embedded.venues.map((v: any) => ({
              name: v.name || "Unknown Venue",
              location: {
                latitude: v.location.latitude,
                longitude: v.location.longitude,
              },
            })),
          },
        }));
        setEvents(transformedEvents);
      } catch (error) {
        console.error("error fetching events: ", error);
      } finally {
        setLoading(false);
      }
    };
    if (location.latitude && location.longitude) fetchEvents();
  }, [location]);

  return (
    <div className="events-list-page">
      <Navbar />
      {loading ? (
        <ScaleLoader
          color={color}
          style={override}
          loading={loading}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div>
          <div className="upcoming-events">
            <h2>UPCOMING EVENTS NEAR YOU</h2>
            <EventList events={events} />
          </div>
          <EventMap
            events={events}
            radius={searchRadius}
            location={{
              latitude: location.latitude.toString(),
              longitude: location.longitude.toString(),
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EventsListPage;

import React, { createContext, useEffect, useState, ReactNode } from "react";

interface Location {
  latitude: number | null;
  longitude: number | null;
}

export interface LocationContextType {
  location: { latitude: number | null; longitude: number | null };
  setLocation: (location: { latitude: number; longitude: number }) => void;
}

export const LocationContext = createContext<LocationContextType | null>(null);

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({
  children,
}) => {
  const [location, setLocation] = useState<Location>(() => {
    const savedLocation = localStorage.getItem("location");
    return savedLocation
      ? JSON.parse(savedLocation)
      : { latitude: null, longitude: null };
  });

  // Save location to local storage if it changes
  useEffect(() => {
    if (location.latitude !== null && location.longitude !== null) {
      localStorage.setItem("location", JSON.stringify(location));
    }
  }, [location]);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

import React, { createContext, useState } from "react";

export const LocationContext = createContext();

export function LocationProvider({children}) {
  const [location, setLocation] = useState({latitude: null, longitude: null});

  return (
    <LocationContext.Provider value={({location, setLocation})}>
      {children}
    </LocationContext.Provider>
  );
}
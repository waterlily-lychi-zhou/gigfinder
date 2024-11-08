import React, { createContext, useEffect, useState } from "react";

export const LocationContext = createContext();

export function LocationProvider({children}) {
 
  //if there is a saved location use it else set to null 
  const [location, setLocation] = useState(() => {
    const savedLocation = localStorage.getItem('location');
    return savedLocation ? JSON.parse(savedLocation) : {latitude: null, longitude: null};
  });

  //save location to local storage if it changes
  useEffect(() => {
    if (location.latitude && location.longitude) {
      localStorage.setItem('location', JSON.stringify(location));
    }
  }, [location])

  return (
    <LocationContext.Provider value={({location, setLocation})}>
      {children}
    </LocationContext.Provider>
  );
}
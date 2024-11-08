import React, { createContext, useEffect, useState } from 'react';

export const FavouritesContext = createContext();

export function FavouritesProvider ({ children }) {
  const [favourites, setFavourites] = useState([]);

  //on load fetch favourites from backend
  useEffect(() => {
    const fetchFavourites = async() => {
      try {
        const response = await fetch('http://localhost:3001/api/favourites');
        const data = await response.json();
        setFavourites(data);
      } catch (error) {
        console.error('Error fetching favourites');
      }
    }
    fetchFavourites();
  }, [])

  //add favourites
  const addToFavourites = async(event) => {
    try {
      const response = await fetch('http://localhost:3001/api/favourites', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ eventId: event.id, eventDetails: event }),
      })
      const newFavourite = await response.json();
      setFavourites([...favourites, newFavourite]);
    } catch (error) {
      console.error('Error adding to favourites', error);
    }
  }

  //delete from favourites
  const deleteFromFavourites = async(eventId) => {
    try {
      await fetch(`http://localhost:3001/api/favourites/${eventId}`, {method: 'DELETE'});
      setFavourites(favourites.filter((favourite) => favourite.eventId !== eventId));

    } catch (error) {
      console.error('Error deleting from favourites:  ', error);
    }
  }

  return (
    <FavouritesContext.Provider value={{ favourites, addToFavourites, deleteFromFavourites }}>
      {children}
    </FavouritesContext.Provider>
  )
}
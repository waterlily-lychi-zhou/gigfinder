import React, { createContext, useEffect, useState, ReactNode } from "react";

interface EventDetails {
  id: string;
  name: string;
  images: { url: string }[];
  dates: {
    start: {
      localDate: string;
      localTime: string;
    };
  };
  venue: string;
}

interface FavouritesEvent {
  eventId: string;
  eventDetails: EventDetails;
}

interface FavouritesContextType {
  favourites: FavouritesEvent[];
  addToFavourites: (event: EventDetails) => Promise<void>;
  deleteFromFavourites: (eventId: string) => Promise<void>;
}

export const FavouritesContext = createContext<FavouritesContextType | null>(
  null
);

interface FavouritesProviderProps {
  children: ReactNode;
}

export const FavouritesProvider: React.FC<FavouritesProviderProps> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<FavouritesEvent[]>([]);

  // On load, fetch favourites from backend
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/favourites");
        const data: FavouritesEvent[] = await response.json();
        setFavourites(data);
      } catch (error) {
        console.error("Error fetching favourites", error);
      }
    };
    fetchFavourites();
  }, []);

  // Add to favourites
  const addToFavourites = async (event: EventDetails): Promise<void> => {
    try {
      const response = await fetch("http://localhost:3001/api/favourites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: event.id, eventDetails: event }),
      });
      const newFavourite: FavouritesEvent = await response.json();
      setFavourites([...favourites, newFavourite]);
    } catch (error) {
      console.error("Error adding to favourites", error);
    }
  };

  // Delete from favourites
  const deleteFromFavourites = async (eventId: string): Promise<void> => {
    try {
      await fetch(`http://localhost:3001/api/favourites/${eventId}`, {
        method: "DELETE",
      });
      setFavourites(
        favourites.filter((favourite) => favourite.eventId !== eventId)
      );
    } catch (error) {
      console.error("Error deleting from favourites: ", error);
    }
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addToFavourites, deleteFromFavourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

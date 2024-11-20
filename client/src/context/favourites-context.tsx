import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";

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

interface FavouriteEvent {
  eventId: string;
  eventDetails: EventDetails;
}

interface FavouritesContextType {
  favourites: FavouriteEvent[];
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
  const [favourites, setFavourites] = useState<FavouriteEvent[]>([]);

  // On load, fetch favourites from backend
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/favourites");
        const data: FavouriteEvent[] = await response.json();
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
      const newFavourite: FavouriteEvent = await response.json();
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

export const useFavourites = (): FavouritesContextType => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }
  return context;
};

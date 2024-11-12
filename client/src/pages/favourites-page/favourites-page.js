import React, { useContext } from "react";
import '../events-list-page/events-list-page.css';
import { FavouritesContext } from "../../context/favourites-context";
import Navbar from "../../components/navbar/navbar";
// import EventMap from "../../components/event-map/event-map";
import { FavouritesList } from "../../components/favourites-list/favourites-list";

function FavouritesPage() {
  const { favourites  } = useContext(FavouritesContext)



  return (
    <div className="page">
      <Navbar />
        <div>
          {favourites.length > 0 ? 
          <div className="favourite-events">
            <h2>YOUR FAVOURITE EVENTS</h2>
            <FavouritesList events={favourites}/> 
          </div>
          : <h2>No favourites added yet.. </h2>
        }

        </div>
    </div>
  );
}

export default FavouritesPage;
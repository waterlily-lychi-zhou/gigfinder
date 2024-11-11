import React, { useContext } from "react";
import './favourites-page.css';
import { FavouritesContext } from "../../context/favourites-context";
import Navbar from "../../components/navbar/navbar";
// import EventMap from "../../components/event-map/event-map";
import { FavouritesList } from "../../components/favourites-list/favourites-list";

function FavouritesPage() {
  const { favourites  } = useContext(FavouritesContext)



  return (
    <div className="favourites-page">
      <Navbar />
        <div>
          {favourites.length > 0 ? 
          <div className="favourite-events">
            <h1>YOUR FAVOURITE EVENTS</h1>
            <FavouritesList events={favourites}/> 
          </div>
          : <div>No favourites added yet.. </div>
        }

        </div>
    </div>
  );
}

export default FavouritesPage;
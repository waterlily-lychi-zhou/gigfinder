import React from "react";
import './navbar.css';

import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">GIGFINDER</div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/events" className="nav-link" activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/favourites" className="nav-link" activeClassName="active">Favourites</NavLink>
        </li>
        <li>
          <NavLink to="/reviews" className="nav-link" activeClassName="active">Reviews</NavLink>
        </li>
      </ul>
    </div>
  );
}


export default Navbar;
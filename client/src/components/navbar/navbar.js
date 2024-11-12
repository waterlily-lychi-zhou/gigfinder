import React from "react";
import './navbar.css';

import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <img src="/gigfinder-logo.png" alt="gigfinder-logo" className="navbar-logo"/>
      <ul className="navbar-links">
        <li>
          <NavLink to="/events" className="nav-link">Home</NavLink>
        </li>
        <li>
          <NavLink to="/favourites" className="nav-link">Favourites</NavLink>
        </li>
      </ul>
    </div>
  );
}


export default Navbar;
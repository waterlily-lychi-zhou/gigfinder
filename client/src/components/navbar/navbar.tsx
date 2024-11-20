import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <img
        src="/gigfinder-logo.png"
        alt="gigfinder-logo"
        className="navbar-logo"
      />
      <ul className="navbar-links">
        <li>
          <NavLink to="/events" className="nav-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/favourites" className="nav-link">
            Favourites
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

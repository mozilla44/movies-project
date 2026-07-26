import { NavLink } from "react-router-dom";

import logo from "/images/logo.png";



import "./Header.css";

export const Header = () => {
  return (
    <header className="header">
      <NavLink to="/" className="brand">
        <img src={logo} className="logo" alt="Popcorn Watch" />
        <span>Popcorn Watch</span>
      </NavLink>
      <nav className="topnav">
        <NavLink to="/" end>Latest</NavLink>
        <NavLink to="/trending">Trending</NavLink>
        <NavLink to="/upcoming">Upcoming</NavLink>
      </nav>
    </header>
  );
};

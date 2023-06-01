import { Link } from "react-router-dom";
import logo from "/images/logo.png";
import "./Header.css";

export const Header = () => {
  return (
    <header className="header">
      <img src={logo} className="logo" alt="logo"></img>

        <nav className="topnav">
          <Link to="/">Trending</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/upcoming">Upcoming</Link>
        </nav>
        
    </header>
    
  );
};
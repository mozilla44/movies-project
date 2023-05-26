import { Link, Routes, Route, BrowserRouter } from "react-router-dom";
import "./Header.css";
import { Footer } from "./Footer";
export const Header = () => {
  return (
    <header className="header">
      <img src="/logo.png" className="logo" alt="logo"></img>
      <BrowserRouter>
        <nav className="topnav">
          <Link to="">Trending</Link>
          <Link to="">Categories</Link>
          <Link to="">Upcoming</Link>
        </nav>
        <div className="searchbar">
          <form action="" className="search_form">
            <input type="search" required />
            <i className="fa fa-search"></i>
            <a /* href="javascript:void(0)" */ id="clear-btn">
            </a>
          </form>
        </div>
      </BrowserRouter>
      <Footer/>
    </header>
    
  );
};

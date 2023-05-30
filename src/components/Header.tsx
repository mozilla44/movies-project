import { Link, Routes, Route, BrowserRouter } from "react-router-dom";
import "./Header.css";
import { Footer } from "./Footer";
import { getCategories } from "../api/categoryAPI";
export const Header = () => {
  return (
    <header className="header">
      <img src="/logo.png" className="logo" alt="logo"></img>
        <nav className="topnav">
          <button>Trending</button>
          <button onClick={getCategories()}>Categories</button>
          <button>Upcoming</button>
        </nav>
        <div className="searchbar">
          <form action="" className="search_form">
            <input type="search" required />
            <i className="fa fa-search"></i>
            <a /* href="javascript:void(0)" */ id="clear-btn">
            </a>
          </form>
        </div>
      <Footer/>
    </header>
    
  );
};

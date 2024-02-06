import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Category } from "../models/Categories";
import { getCategories } from "../api/categoryAPI";

import logo from "/images/logo.png";



import "./Header.css";

export const Header = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const Toggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  useEffect(() => {
    const getCat = async () => {
      try {
        const categoriesData = await getCategories();

        setCategories(categoriesData);
      } catch (error) {
        console.log(error);
      }
    };

    getCat();
  }, []);
  return (
    <header className="header">
      <NavLink  to="/" className="logo_link"  >
        <img src={logo} className="logo" alt="logo"></img>
      </NavLink>
      <Link to=""><div className="app_title">Popcorn Watch</div></Link>
      
      <nav className="topnav">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active_link' : "header_links")}>Trending</NavLink>
        <NavLink to="/upcoming" className={({ isActive }) => (isActive ? 'active_link' : "header_links")}>Upcoming</NavLink>
      </nav>
    </header>
  );
};

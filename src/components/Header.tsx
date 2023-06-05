import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Category } from "../models/Categories";
import { getCategories } from "../api/categoryAPI";

import logo from "/images/logo.png";

import { CategoriesList } from "../pages/homepage/components/CategoriesList";
import logo from "/logo.ico";

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
      <Link to="/" className="logo_link">
        <img src={logo} className="logo" alt="logo"></img>
      </Link>
      <div className="app_title">Popcorn Watch</div>

      <nav className="topnav">
        <Link to="/" className="header_links">
          Trending
        </Link>
        <Link to="/upcoming" className="header_links">
          Upcoming
        </Link>
      </nav>
    </header>
  );
};

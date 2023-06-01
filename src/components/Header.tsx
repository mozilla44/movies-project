import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { Category } from "../models/Categories";
import { MovieType } from "../models/Movie";
import { getCategories } from "../api/categoryAPI";
// import "./Header.css";

export const Header = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const Toggle = () => {
    setIsOpen((isOpen) => !isOpen);
  }

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
      <img src="/logo.png" className="logo" alt="logo"></img>

        <nav className="topnav">
          <Link to="/">Trending</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/upcoming">Upcoming</Link>
        </nav>

        <div className="searchbar">
          
        </div>
        
    </header>
    
  );
};



{/* <form action="" className="search_form">
            <input type="search" required />
            <i className="fa fa-search"></i>
            <a id="clear-btn">
            </a>
          </form> */}
import { Link, Routes, Route, BrowserRouter } from "react-router-dom";
import "./Header.css";
import { Footer } from "./Footer";
import { getCategories } from "../api/categoryAPI";
import { useEffect,useState } from "react";
import { Category } from "../models/Categories";
import { CategoriesList } from "../pages/homepage/components/CategoriesList";



export const Header = () => {
  const [categories, setCategories] = useState<Category[]>([]);

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
          <button>Trending</button>
          <button /* onClick={getCategories()} */>Categories</button>
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
        <CategoriesList categories={categories}/>
    </header>
    
  );
};

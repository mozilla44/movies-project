import "./Header.css";
import { getCategories } from "../api/categoryAPI";
import { useEffect,useState } from "react";
import { Category } from "../models/Categories";
import { CategoriesList } from "../pages/homepage/components/CategoriesList";



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
          <button>Trending</button>
          <button onClick={Toggle}>Categories</button>
          <button>Upcoming</button>
        </nav>
        <div className="searchbar">
          
        </div>
        {isOpen && <CategoriesList categories={categories}/>}
        
    </header>
    
  );
};



{/* <form action="" className="search_form">
            <input type="search" required />
            <i className="fa fa-search"></i>
            <a id="clear-btn">
            </a>
          </form> */}

import { Link, Routes, Route, BrowserRouter} from "react-router-dom"
import "./Header.css"
export const Header = () => {
    return(
        <header className="header">
           <img src="/logo.png" className="logo" alt="logo"></img>
           <BrowserRouter>
           <nav className="topnav">
            <Link to="">Trending</Link> 
            <Link to="">Categories</Link> 
            <Link to="">Upcoming</Link> 
            </nav>
      </BrowserRouter>
        </header>
    )
}
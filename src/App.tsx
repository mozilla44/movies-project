import HomePage from "./pages/homepage/HomePage";
import DetailsPage from "./pages/details/DetailsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./App.css";



const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Header />
        <Routes>
          {/* No, what if you need a 404 page ? 
          If the user stays on the same page there is no need to change the location
          It can all be done with the state variables and it is much more performant than rendering 
          all the page
           */}
          <Route
            path="/*"
            element={<HomePage />}
          />
          <Route path="/details/:movieId" element={<DetailsPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
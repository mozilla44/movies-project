
import React from "react";
import { MovieCard } from "./pages/homepage/components/MovieCard";
import "./App.css";
import { DetailsPage } from "./pages/details/DetailsPage";
import { Header } from './components/Header'
import { Footer } from './components/Footer'

const App = () => {
  return (
    <div>
      <MovieCard />
      <Header/>
      <Footer/>
      <DetailsPage />
    </div>
  );
};


export default App;

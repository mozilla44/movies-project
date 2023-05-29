import React from "react";
import { MovieCard } from "./pages/homepage/components/MovieCard";
import "./App.css";
import { DetailsPage } from "./pages/details/DetailsPage";

const App = () => {
  return (
    <div>
      <MovieCard />

      <DetailsPage />
    </div>
  );
};

export default App;

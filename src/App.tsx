import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { DetailsPage } from "./pages/details/DetailsPage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { getAll, getUpcoming } from "./api/movieAPI";
import { MoviesList } from "./pages/homepage/components/MoviesList";
import { MovieType } from "./models/Movie";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  // const showDetailsPage = false;

  const [upcomingMovies, setUpcomingMovies] = useState<MovieType[]>([]);

  const getUpcomingMovies = async () => {
    try {
      const upcomingMoviesData = await getUpcoming();
      setUpcomingMovies(upcomingMoviesData);
    } catch (error) {
      console.error("Failed to fetch upcoming movies:", error);
    }
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        const moviesData = await getAll();
        setMovies(moviesData);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    getMovies();
    getUpcomingMovies();
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MoviesList movies={movies} />} />
        <Route
          path="/upcoming"
          element={<MoviesList movies={upcomingMovies} />}
        />

        {/* <Route
          path="/details/:id"
          element={<DetailsPage show={showDetailsPage} />}
        /> */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

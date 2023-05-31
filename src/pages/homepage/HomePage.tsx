import React, { useState, useEffect } from "react";
import { getUpcoming, getAll } from "../../api/movieAPI";
import { MovieType } from "../../models/Movie";
import { MoviesList } from "./components/MoviesList";

 const HomePage = () => {
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
        <>
            <MoviesList movies={movies} />
        </ >
    )
}

export default HomePage;
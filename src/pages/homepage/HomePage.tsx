import React, { useState, useEffect } from "react";
import { getUpcoming, getAll } from "../../api/movieAPI";
import { MovieType } from "../../models/Movie";
import { MoviesList } from "./components/MoviesList";
import axios from "axios";
import DetailsPage from "../details/DetailsPage";

const HomePage = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  // const showDetailsPage = false;
  const [upcomingMovies, setUpcomingMovies] = useState<MovieType[]>([]);

  const getUpcomingMovies = async () => {
    const upcomingMoviesData = await getUpcoming();
    setUpcomingMovies(upcomingMoviesData);
  };

  useEffect(() => {
    const getMovies = async () => {
      const moviesData = await getAll();
      setMovies(moviesData);
    };
    getMovies();
    getUpcomingMovies();
  }, []);

  return (
    <>
      <MoviesList movies={movies} />
    </>
  );
};

export default HomePage;
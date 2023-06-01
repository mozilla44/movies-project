import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAll, getUpcoming, getSearched } from "../../api/movieAPI";
import { MovieType } from "../../models/Movie";
import { MoviesList } from "./components/MoviesList";
import { SearchBar } from "./components/SearchBar";

const HomePage = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<MovieType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const location = useLocation();

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

  useEffect(() => {
    const fetchMoviesBySearch = async () => {
      if (searchQuery) {
        const moviesData = await getSearched(searchQuery);
        if (moviesData != null && moviesData.length > 0) {
          setMovies(moviesData);
        }
      }
    };

    fetchMoviesBySearch();
  }, [searchQuery]);


  return (
    <div>
      <SearchBar onSearch={setSearchQuery} />

      {location.pathname === "/" && <MoviesList movies={movies} />}

      {location.pathname === "/upcoming" && (
        <MoviesList movies={upcomingMovies} />
      )}

      {searchQuery.length > 0 && <MoviesList movies={movies} />}
    </div>
  );
};

export default HomePage;

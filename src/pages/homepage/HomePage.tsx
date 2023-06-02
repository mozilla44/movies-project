<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from "react";
import { getUpcoming, getAll, fetchMoviesByCategory } from "../../api/movieAPI";
import { MovieType } from "../../models/Movie";
import { MoviesList } from "./components/MoviesList";
import { CategoriesList } from "./components/CategoriesList";
import { Category } from "../../models/Categories";
import { getCategories } from "../../api/categoryAPI";



const HomePage = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId,setCategoryId] = useState<number|null>(null);
>>>>>>> d01ea55a25e09f69f7f6b152a9528bce47beb920

  const getSortedMovies = async () => {
    if (categoryId != null) {
    const SortedMoviesData = await fetchMoviesByCategory(categoryId);
    setMovies(SortedMoviesData);
    }
  };

  useEffect(() => {
    getSortedMovies();
  }, [categoryId])

  useEffect(() => {
    const getMovies = async () => {
      const moviesData = await getAll();
      setMovies(moviesData);
    };
    getMovies();
    getSortedMovies();
  }, []);

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
<<<<<<< HEAD
    <div>
      <SearchBar onSearch={setSearchQuery} />

      {location.pathname === "/" && <MoviesList movies={movies} />}

      {location.pathname === "/upcoming" && (
        <MoviesList movies={upcomingMovies} />
      )}

      {searchQuery.length > 0 && <MoviesList movies={movies} />}
    </div>
=======
    <>
    <CategoriesList categories={categories}  setCategoryId={setCategoryId}/>
      <MoviesList  movies={movies} />
    </>
>>>>>>> d01ea55a25e09f69f7f6b152a9528bce47beb920
  );
};

export default HomePage;

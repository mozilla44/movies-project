
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getUpcoming, getAll, fetchMoviesByCategory, getSearched } from "../../api/movieAPI";
import { MovieType } from "../../models/Movie";
import { MoviesList } from "./components/MoviesList";
import { CategoriesList } from "./components/CategoriesList";
import { Category } from "../../models/Categories";
import { getCategories } from "../../api/categoryAPI";
import { SearchBar } from "./components/SearchBar";
import { CategoryBtn } from "./components/CategoryBtn";



const HomePage = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId,setCategoryId] = useState<number|null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [upcomingMovies, setUpcomingMovies] = useState<MovieType[]>([]);
  const location = useLocation();


  const getSortedMovies = async () => {
    if (categoryId != null) {
    const SortedMoviesData = await fetchMoviesByCategory(categoryId);
    setMovies(SortedMoviesData);
    }
  };

  const getUpcomingMovies = async () => {
    const upcomingMoviesData = await getUpcoming();
    setUpcomingMovies(upcomingMoviesData);
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
    getUpcomingMovies();
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
    <div>
      
            <div className="categories-list">
                {categories.map(category => (
                    <CategoryBtn key={category.id} category={category} setCategoryId={setCategoryId} />
                ))}
            </div>
      
      <SearchBar onSearch={setSearchQuery} />

      {location.pathname === "/" && <MoviesList movies={movies} />}

      {location.pathname === "/upcoming" && (
        <MoviesList movies={upcomingMovies} />
      )}

      <CategoriesList categories={categories}  setCategoryId={setCategoryId}/>
      <MoviesList  movies={movies} />

      {searchQuery.length > 0 && <MoviesList movies={movies} />}

    </div>
  );
};

export default HomePage;

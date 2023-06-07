import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getUpcoming,
  getAll,
  fetchMoviesByCategory,
  getSearched,
} from "../../api/movieAPI";
import { MovieType } from "../../models/Movie";
import { MoviesList } from "./components/MoviesList";
import { Category } from "../../models/Categories";
import { getCategories } from "../../api/categoryAPI";
import { SearchBar } from "./components/SearchBar";
import { CategoryBtn } from "./components/CategoryBtn";

// Why importing these CSS files ? Usually the CSS files are imported in the
// component file concerned :)
import "../homepage/components/CategoryBtn.css";
import "../../../src/index.css";

import "./HomePage.css";

const HomePage = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [upcomingMovies, setUpcomingMovies] = useState<MovieType[]>([]);
  // It is a misconception to change the location when staying on the same page
  // You should add state variables and one more useEffect, it is much better
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
  }, [categoryId]);

  useEffect(() => {
    const getMovies = async () => {
      const moviesData = await getAll();
      setMovies(moviesData);
    };
    // So here you fetch all the movies, the upcoming and trending
    // But you don't need all the data on app init, juste the trending.
    // So there is a useless fetch, which is not good for the perfs
    // And the fetch by category does not need to be in this useEffect
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
    const searchMoviesByQuery = async () => {
      if (searchQuery) {
        const searchedMoviesData = await getSearched(searchQuery);
        if (searchedMoviesData != null && searchedMoviesData.length > 0) {
          setMovies(searchedMoviesData);
        }
      }
    };

    searchMoviesByQuery();
  }, [searchQuery]);

  return (
    <div className="homepage-container">
      <div className="category_btn_area">
        {categories.map((category) => (
          <CategoryBtn
            key={category.id}
            category={category}
            setCategoryId={setCategoryId}
          />
        ))}
      </div>

      {location.pathname === "/" && <SearchBar whenSearched={setSearchQuery} />}

      {location.pathname === "/" && <MoviesList movies={movies} />}

      {location.pathname === "/upcoming" && (
        <MoviesList movies={upcomingMovies} />
      )}

      {searchQuery.length > 0 && <MoviesList movies={movies} />}
    </div>
  );
};

export default HomePage;

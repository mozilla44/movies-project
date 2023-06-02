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

  return (
    <>
    <CategoriesList categories={categories}  setCategoryId={setCategoryId}/>
      <MoviesList  movies={movies} />
    </>
  );
};

export default HomePage;
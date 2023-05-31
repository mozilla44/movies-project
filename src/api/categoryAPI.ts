import axios from "axios";
import { Category } from "../models/Categories";
import { MovieType } from "../models/Movie";

const API_KEY = import.meta.env.VITE_API_KEY as string;

export const getCategories = async (): Promise<Category[]> => {
  try {
    const allMoviesURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    const response = await axios.get<{ genres: Category[] }>(allMoviesURL);
    console.log(response.data.genres);
    return response.data.genres;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch categories"); 
  }
};


export const fetchMoviesByCategory = async (categoryId: number) : Promise<MovieType[]> => {
  const API_KEY = import.meta.env.VITE_API_KEY as string;
      try {
          const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${categoryId}`;
          const response = await axios.get<{ results: MovieType[] }>(URL);
          console.log(response.data.results);
          console.log("coucou")
          return response.data.results;
        } catch (error) {
          console.log(error);
          throw new Error("Failed to fetch categories"); 
        }
    };

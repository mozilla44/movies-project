import axios from "axios";
import { Category } from "../models/Categories";

const API_KEY = import.meta.env.VITE_API_KEY as string;

export const getCategories = async (): Promise<Category[]> => {
  try {
    const allMoviesURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    const response = await axios.get<{ genres: Category[] }>(allMoviesURL);
    return response.data.genres;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch categories"); 
  }
};




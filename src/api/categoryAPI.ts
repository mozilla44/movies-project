import axios from "axios";
import { Category } from "../models/Categories";

const API_KEY = import.meta.env.VITE_API_KEY as string;
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN as string;
const authParams = API_KEY ? `api_key=${API_KEY}&` : "";
const requestConfig = ACCESS_TOKEN
  ? { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }
  : undefined;

export const getCategories = async (): Promise<Category[]> => {
  try {
    const allMoviesURL = `https://api.themoviedb.org/3/genre/movie/list?${authParams}language=en-US`;
    const response = await axios.get<{ genres: Category[] }>(allMoviesURL, requestConfig);
    return response.data.genres;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch categories"); 
  }
};

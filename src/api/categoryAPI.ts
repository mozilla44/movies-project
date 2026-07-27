import axios from "axios";
import { Category } from "../models/Categories";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<{ genres: Category[] }>(
      "/api/tmdb/genre/movie/list?language=en-US"
    );
    return response.data.genres;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch categories"); 
  }
};

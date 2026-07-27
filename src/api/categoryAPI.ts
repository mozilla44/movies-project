import { Category } from "../models/Categories";
import { tmdbClient } from "./tmdbClient";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await tmdbClient.get<{ genres: Category[] }>("/genre/movie/list", {
      params: { language: "en-US" },
    });
    return response.data.genres;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch categories"); 
  }
};

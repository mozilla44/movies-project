import axios from "axios";
import { Category } from "../models/Categories";

const API_KEY = import.meta.env.VITE_API_KEY as string;

export const getCategories = async (): Promise<Category[]> => {
  try {
    // Construct the URL to fetch all categories
    const allMoviesURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

    // Send a GET request to the API and await the response
    const response = await axios.get<{ results: Category[] }>(allMoviesURL);

    // Log the movie results to the console
    console.log(response.data.results);

    // Return the list of categories
    return response.data.results;
  } catch (error) {
    // Log any errors that occur during the request or response handling
    console.log(error);

    // Throw a new error indicating the failure to fetch movies
    throw new Error("Failed to fetch categories"); // or handle the error accordingly
  }
};
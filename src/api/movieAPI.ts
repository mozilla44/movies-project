import axios from "axios";
import { MovieType } from "../models/Movie";

const API_KEY = import.meta.env.VITE_API_KEY as string;

export const getAll = async (): Promise<MovieType[]> => {
  try {
    // Construct the URL to fetch all movies
    const allMoviesURL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US`;

    // Send a GET request to the API and await the response
    const response = await axios.get<{ results: MovieType[] }>(allMoviesURL);

    // Return the list of movies
    return response.data.results;
  } catch (error) {
    // Log any errors that occur during the request or response handling
    console.log(error);

    // Throw a new error indicating the failure to fetch movies
    throw new Error("Failed to fetch movies"); // or handle the error accordingly
  }
};

export const getUpcoming = async (): Promise<MovieType[]> => {
  try {
    const upcomingMoviesURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US`;
    const response = await axios.get<{ results: MovieType[] }>(
      upcomingMoviesURL
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch upcoming movies");
  }
};
export const fetchMoviesByCategory = async (
  categoryId: number
): Promise<MovieType[]> => {
  try {
    const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${categoryId}`;
    const response = await axios.get<{ results: MovieType[] }>(URL);
    console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch categories");
  }
};


export const getSearched = async (query: string): Promise<MovieType[]> => {
  try {
    const searchMoviesURL = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&language=en-US`;

    const response = await axios.get<{ results: MovieType[] }>(searchMoviesURL);

    console.log("Search response:", response.data.results);

    return response.data.results;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch searched movies");
  }
};


export const getMovieById = async (movieId:string|undefined) => {
  try{
    const movieByIdUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    const response = await axios.get<MovieType>(movieByIdUrl);
    return response.data;
  } catch (error){
    console.log(error)
    throw new Error("Failed to fetch movie object")
  }
}
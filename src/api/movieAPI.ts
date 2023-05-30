import axios from "axios";
import { MovieType } from "../models/Movie";

const API_KEY = import.meta.env.VITE_API_KEY as string;

export const getAll = async (): Promise<MovieType[]> => {
  try {
    // Construct the URL to fetch all movies
    const allMoviesURL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=fr-FR`;

    // Send a GET request to the API and await the response
    const response = await axios.get<{ results: MovieType[] }>(allMoviesURL);

    // Log the movie results to the console
    console.log(response.data.results);

    // Return the list of movies
    return response.data.results;
  } catch (error) {
    // Log any errors that occur during the request or response handling
    console.log(error);

    // Throw a new error indicating the failure to fetch movies
    throw new Error("Failed to fetch movies"); // or handle the error accordingly
  }
};

// export const getAll = async () => {
//   const allMoviesURL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=fr-FR`;
//   return axios
//     .get<{ results: MovieType[] }>(allMoviesURL)
//     .then((response) => {
//       console.log(response.data.results);
//       return response.data.results;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
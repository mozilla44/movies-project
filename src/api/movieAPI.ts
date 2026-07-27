import axios from "axios";
import { MovieType } from "../models/Movie";

const API_KEY = import.meta.env.VITE_API_KEY as string;
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN as string;
const authParams = API_KEY ? `api_key=${API_KEY}&` : "";
const localeParams = "language=en-US&region=US";
const requestConfig = ACCESS_TOKEN
  ? { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }
  : undefined;

export type MoviePage = {
  results: MovieType[];
  page: number;
  total_pages: number;
  total_results: number;
};

export type MovieCredits = {
  cast: Array<{ id: number; name: string; character: string; profile_path: string | null }>;
  crew: Array<{ id: number; name: string; job: string }>;
};

const getMoviePage = async (url: string): Promise<MoviePage> => {
  const response = await axios.get<MoviePage>(url, requestConfig);
  return response.data;
};

export const getAll = (page = 1): Promise<MoviePage> =>
  getMoviePage(
    `https://api.themoviedb.org/3/discover/movie?${authParams}${localeParams}&sort_by=popularity.desc&page=${page}`
  );

export const getTrending = (page = 1): Promise<MoviePage> =>
  getMoviePage(
    `https://api.themoviedb.org/3/trending/movie/day?${authParams}${localeParams}&page=${page}`
  );

export const getLatest = (page = 1): Promise<MoviePage> =>
  getMoviePage(
    `https://api.themoviedb.org/3/movie/now_playing?${authParams}${localeParams}&page=${page}`
  );

export const getUpcoming = (page = 1): Promise<MoviePage> =>
  getMoviePage(
    `https://api.themoviedb.org/3/movie/upcoming?${authParams}${localeParams}&page=${page}`
  );

export const fetchMoviesByCategory = (categoryId: number, page = 1): Promise<MoviePage> =>
  getMoviePage(
    `https://api.themoviedb.org/3/discover/movie?${authParams}${localeParams}&with_genres=${categoryId}&sort_by=popularity.desc&page=${page}`
  );

export const getSearched = (query: string, page = 1): Promise<MoviePage> =>
  getMoviePage(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&${authParams}${localeParams}&page=${page}`
  );

export const getMovieById = async (movieId: string | undefined) => {
  try {
    const movieByIdUrl = `https://api.themoviedb.org/3/movie/${movieId}?${authParams}${localeParams}`;
    const response = await axios.get<MovieType>(movieByIdUrl, requestConfig);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch movie object");
  }
};

export const getMovieCredits = async (movieId: string | undefined): Promise<MovieCredits> => {
  const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?${authParams}${localeParams}`;
  const response = await axios.get<MovieCredits>(creditsUrl, requestConfig);
  return response.data;
};

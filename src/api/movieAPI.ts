import axios from "axios";
import { MovieType } from "../models/Movie";

const API_BASE_URL = "/api/tmdb";
const localeParams = "language=en-US&region=US";

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
  const response = await axios.get<MoviePage>(url);
  return response.data;
};

export const getAll = (page = 1): Promise<MoviePage> =>
  getMoviePage(
    `${API_BASE_URL}/discover/movie?${localeParams}&sort_by=popularity.desc&page=${page}`
  );

export const getTrending = (page = 1): Promise<MoviePage> =>
  getMoviePage(
    `${API_BASE_URL}/trending/movie/day?${localeParams}&page=${page}`
  );

export const getLatest = (page = 1): Promise<MoviePage> =>
  getMoviePage(
    `${API_BASE_URL}/movie/now_playing?${localeParams}&page=${page}`
  );

export const getUpcoming = (page = 1): Promise<MoviePage> =>
  getMoviePage(
    `${API_BASE_URL}/movie/upcoming?${localeParams}&page=${page}`
  );

export const fetchMoviesByCategory = (categoryId: number, page = 1): Promise<MoviePage> =>
  getMoviePage(
    `${API_BASE_URL}/discover/movie?${localeParams}&with_genres=${categoryId}&sort_by=popularity.desc&page=${page}`
  );

export const getSearched = (query: string, page = 1): Promise<MoviePage> =>
  getMoviePage(
    `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&${localeParams}&page=${page}`
  );

export const getMovieById = async (movieId: string | undefined) => {
  try {
    const movieByIdUrl = `${API_BASE_URL}/movie/${movieId}?${localeParams}`;
    const response = await axios.get<MovieType>(movieByIdUrl);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch movie object");
  }
};

export const getMovieCredits = async (movieId: string | undefined): Promise<MovieCredits> => {
  const creditsUrl = `${API_BASE_URL}/movie/${movieId}/credits?${localeParams}`;
  const response = await axios.get<MovieCredits>(creditsUrl);
  return response.data;
};

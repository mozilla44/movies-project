import { MovieType } from "../models/Movie";
import { tmdbClient } from "./tmdbClient";

const localeParams = { language: "en-US", region: "US" };

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

const getMoviePage = async (
  path: string,
  params: Record<string, string | number> = {}
): Promise<MoviePage> => {
  const response = await tmdbClient.get<MoviePage>(path, {
    params: { ...localeParams, ...params },
  });
  return response.data;
};

export const getAll = (page = 1): Promise<MoviePage> =>
  getMoviePage("/discover/movie", { sort_by: "popularity.desc", page });

export const getTrending = (page = 1): Promise<MoviePage> =>
  getMoviePage("/trending/movie/day", { page });

export const getLatest = (page = 1): Promise<MoviePage> =>
  getMoviePage("/movie/now_playing", { page });

export const getUpcoming = (page = 1): Promise<MoviePage> =>
  getMoviePage("/movie/upcoming", { page });

export const fetchMoviesByCategory = (categoryId: number, page = 1): Promise<MoviePage> =>
  getMoviePage("/discover/movie", {
    with_genres: categoryId,
    sort_by: "popularity.desc",
    page,
  });

export const getSearched = (query: string, page = 1): Promise<MoviePage> =>
  getMoviePage("/search/movie", { query, page });

export const getMovieById = async (movieId: string | undefined) => {
  try {
    const response = await tmdbClient.get<MovieType>(`/movie/${movieId}`, {
      params: localeParams,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch movie object");
  }
};

export const getMovieCredits = async (movieId: string | undefined): Promise<MovieCredits> => {
  const response = await tmdbClient.get<MovieCredits>(`/movie/${movieId}/credits`, {
    params: localeParams,
  });
  return response.data;
};

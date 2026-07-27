import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_API_KEY?.trim();
const readAccessToken = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN?.trim();

export const hasTmdbCredentials = Boolean(apiKey || readAccessToken);

export const tmdbClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: apiKey ? { api_key: apiKey } : undefined,
  headers: !apiKey && readAccessToken
    ? { Authorization: `Bearer ${readAccessToken}` }
    : undefined,
});

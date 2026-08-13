import axios from "axios";

export const tmdbClient = axios.create({
  baseURL: "/api/tmdb",
});

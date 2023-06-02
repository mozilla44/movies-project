import React from "react";
import "./MoviesList.css";
import { MovieCard } from "./MovieCard";
import { MovieType } from "../../../models/Movie";


type MoviesListProps = {
  movies: MovieType[];

};

export const MoviesList = ({ movies,}: MoviesListProps) => {
  return (
    <div className="movies-list-container">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie}  />
      ))}
    </div>
  );
};
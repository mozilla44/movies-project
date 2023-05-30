import React from "react";
import "./MovieCard.css";
import { MovieType } from "../../../models/Movie";

type MovieCardProps = {
 movie: MovieType;
};

export const MovieCard = ({movie}:MovieCardProps) => {
  // console.log("Image URL:", movie.poster_path);
  // console.log("Score:", movie.popularity);

  const imageUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;

  return (
    <div className="movie-container">
      <div className="movie-card">
        <img src={imageUrl} alt={movie.title} className="image" />
        <h3 className="title">{movie.title}</h3>
        <div className="score"> Score:{movie.popularity}</div>
        <div className="id"> ID: {movie.id}</div>
      </div>
    </div>
  );
};
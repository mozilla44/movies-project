import React from "react";
import { MovieType } from "../../../models/Movie";
import { Link } from "react-router-dom";
import "./MovieCard.css";
import { AiFillStar } from "react-icons/ai";

type MovieCardProps = {
  movie: MovieType;
  
};

export const MovieCard = ({ movie }: MovieCardProps) => {
  // console.log("Image URL:", movie.poster_path);
  // console.log("Score:", movie.popularity);
  const imageUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;

  return (
    <Link to={`/details/${movie.id}`} className="movie-container">
      <div className="movie-card">
        <img src={imageUrl} alt={movie.title} className="movie-image" />
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-score">
          <AiFillStar /> {movie.popularity}
        </p>

        {location.pathname === "/upcoming" && (
          <p className="movie-release-date">
            <b>Release Date: {movie.release_date}</b>
          </p>
        )}

        <p className="movie-id"> ID: {movie.id}</p>
      </div>
    </Link>
  );
};

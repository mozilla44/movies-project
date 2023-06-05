import { MovieType } from "../../../models/Movie";
import { Link } from "react-router-dom";
import "./MovieCard.css";
import { AiFillStar } from "react-icons/ai";
import { FiCalendar } from "react-icons/fi";

type MovieCardProps = {
  movie: MovieType;
};

export const MovieCard = ({ movie }: MovieCardProps) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : "";

  return (
    <Link to={`/details/${movie.id}`} className="movie-container">
      <div className="movie-card">
        <img src={imageUrl} alt={movie.title} className="movie-image" />

        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-score">
          <AiFillStar /> {movie.vote_average}
        </p>

        {location.pathname === "/upcoming" && (
          <p className="movie-release-date">
            <b><FiCalendar /> {movie.release_date}</b>
          </p>
        )}
      </div>
    </Link>
  );
};

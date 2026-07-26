import { MovieType } from "../../../models/Movie";
import { Link } from "react-router-dom";
import "./MovieCard.css";
import { AiFillStar } from "react-icons/ai";
import { FiCalendar } from "react-icons/fi";
import { useLocation } from "react-router-dom";

type MovieCardProps = {
  movie: MovieType;
};

export const MovieCard = ({ movie }: MovieCardProps) => {
  const location = useLocation();
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : "https://placehold.co/500x750/1b1830/f6f1ff?text=No+poster";

  return (
    <Link to={`/details/${movie.id}`} className="movie-container">
      <div className="movie-card">
        <img src={imageUrl} alt={movie.title} className="movie-image" />

        <div className="movie-card-content">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-score"><AiFillStar /> {movie.vote_average.toFixed(1)}</p>

        {location.pathname === "/upcoming" && (
          <p className="movie-release-date"><FiCalendar /> {movie.release_date}</p>
        )}
        </div>
      </div>
    </Link>
  );
};

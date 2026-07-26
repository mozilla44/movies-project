import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { FiArrowLeft, FiCalendar, FiClock, FiGlobe } from "react-icons/fi";
import "./DetailsPage.css";
import { getMovieById, getMovieCredits, MovieCredits } from "../../api/movieAPI";
import { MovieType } from "../../models/Movie";

export const DetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<null | MovieType>(null);
  const [credits, setCredits] = useState<null | MovieCredits>(null);

  useEffect(() => {
    Promise.all([getMovieById(movieId), getMovieCredits(movieId)])
      .then(([movieData, creditsData]) => {
        setMovie(movieData);
        setCredits(creditsData);
      })
      .catch(console.error);
  }, [movieId]);

  if (movie == null) return <p className="loading-state">Loading movie…</p>;

  const releaseYear = movie.release_date?.slice(0, 4) || "TBA";
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
    : "https://placehold.co/600x900/1b1830/f6f1ff?text=No+poster";
  const directors = credits?.crew.filter((person) => person.job === "Director") ?? [];
  const cast = credits?.cast.slice(0, 6) ?? [];

  return (
    <main className="details-page">
      {movie.backdrop_path && <img src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} alt="" className="details-background" />}
      <div className="details-scrim" />
      <div className="details-shell">
        <Link to="/" className="back-link"><FiArrowLeft /> Back to movies</Link>
        <div className="details-layout">
          <section className="poster-section">
            <img src={poster} alt={`${movie.title} poster`} className="poster" />
          </section>
          <section className="details-section">
            <p className="detail-kicker">NOW SHOWING <span>•</span> {releaseYear}</p>
            <h1 className="details-name">{movie.title}</h1>
            <div className="genre-list">
              {movie.genres.map((genre) => <span key={genre.id}>{genre.name}</span>)}
            </div>
            <div className="details-meta">
              <div><FiCalendar /><span>Released</span><strong>{movie.release_date || "TBA"}</strong></div>
              <div><FiClock /><span>Runtime</span><strong>{movie.runtime ? `${movie.runtime} min` : "N/A"}</strong></div>
              <div><FiGlobe /><span>Country</span><strong>{movie.production_countries[0]?.name ?? "N/A"}</strong></div>
            </div>
            <div className="rating-card">
              <div className="rating-icon"><AiFillStar /></div>
              <div><span>TMDB USER SCORE</span><strong>{movie.vote_average.toFixed(1)}<small>/10</small></strong></div>
              <div className="rating-track"><span style={{ width: `${Math.min(movie.vote_average * 10, 100)}%` }} /></div>
            </div>
            <div className="synopsis-block">
              <p className="detail-kicker">THE STORY</p>
              <h2>Synopsis</h2>
              <p className="details-synopsis">{movie.overview || "No synopsis is available for this movie yet."}</p>
            </div>
            {(directors.length > 0 || cast.length > 0) && (
              <section className="credits-block">
                {directors.length > 0 && <div className="director-line"><p className="detail-kicker">DIRECTED BY</p><strong>{directors.map((director) => director.name).join(", ")}</strong></div>}
                {cast.length > 0 && (
                  <div>
                    <p className="detail-kicker">TOP CAST</p>
                    <div className="cast-list">
                      {cast.map((person) => (
                        <div className="cast-member" key={person.id}>
                          {person.profile_path ? <img src={`https://image.tmdb.org/t/p/w185${person.profile_path}`} alt="" /> : <span className="cast-placeholder">{person.name.slice(0, 1)}</span>}
                          <div><strong>{person.name}</strong><span>{person.character || "Cast"}</span></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default DetailsPage;

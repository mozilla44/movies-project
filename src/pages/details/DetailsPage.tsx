import React, { useEffect, useState } from "react";
import "./DetailsPage.css";
import { useParams } from "react-router";
import { getMovieById } from "../../api/movieAPI";
import { MovieType } from "../../models/Movie";

// fetch les films par id dans le DetailsPage.
export const DetailsPage = () => {
  const params = useParams();
  const [movie, setMovie] = useState<null | MovieType>(null);

  const getMovie = async () => {
    const result = await getMovieById(params.movieId);
    setMovie(result);
  };

  useEffect(() => {
    getMovie();
  }, []);

  if (movie == null) return <p>No movie fetched...</p>;
  return (
    <div>
      <div className="page-container">
        <img
          src={"https://image.tmdb.org/t/p/w780" + movie.backdrop_path}
          alt="background"
          className="details-background"
        />
        <section className="poster-section">
          <img
            src={"https://image.tmdb.org/t/p/w780" + movie.poster_path}
            alt="poster"
            className="poster"
          />
        </section>


        <section className="details-section">
          <h1 className="details-name"> {movie.title}</h1>
          <div className="details-country">{movie.production_countries[0].name}{" "}</div>
          <div className="details-release">{" "}Release: {movie.release_date}{" "}</div>
          <div className="details-genres">{movie.genres.map((g) => g.name).join(", ")}</div>
          <div className="details-lenght">{movie.runtime} minutes</div>
          <div className="page-card-rating">Rating : {movie.vote_average}/10</div>
          <meter id="rating-meter" min="0" max="10" value={movie.vote_average}></meter>
          <h2 className="synopsis-title">Synopsis: </h2>
          <article className="details-synopsis">{movie.overview}</article>

        </section>
      </div>
    </div>
  );
};

export default DetailsPage;


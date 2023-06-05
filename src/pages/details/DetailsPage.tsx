import React, { useEffect, useState } from "react";
import "./DetailsPage.css";
import { useParams } from "react-router";
import { getMovieById } from "../../api/movieAPI";
import { MovieType } from "../../models/Movie";

// fetch les films par id dans le DetailsPage.
export const DetailsPage = () => {
  const params = useParams();
  const [movie, setMovie] = useState<null | MovieType>(null);
  console.log(params);

  const getMovie = async () => {
    const result = await getMovieById(params.movieId);
    setMovie(result);
  };

  useEffect(() => {
    getMovie();
  }, []);

  if (movie == null) return <p>No movie fetched...</p>;
  return (
    <div className="page-container">
      
      <img
        src={"https://image.tmdb.org/t/p/w200" + movie.poster_path}
        alt="Dune"
        className="page-card"
      />
      <section className="page-description-container">
        <img
          src={"https://image.tmdb.org/t/p/w780" + movie.backdrop_path}
          alt="background"
          className="page-card-background"
        />
        <title className="page-card-title"> {movie.title}</title>
        <div className="page-card-writer">
          {movie.production_countries[0].name}{" "}
        </div>
        <br></br>
        <section className="page-caracteristics">
          <div className="page-card-release"> Release: {movie.release_date} </div>
          <div className="page-card-genres">
            {movie.genres.map((g) => g.name).join(", ")}
          </div>
          <div className="page-card-lenght">{movie.runtime} minutes</div>
        </section>

        <div className="page-card-rating">Rating : {movie.vote_average}/10</div>
        <div className="page-synopsis-title">Synopsis</div>
        <article className="page-card-synopsis">
          {movie.overview}
        </article>
      </section>
    </div>
  );
};

export default DetailsPage;

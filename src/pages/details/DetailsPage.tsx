import React from "react";
import "./DetailsPage.css";
import { useParams } from "react-router-dom";



export const DetailsPage = () => {
  const { movieId } = useParams();
  const imgMovie ="https://imageio.forbes.com/specials-images/imageserve/61116cea2313e8bae55a536a/-Dune-/0x0.jpg?format=jpg&width=960";
  const titleMovie ="Dune";
  const directorMovie = "Writer/Director";
  const releaseMovie = "Release Date";
  const genresMovie = "Genres"; 
  const lenghtMovie = "Movie Lenght";
  const ratingMovie = "Rating";
  const plotMovie =" Hae duae provinciae bello quondam piratico catervis mixtae praedonum a Servilio pro consule missae sub iugum factae sunt vectigales. et hae quidem regiones velut in prominenti terrarum lingua positae ob orbe eoo monte Amano disparantur."
  
  return (
    <div className="movie-container">
      <img src={imgMovie} alt="Dune" className="movie-card" />
      <section className="movie-description-container">
        <title className="movie-card-title"> {titleMovie}</title>
        <div className="movie-card-writer">{directorMovie} </div>
        <br></br>
        <section className="movie-caracteristics">
          <div className="movie-card-release">{releaseMovie} </div>
          <div className="movie-card-genres">{genresMovie}</div>
          <div className="movie-card-lenght">{lenghtMovie}</div>
        </section>

        <div className="movie-card-rating">{ratingMovie}</div>
        <article className="movie-card-synopsis">
        {plotMovie}
        </article>
      </section>
    </div>
  );
};

export default DetailsPage;
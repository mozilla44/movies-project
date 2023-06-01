import React from "react";
import "./DetailsPage.css";


// fetch les films par id dans le DetailsPage.
export const DetailsPage = () => {

  const imgPage =
    "https://imageio.forbes.com/specials-images/imageserve/61116cea2313e8bae55a536a/-Dune-/0x0.jpg?format=jpg&width=960";
  const titlePage = "Dune";
  const directorPage = "Writer/Director";
  const releasePage = "Release Date";
  const genresPage = "Genres";
  const lenghtPage = "Movie Lenght";
  const ratingPage = "Rating";
  const plotPage =
    " Hae duae provinciae bello quondam piratico catervis mixtae praedonum a Servilio pro consule missae sub iugum factae sunt vectigales. et hae quidem regiones velut in prominenti terrarum lingua positae ob orbe eoo monte Amano disparantur.";

  return (
    <div className="page-container">
      <img src={imgPage} alt="Dune" className="page-card" />
      <section className="page-description-container">
        <title className="page-card-title"> {titlePage}</title>
        <div className="page-card-writer">{directorPage} </div>
        <br></br>
        <section className="page-caracteristics">
          <div className="page-card-release">{releasePage} </div>
          <div className="page-card-genres">{genresPage}</div>
          <div className="page-card-lenght">{lenghtPage}</div>
        </section>

        <div className="page-card-rating">{ratingPage}</div>
        <article className="page-card-synopsis">{plotPage}</article>
      </section>
    </div>
  );
};

export default DetailsPage;

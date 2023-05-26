import React from "react";
import "./PageDetails.css";

export const PageDetails = () => {
  return (
    <div className="movie-parent">
      <div className="movie-card"></div>
      <div className="movie-card-img">
        <img src="" alt="" className="" />
      </div>
      <div className="movie-description-container">
        <div className="movie-card-title">Movie title</div>
        <div className="movie-card-writer">Writer/Director </div>
        <br></br>
        <div className="movie-caracteristics">
          <div className="movie-card-release">Release Date </div>
          <div className="movie-card-genres">Genres</div>
          <div className="movie-card-lenght">Movie Lenght</div>
        </div>

        <div className="movie-card-rating">Rating</div>
        <div className="movie-card-synopsis">
          Hae duae provinciae bello quondam piratico catervis mixtae praedonum a
          Servilio pro consule missae sub iugum factae sunt vectigales. et hae
          quidem regiones velut in prominenti terrarum lingua positae ob orbe
          eoo monte Amano disparantur.
        </div>
      </div>
    </div>
  );
};

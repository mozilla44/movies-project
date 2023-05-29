import React from "react";
import "./MovieCard.css";

export const MovieCard = () => {
  const imgUrl =
    "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/kTh1s6I6yUyk2OGiRoGkDTYTS6K.jpg";
  const title = "Top Gun: Maverick";
  const score = 8.2;

  return (
    <div className="movie-container">
      <div className="movie-card">
        <img src={imgUrl} alt={title} className="image" />
        <h3 className="title">{title}</h3>
        <div className="score"> Score:{score}</div>
      </div>
      <div className="movie-card">
        <img src={imgUrl} alt={title} className="image" />
        <h3 className="title">{title}</h3>
        <div className="score"> Score:{score}</div>
      </div>
      <div className="movie-card">
        <img src={imgUrl} alt={title} className="image" />
        <h3 className="title">{title}</h3>
        <div className="score"> Score:{score}</div>
      </div>
      <div className="movie-card">
        <img src={imgUrl} alt={title} className="image" />
        <h3 className="title">{title}</h3>
        <div className="score"> Score: {score}</div>
      </div>
      <div className="movie-card">
        <img src={imgUrl} alt={title} className="image" />
        <h3 className="title">{title}</h3>
        <div className="score"> Score: {score}</div>
      </div>
      <div className="movie-card">
        <img src={imgUrl} alt={title} className="image" />
        <h3 className="title">{title}</h3>
        <div className="score"> Score: {score}</div>
      </div>
    </div>
  );
};
 
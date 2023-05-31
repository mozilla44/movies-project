import React, { useState, useEffect } from "react";
import { MovieCard } from "./pages/homepage/components/MovieCard";
import "./App.css";
import { DetailsPage } from "./pages/details/DetailsPage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { getAll } from "./api/movieAPI";
import { getCategories } from "./api/categoryAPI";
import { MoviesList } from "./pages/homepage/components/MoviesList";
import { MovieType } from "./models/Movie";
import { Category } from "./models/Categories";
import { CategoriesList } from "./pages/homepage/components/CategoriesList";


const App = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    // Define an asynchronous function called getMovies
    const getMovies = async () => {
      try {
        // Call the getAll function to fetch the movies
        const moviesData = await getAll();

        // Update the movies state with the retrieved data
        setMovies(moviesData);
      } catch (error) {
        // Log any errors that occur during the fetching or updating process
        console.log(error);
      }
    };

    // Call the getMovies function when the component mounts
    // The empty dependency array [] ensures that the effect runs only once
    getMovies();
  }, []);

 

  return (
    <div>
      
      <Header />
      
      <MoviesList movies={movies} />
      
      <Footer />
      {/* <DetailsPage /> */}
    </div>
  );
};

export default App;
import React from "react";
import HomePage from "./pages/homepage/HomePage";
import DetailsPage from "./pages/details/DetailsPage";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const App = () => {


  return (
    <div>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/details/:movieId" element={<DetailsPage />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
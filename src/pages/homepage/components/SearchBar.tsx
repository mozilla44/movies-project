import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Redirect to search results page
      navigate(`/search?q=${searchTerm}`);
    }
  };

  return (
    <div className="searchbar">
      <form className="search_form" onSubmit={handleSearch}>
        <input
          type="search"
          required
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="fa fa-search"></i>
        <a id="clear-btn"></a>
      </form>
    </div>
  );
};

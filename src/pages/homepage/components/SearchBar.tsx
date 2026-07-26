import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";

type SearchBarProps = {
  whenSearched: (query: string) => void;
};

export const SearchBar = ({ whenSearched }: SearchBarProps) => {
  return (
    <div className="searchbar">
      <form className="search-form" onSubmit={(event) => event.preventDefault()}>
        <FiSearch aria-hidden="true" />
        <input
          type="search"
          onChange={(e) => whenSearched(e.target.value)}
          placeholder="Search movies, actors, stories..."
          aria-label="Search movies"
        />
      </form>
    </div>
  );
};

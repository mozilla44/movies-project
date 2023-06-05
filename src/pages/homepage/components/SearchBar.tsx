import "./SearchBar.css";

type SearchBarProps = {
  whenSearched: (query: string) => void;
};

export const SearchBar = ({ whenSearched }: SearchBarProps) => {
  return (
    <div className="searchbar">
      <form className="search-form">
        <input
          type="search"
          required
          onChange={(e) => whenSearched(e.target.value)}
          placeholder="Search..."
        />
      </form>
    </div>
  );
};

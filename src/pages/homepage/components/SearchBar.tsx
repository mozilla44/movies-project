import "./SearchBar.css";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export const SearchBar = ({onSearch}: SearchBarProps) => {

  return (
    <div className="searchbar">
      <form className="search-form">
        <input
          type="search"
          required
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search..."
        />
      </form>
    </div>
  );
};

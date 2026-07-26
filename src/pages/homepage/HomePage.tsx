import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { FiSliders } from "react-icons/fi";
import { fetchMoviesByCategory, getLatest, getSearched, getTrending, getUpcoming } from "../../api/movieAPI";
import { MovieType } from "../../models/Movie";
import { Category } from "../../models/Categories";
import { getCategories } from "../../api/categoryAPI";
import { MoviesList } from "./components/MoviesList";
import { SearchBar } from "./components/SearchBar";
import { CategoryBtn } from "./components/CategoryBtn";
import "./HomePage.css";

const HomePage = () => {
  const location = useLocation();
  const isUpcoming = location.pathname === "/upcoming";
  const isTrending = location.pathname === "/trending";
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    setPage(1);
    setCategoryId(null);
    setSearchQuery("");
  }, [location.pathname]);

  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      isFetchingRef.current = true;
      setLoading(true);
      setError("");
      if (page === 1) setMovies([]);

      try {
        const data = searchQuery.trim()
          ? await getSearched(searchQuery.trim(), page)
          : categoryId !== null
            ? await fetchMoviesByCategory(categoryId, page)
            : isUpcoming
              ? await getUpcoming(page)
              : isTrending
                ? await getTrending(page)
                : await getLatest(page);

        if (!cancelled) {
          setMovies((currentMovies) => page === 1 ? data.results : [...currentMovies, ...data.results]);
          setHasMore(page < Math.min(data.total_pages, 500));
        }
      } catch (requestError) {
        console.error(requestError);
        if (!cancelled) {
          setMovies([]);
          setHasMore(false);
          setError(import.meta.env.VITE_API_KEY || import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN
            ? "We couldn’t load movies right now. Please try again shortly."
            : "Movie data needs a TMDB API key. Add one to .env, then restart the app.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          isFetchingRef.current = false;
        }
      }
    }, searchQuery ? 350 : 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [categoryId, isTrending, isUpcoming, page, searchQuery]);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || loading || !hasMore || error) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isFetchingRef.current) {
        isFetchingRef.current = true;
        setPage((currentPage) => currentPage + 1);
      }
    }, { rootMargin: "280px" });

    observer.observe(target);
    return () => observer.disconnect();
  }, [error, hasMore, loading]);

  const chooseCategory = (id: number | null) => {
    setCategoryId(id);
    setSearchQuery("");
    setPage(1);
    setHasMore(true);
    setFiltersOpen(false);
  };

  const updateSearch = (query: string) => {
    setSearchQuery(query);
    setCategoryId(null);
    setPage(1);
    setHasMore(true);
  };

  const heading = searchQuery.trim()
    ? `Results for “${searchQuery.trim()}”`
    : categoryId !== null
      ? categories.find((category) => category.id === categoryId)?.name ?? "Movies"
      : isUpcoming ? "Coming soon" : isTrending ? "Trending now" : "Latest movies";

  return (
    <main className="homepage-container">
      <section className="hero">
        <div className="hero-copy">
          <h1>Find something to watch.</h1>
          <p>Browse current releases, popular titles, and upcoming movies in one place.</p>
        </div>
        {!isUpcoming && <SearchBar whenSearched={updateSearch} />}
      </section>

      {!isUpcoming && (
        <section className="filters" aria-label="Movie categories">
          <button className="filters-toggle" onClick={() => setFiltersOpen((open) => !open)} aria-expanded={filtersOpen}>
            <FiSliders /> Browse genres
          </button>
          <div className={`category_btn_area ${filtersOpen ? "is-open" : ""}`}>
            <button className={`category_btn ${categoryId === null ? "selected" : ""}`} onClick={() => chooseCategory(null)} aria-pressed={categoryId === null}>All movies</button>
            {categories.map((category) => <CategoryBtn key={category.id} category={category} setCategoryId={() => chooseCategory(category.id)} active={categoryId === category.id} />)}
          </div>
        </section>
      )}

      <section className="catalogue">
        <div className="catalogue-heading">
          <div><p className="eyebrow">DISCOVER</p><h2>{heading}</h2></div>
          <p className="page-count">{movies.length} movies shown</p>
        </div>
        {loading && page === 1 ? <div className="loading-state" role="status">Loading the good stuff…</div> : error ? <p className="empty-state">{error}</p> : <MoviesList movies={movies} />}
        {!loading && !error && movies.length === 0 && <p className="empty-state">No movies matched this search. Try another title or genre.</p>}
        {!error && movies.length > 0 && <div className="scroll-sentinel" ref={loadMoreRef}>{loading ? "Loading more movies…" : hasMore ? "Keep scrolling for more" : "You’ve reached the end"}</div>}
      </section>
    </main>
  );
};

export default HomePage;

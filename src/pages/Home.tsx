import React from "react";
import { useMovieSearch } from "../hooks/useMovieSearch";
import { useTheme } from "../hooks/useTheme";
import ThemeToggle from "../components/shared/ThemeToggle";
import SearchBox from "../components/shared/SearchBox";
import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";

const Home: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();
  const {
    isInitialLoading,
    isFetchingMore,
    hasSearched,
    handleSearch,
    fetchMoreMovies,
    fetchDetails,
    hasMore,
  } = useMovieSearch();

  return (
    <div className="app-container">
      <ThemeToggle darkMode={darkMode} onToggle={toggleTheme} />
      <h1 className="app-title">Search Movies</h1>
      <SearchBox onSearch={handleSearch} />
      <MovieList
        isLoading={isInitialLoading}
        isFetchingMore={isFetchingMore}
        fetchDetails={fetchDetails}
        fetchMoreMovies={fetchMoreMovies}
        hasSearched={hasSearched}
        hasMore={hasMore}
      />
      <MovieModal />
    </div>
  );
};

export default Home;

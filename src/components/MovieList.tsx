import React, { useState, useEffect, useRef } from "react";
import { MovieDetail } from "../types";
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import LoadingSkeleton from "./shared/LoadingSkeleton";
import NoResults from "./shared/NoResults";
import MovieCard from "./MovieCard";

interface Props {
  fetchDetails: (id: string) => void;
  fetchMoreMovies: () => void;
  hasMore?: boolean;
  isLoading?: boolean;         // for initial loading
  isFetchingMore?: boolean;    // for infinite scroll
  hasSearched?: boolean;
}

const MovieList: React.FC<Props> = ({
  fetchDetails,
  fetchMoreMovies,
  hasMore = false,
  isLoading = false,
  isFetchingMore = false,
  hasSearched = false,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, movieDetailsCache } = useSelector((state: RootState) => state.movies);
  const [loadingDetails, setLoadingDetails] = useState<Record<string, boolean>>({});
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleHover = async (movieId: string) => {
    if (!movieDetailsCache[movieId] && !loadingDetails[movieId]) {
      setLoadingDetails((prev) => ({ ...prev, [movieId]: true }));
      try {
        await fetchDetails(movieId);
      } catch (error) {
        console.error(`Error fetching details for movie ${movieId}:`, error);
      } finally {
        setLoadingDetails((prev) => ({ ...prev, [movieId]: false }));
      }
    }
  };

  const handleReadMore = (movie: MovieDetail) => {
    dispatch({ type: "movies/setSelectedMovie", payload: movie });
  };

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (!hasMore || isFetchingMore || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchMoreMovies();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasMore, isFetchingMore, fetchMoreMovies]);

  if (isLoading) return <LoadingSkeleton />;

  if (hasSearched && movies.length === 0) return <NoResults />;

  if (!hasSearched) return null;

  return (
    <div className="movie-list" aria-live="polite">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          aria-labelledby={`movie-title-${movie.imdbID}`}
          className="movie-card"
        >
          <MovieCard
            movie={movie}
            detail={movieDetailsCache[movie.imdbID]}
            isLoading={loadingDetails[movie.imdbID]}
            onHover={() => handleHover(movie.imdbID)}
            onReadMore={handleReadMore}
          />
        </div>
      ))}

      {/* Skeletons during infinite scroll loading */}
      {isFetchingMore &&
        Array(4)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              role="status"
              aria-live="polite"
              className="movie-card skeleton-card"
            >
              <LoadingSkeleton />
            </div>
          ))}

      {/* Invisible trigger element for infinite scroll */}
      {hasMore && (
        <div
          ref={loadMoreRef}
          className="load-more-container"
          aria-label="Loading more movies"
        />
      )}
    </div>
  );
};

export default MovieList;

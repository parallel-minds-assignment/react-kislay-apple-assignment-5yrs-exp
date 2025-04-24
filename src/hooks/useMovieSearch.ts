import { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { store } from '../store';
import { container } from '../services/ioc';
import { TYPES } from '../types/index';
import { ApiService } from '../services/api';

export const useMovieSearch = () => {
  const apiService = container.get<ApiService>(TYPES.ApiService);

  const [query, setQuery] = useState('');
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const debouncedSearch = useCallback(
    debounce(async (q: string) => {
      if (!q.trim()) {
        store.dispatch({ type: 'movies/clearMovies' });
        setHasSearched(false);
        setPage(1);
        setTotalResults(0);
        return;
      }

      setIsInitialLoading(true);
      setHasSearched(true);
      setQuery(q);
      try {
        const { movies, totalResults } = await apiService.searchMovies(q, 1);
        store.dispatch({ type: 'movies/setMovies', payload: movies });
        setPage(2);
        setTotalResults(totalResults);
      } catch (error) {
        console.error('Search error:', error);
        store.dispatch({ type: 'movies/setMovies', payload: [] });
        setTotalResults(0);
      } finally {
        setIsInitialLoading(false);
      }
    }, 500),
    [apiService]
  );

  const handleSearch = (q: string) => {
    debouncedSearch(q);
  };

  const fetchMoreMovies = async () => {
    if (isFetchingMore || (page - 1) * 10 >= totalResults) return;

    setIsFetchingMore(true);
    try {
      const { movies } = await apiService.searchMovies(query, page);
      store.dispatch({ type: 'movies/addMovies', payload: movies });
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error fetching more movies:', error);
    } finally {
      setIsFetchingMore(false);
    }
  };

  const fetchDetails = async (id: string) => {
    const state = store.getState();
    if (state.movies.movieDetailsCache[id]) return;

    try {
      const details = await apiService.getMovieDetails(id);
      store.dispatch({ type: 'movies/setMovieDetails', payload: { id, details } });
    } catch (error) {
      console.error(`Error fetching details for movie ${id}:`, error);
    }
  };

  const hasMore = (page - 1) * 10 < totalResults;

  return {
    isInitialLoading,
    isFetchingMore,
    hasSearched,
    handleSearch,
    fetchMoreMovies,
    fetchDetails,
    hasMore,
  };
};

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieSummary, MovieDetail } from '../types';

interface MovieState {
  movies: MovieSummary[];
  movieDetailsCache: Record<string, MovieDetail>;
  selectedMovie: MovieDetail | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  movieDetailsCache: {},
  selectedMovie: null,
  isLoading: false,
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<MovieSummary[]>) => {
      state.movies = action.payload; // Replace the movie list with new results
    },
    addMovies: (state, action: PayloadAction<MovieSummary[]>) => {
      state.movies = [...state.movies, ...action.payload]; // Append new results to the existing list
    },
    setMovieDetails: (state, action: PayloadAction<{ id: string; details: MovieDetail }>) => {
      state.movieDetailsCache[action.payload.id] = action.payload.details; // Cache movie details
    },
    setSelectedMovie: (state, action: PayloadAction<MovieDetail | null>) => {
      state.selectedMovie = action.payload; // Set the selected movie
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload; // Set the loading state
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload; // Set the error state
    },
    clearMovies: (state) => {
      state.movies = []; // Clear the movie list
    },
  },
});

export const {
  setMovies,
  addMovies,
  setMovieDetails,
  setSelectedMovie,
  setLoading,
  setError,
  clearMovies,
} = movieSlice.actions;

export default movieSlice.reducer;
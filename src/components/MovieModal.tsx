import React from "react";
// import { useAppSelector, useAppDispatch } from "../hooks";
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import Modal from "./shared/Modal/Modal";
import { convertMinutesToHours } from "../helper/helper";
import { useTheme } from "../hooks/useTheme"; // Custom hook for theme

const MovieModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedMovie = useSelector((state: RootState) => state.movies.selectedMovie);
  const { darkMode } = useTheme(); // Get dark mode state

  const handleClose = () => {
    dispatch({ type: "movies/setSelectedMovie", payload: null });
  };

  if (!selectedMovie) return null;

  return (
    <Modal
      isOpen={!!selectedMovie}
      onClose={handleClose}
      title={selectedMovie.Title}
      className={`movie-modal ${darkMode ? "dark-mode" : ""}`} // Apply dark mode class
    >
      <div className="movie-details">
        <div className="movie-poster-card">
          <img
            src={selectedMovie.Poster}
            alt={`${selectedMovie.Title} Poster`}
          />
        </div>
        <div className="movie-info">
          <p>
            <strong>Genre:</strong> {selectedMovie.Genre}
          </p>
          <p>
            <strong>Director:</strong> {selectedMovie.Director}
          </p>
          <p>
            <strong>Actors:</strong> {selectedMovie.Actors}
          </p>
          <p>
            <strong>Plot:</strong> {selectedMovie.Plot.slice(0, 900)}...
          </p>
          <p>
            <strong>Runtime:</strong>{" "}
            {convertMinutesToHours(parseInt(selectedMovie.Runtime))}
          </p>
          <p>
            <strong>Rating:</strong>{" "}
            {selectedMovie.Ratings[0]?.Source}: {selectedMovie.Ratings[0]?.Value}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default MovieModal;
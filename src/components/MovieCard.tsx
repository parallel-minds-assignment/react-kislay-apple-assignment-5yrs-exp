import React from "react";
import { MovieDetail } from "../types";
import Card from "../components/shared/Card/Card";
import SkeletonCard from "../components/shared/Skeleton/SkeletonCard";
import demoImage from "../assets/dummy.svg";

interface MovieCardProps {
  movie: { imdbID: string; Title: string; Poster: string };
  detail?: MovieDetail;
  isLoading?: boolean;
  onHover: () => void;
  onReadMore: (movie: MovieDetail) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  detail,
  isLoading,
  onHover,
  onReadMore,
}) => {
  const front = (
    <div className="movie-card-front">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : demoImage}
        alt={`Poster for ${movie.Title}`}
        className="movie-poster"
        aria-hidden="true"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = demoImage;
        }}
      />
    </div>

  );

  const back = isLoading ? (
    <SkeletonCard />
  ) : detail ? (
    <div className="card-back-content">
      <h3 
        id={`movie-title-${movie.imdbID}`} 
        tabIndex={0}
        className="card-back-title"
      >
        {movie.Title}
      </h3>
      <p style={{ color: 'var(--text-secondary)' }}>{detail.Plot?.slice(0, 80)}...</p>
      <button
        className="read-more-btn"
        onClick={(e) => {
          e.stopPropagation();
          onReadMore(detail);
        }}
        aria-label={`Read more about ${movie.Title}`}
      >
        Read More
      </button>
    </div>
  ) : (
    <p style={{ color: 'var(--text-secondary)' }}>Hover to load details</p>
  );

  return (
    <Card
      frontContent={front}
      backContent={back}
      onHover={onHover}
      className="movie-card"
      isFlippable
      flipOnHover
      aria-labelledby={`movie-title-${movie.imdbID}`}  // Link the card's title to this region
    />
  );
};

export default MovieCard;

import React from "react";
import SkeletonCard from "../shared/Skeleton/SkeletonCard";

const LoadingSkeleton: React.FC = () => (
  <div className="movie-list">
    {Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />)}
  </div>
);

export default LoadingSkeleton;

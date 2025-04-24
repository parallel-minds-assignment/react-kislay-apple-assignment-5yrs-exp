import React from "react";
import "./Skeleton.css";

const SkeletonCard: React.FC = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-poster" />
      <div className="skeleton-content">
        <div className="skeleton-title" />
        <div className="skeleton-text" />
        <div className="skeleton-text" />
        <div className="skeleton-button" />
      </div>
    </div>
  );
};

export default SkeletonCard; 
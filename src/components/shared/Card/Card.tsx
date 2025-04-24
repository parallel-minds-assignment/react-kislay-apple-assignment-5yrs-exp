import React, { useState } from "react";
import "./Card.css";

interface CardProps {
  frontContent: React.ReactNode;
  backContent?: React.ReactNode;
  onHover?: () => void;
  onClick?: () => void;
  className?: string;
  isFlippable?: boolean;
  flipOnHover?: boolean;
}

const Card: React.FC<CardProps> = ({
  frontContent,
  backContent,
  onHover,
  onClick,
  className = "",
  isFlippable = false,
  flipOnHover = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleClick = () => {
    if (isFlippable) {
      setIsFlipped(!isFlipped);
    }
    onClick?.();
  };
  
  const handleHover = () => {
    if (flipOnHover) {
      onHover?.();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();  // Prevent scrolling when pressing space
      handleClick();
    }
  };

  return (
    <div
      className={`card ${isFlippable ? "flip-card" : ""} ${className} ${isFlipped ? "flipped" : ""}`}
      onMouseEnter={handleHover}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Movie Card"
    >
      {isFlippable ? (
        <FlippableCard frontContent={frontContent} backContent={backContent} />
      ) : (
        <div className="card-content">{frontContent}</div>
      )}
    </div>
  );
};

const FlippableCard: React.FC<{
  frontContent: React.ReactNode;
  backContent?: React.ReactNode;
}> = ({ frontContent, backContent }) => (
  <div className="flip-card-inner">
    <div className="flip-card-front">{frontContent}</div>
    {backContent && <div className="flip-card-back">{backContent}</div>}
  </div>
);

export default Card;
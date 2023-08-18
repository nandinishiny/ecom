import React, { useState } from 'react';


const RatingStars = ({ rating, onChange }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarHover = (starIndex) => {
    setHoveredRating(starIndex);
  };

  const handleStarClick = (starIndex) => {
    if (onChange) {
      onChange(starIndex + 1); // Adding 1 to make it 1-based rating
    }
  };

  const stars = Array.from({ length: 5 }, (_, index) => {
    const starIndex = index;
    const isFilled = starIndex < rating || starIndex < hoveredRating;

    return (
      <span
        key={index}
        className={`star ${isFilled ? 'filled' : ''}`}
        onMouseEnter={() => handleStarHover(starIndex + 1)}
        onMouseLeave={() => setHoveredRating(0)}
        onClick={() => handleStarClick(starIndex)}
      >
        &#9733;
      </span>
    );
  });

  return <div className="rating-stars">{stars}</div>;
};

export default RatingStars;

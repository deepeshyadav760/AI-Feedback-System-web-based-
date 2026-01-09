import React from 'react';

const StarRating = ({ rating, onRatingChange, disabled = false }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="star-rating">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          className={`star ${star <= rating ? 'filled' : ''} ${disabled ? 'disabled' : ''}`}
          onClick={() => !disabled && onRatingChange(star)}
          disabled={disabled}
          aria-label={`Rate ${star} stars`}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill={star <= rating ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
    </div>
  );
};

export default StarRating;
import React from 'react';

const FilterBar = ({ selectedRating, onRatingChange, onRefresh, isLoading }) => {
  const ratings = [
    { value: '', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="rating-filter" className="filter-label">
          Filter by Rating
        </label>
        <select
          id="rating-filter"
          className="filter-select"
          value={selectedRating}
          onChange={(e) => onRatingChange(e.target.value)}
          disabled={isLoading}
        >
          {ratings.map((rating) => (
            <option key={rating.value} value={rating.value}>
              {rating.label}
            </option>
          ))}
        </select>
      </div>

      <button 
        className="refresh-btn"
        onClick={onRefresh}
        disabled={isLoading}
        title="Refresh reviews"
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
          className={isLoading ? 'spinning' : ''}
        >
          <path 
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        Refresh
      </button>
    </div>
  );
};

export default FilterBar;
import React, { useState } from 'react';

const ReviewCard = ({ review }) => {
  const [expanded, setExpanded] = useState(false);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  const getRatingClass = (rating) => {
    if (rating >= 4) return 'rating-good';
    if (rating === 3) return 'rating-neutral';
    return 'rating-poor';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <div className={`review-card ${getRatingClass(review.rating)}`}>
      <div className="review-header">
        <div className="review-rating">
          <div className="stars">{renderStars(review.rating)}</div>
          <span className="rating-number">{review.rating}/5</span>
        </div>
        <div className="review-date">{formatDate(review.createdAt)}</div>
      </div>

      <div className="review-content">
        <div className="review-section">
          <h4 className="section-heading">Customer Review</h4>
          <p className="review-text">{review.reviewText}</p>
        </div>

        <div className="review-section">
          <h4 className="section-heading">AI Summary</h4>
          <p className="summary-text">{review.aiSummary}</p>
        </div>

        <div className="review-section">
          <button 
            className="expand-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Hide' : 'Show'} Recommended Actions
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              className={expanded ? 'rotated' : ''}
            >
              <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {expanded && (
            <div className="actions-list">
              {review.recommendedActions && review.recommendedActions.length > 0 ? (
                <ul>
                  {review.recommendedActions.map((action, index) => (
                    <li key={index}>{action}</li>
                  ))}
                </ul>
              ) : (
                <p className="no-actions">No actions recommended</p>
              )}
            </div>
          )}
        </div>
      </div>

      {review.metadata && (
        <div className="review-footer">
          <span className="metadata">
            Processed in {review.metadata.processingTime}ms
          </span>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
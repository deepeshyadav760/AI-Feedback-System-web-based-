import React from 'react';

const Analytics = ({ analytics }) => {
  if (!analytics) return null;

  const { totalReviews, averageRating, recentReviews, ratingDistribution } = analytics;

  const getStarWidth = (count) => {
    if (totalReviews === 0) return 0;
    return (count / totalReviews) * 100;
  };

  return (
    <div className="analytics-section">
      <h2 className="section-title">Overview</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{totalReviews}</div>
            <div className="stat-label">Total Reviews</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon yellow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{averageRating.toFixed(1)}</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{recentReviews}</div>
            <div className="stat-label">Last 24 Hours</div>
          </div>
        </div>
      </div>

      <div className="rating-distribution">
        <h3 className="subsection-title">Rating Distribution</h3>
        <div className="distribution-bars">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="distribution-row">
              <div className="distribution-label">
                {star} <span className="star-icon">★</span>
              </div>
              <div className="distribution-bar-container">
                <div 
                  className="distribution-bar"
                  style={{ width: `${getStarWidth(ratingDistribution[star])}%` }}
                />
              </div>
              <div className="distribution-count">
                {ratingDistribution[star]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
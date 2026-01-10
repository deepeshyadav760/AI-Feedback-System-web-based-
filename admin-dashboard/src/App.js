import React, { useState, useEffect, useCallback } from 'react';
import ReviewCard from './components/ReviewCard';
import FilterBar from './components/FilterBar';
import Analytics from './components/Analytics';
import { getReviews, getAnalytics } from './services/api';
import './styles/main.css';

function App() {
  const [reviews, setReviews] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [selectedRating, setSelectedRating] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const filters = {};
      if (selectedRating) {
        filters.rating = selectedRating;
      }

      const [reviewsData, analyticsData] = await Promise.all([
        getReviews(filters),
        getAnalytics()
      ]);

      if (reviewsData.success) {
        setReviews(reviewsData.data.reviews);
      }

      if (analyticsData.success) {
        setAnalytics(analyticsData.data);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedRating]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchData]);

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div className="app">
      <header className="admin-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="8" fill="white" fillOpacity="0.1" />
                <path d="M20 10L25 18H15L20 10Z" fill="white" />
                <path d="M20 30L15 22H25L20 30Z" fill="white" />
              </svg>
              <div>
                <h1>Fynd Admin</h1>
                <p className="subtitle">Feedback Management Dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          {error && (
            <div className="error-banner">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
                <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              {error}
              <button onClick={() => setError(null)}>×</button>
            </div>
          )}

          {analytics && <Analytics analytics={analytics} />}

          <div className="reviews-section">
            <div className="section-header">
              <h2 className="section-title">Reviews</h2>
              <FilterBar
                selectedRating={selectedRating}
                onRatingChange={setSelectedRating}
                onRefresh={handleRefresh}
                isLoading={isLoading}
              />
            </div>

            {isLoading && reviews.length === 0 ? (
              <div className="loading-state">
                <div className="spinner-large"></div>
                <p>Loading reviews...</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3>No reviews yet</h3>
                <p>Reviews will appear here once customers start submitting feedback.</p>
              </div>
            ) : (
              <div className="reviews-grid">
                {reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="admin-footer">
        <p>© 2026 Deepesh Yadav. All rights reserved.</p>
        {!isLoading && reviews.length > 0 && (
          <p className="update-time">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        )}
      </footer>
    </div>
  );
}

export default App;

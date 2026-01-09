import React, { useState } from 'react';
import StarRating from './StarRating';
import { submitReview } from '../services/api';

const ReviewForm = ({ onSuccess, onError }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (rating === 0) {
      onError('Please select a star rating');
      return;
    }

    if (reviewText.trim().length === 0) {
      onError('Please write a review');
      return;
    }

    if (reviewText.length > 5000) {
      onError('Review must be less than 5000 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitReview(rating, reviewText);
      
      if (result.success) {
        onSuccess(result.data.aiResponse, rating);
        // Reset form
        setRating(0);
        setReviewText('');
      } else {
        onError(result.error || 'Failed to submit review');
      }
    } catch (error) {
      onError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingLabel = (rating) => {
    const labels = {
      0: 'Select your rating',
      1: 'Poor',
      2: 'Fair',
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent'
    };
    return labels[rating];
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <div className="form-group">
        <label className="form-label">
          How would you rate your experience?
        </label>
        <StarRating 
          rating={rating} 
          onRatingChange={setRating}
          disabled={isSubmitting}
        />
        <p className="rating-label">{getRatingLabel(rating)}</p>
      </div>

      <div className="form-group">
        <label htmlFor="reviewText" className="form-label">
          Tell us about your experience
        </label>
        <textarea
          id="reviewText"
          className="form-textarea"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your thoughts... What did you like? What could be improved?"
          rows="6"
          maxLength="5000"
          disabled={isSubmitting}
          required
        />
        <div className="char-count">
          {reviewText.length} / 5000 characters
        </div>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary btn-large"
        disabled={isSubmitting || rating === 0}
      >
        {isSubmitting ? (
          <>
            <span className="spinner"></span>
            Submitting...
          </>
        ) : (
          'Submit Review'
        )}
      </button>
    </form>
  );
};

export default ReviewForm;
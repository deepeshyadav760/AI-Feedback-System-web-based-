import axios from 'axios';

// The URL where your backend is running
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000 // 30 seconds
});

/**
 * Fetch all reviews with optional filters
 * @param {Object} filters - Filter criteria (rating, page, limit, etc.)
 */
export const getReviews = async (filters = {}) => {
  try {
    const response = await api.get('/reviews', {
      params: filters
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || 
      'Failed to fetch reviews. Please check if the backend is running.'
    );
  }
};

/**
 * Fetch analytics data for the dashboard overview
 */
export const getAnalytics = async () => {
  try {
    const response = await api.get('/reviews/analytics');
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || 
      'Failed to fetch analytics data.'
    );
  }
};

/**
 * Fetch a single review by ID
 * @param {string} id - The MongoDB ID of the review
 */
export const getReviewById = async (id) => {
  try {
    const response = await api.get(`/reviews/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || 
      'Failed to fetch review details.'
    );
  }
};

export default api;
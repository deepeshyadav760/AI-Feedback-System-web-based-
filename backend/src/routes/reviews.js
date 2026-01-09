const express = require('express');
const Review = require('../models/Review');
const { processReview } = require('../services/llmService');

const router = express.Router();

/**
 * POST /api/reviews
 * Create a new review with AI processing
 */
router.post('/', async (req, res, next) => {
  try {
    const { rating, reviewText } = req.body;

    // Validate request body
    if (!rating || !reviewText) {
      return res.status(400).json({
        success: false,
        error: 'Rating and review text are required'
      });
    }

    // Validate rating range
    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return res.status(400).json({
        success: false,
        error: 'Rating must be an integer between 1 and 5'
      });
    }

    // Validate review text length
    const trimmedReview = reviewText.trim();
    if (trimmedReview.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Review text cannot be empty'
      });
    }

    if (trimmedReview.length > 5000) {
      return res.status(400).json({
        success: false,
        error: 'Review text must be less than 5000 characters'
      });
    }

    // Process review with AI
    const aiData = await processReview(rating, trimmedReview);

    // Create and save review
    const review = new Review({
      rating,
      reviewText: trimmedReview,
      aiResponse: aiData.aiResponse,
      aiSummary: aiData.aiSummary,
      recommendedActions: aiData.recommendedActions,
      metadata: aiData.metadata
    });

    await review.save();

    // Return response with AI-generated content
    res.status(201).json({
      success: true,
      data: {
        id: review._id,
        rating: review.rating,
        reviewText: review.reviewText,
        aiResponse: review.aiResponse,
        createdAt: review.createdAt
      }
    });

  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/reviews
 * Get all reviews with optional filtering and pagination
 */
router.get('/', async (req, res, next) => {
  try {
    const { rating, page = 1, limit = 50, sortBy = 'createdAt', order = 'desc' } = req.query;

    // Build query
    const query = {};
    if (rating) {
      const ratingNum = parseInt(rating);
      if (ratingNum >= 1 && ratingNum <= 5) {
        query.rating = ratingNum;
      }
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOrder = order === 'asc' ? 1 : -1;

    // Execute query
    const [reviews, total] = await Promise.all([
      Review.find(query)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Review.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: {
        reviews,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });

  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/reviews/analytics
 * Get analytics data for admin dashboard
 */
router.get('/analytics', async (req, res, next) => {
  try {
    // Get rating distribution
    const ratingDistribution = await Review.aggregate([
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Get total count
    const totalReviews = await Review.countDocuments();

    // Get average rating
    const avgRatingResult = await Review.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' }
        }
      }
    ]);

    const avgRating = avgRatingResult[0]?.avgRating || 0;

    // Get recent reviews count (last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentCount = await Review.countDocuments({
      createdAt: { $gte: oneDayAgo }
    });

    // Format rating distribution
    const distributionMap = {};
    for (let i = 1; i <= 5; i++) {
      distributionMap[i] = 0;
    }
    ratingDistribution.forEach(item => {
      distributionMap[item._id] = item.count;
    });

    res.json({
      success: true,
      data: {
        totalReviews,
        averageRating: Math.round(avgRating * 10) / 10,
        recentReviews: recentCount,
        ratingDistribution: distributionMap
      }
    });

  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/reviews/:id
 * Get a single review by ID
 */
router.get('/:id', async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }

    res.json({
      success: true,
      data: review
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
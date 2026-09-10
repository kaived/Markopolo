import { ApiError, StatusCodes } from '../../../shared/errors/ApiError.js';
import * as ratingRepository from '../data/rating.repository.js';
import * as reviewRepository from '../data/review.repository.js';

// Rate a review
export const rateReview = async (userId, reviewId, rating) => {
  // 1. Check if review exists
  const review = await reviewRepository.findReviewById(reviewId);
  if (!review) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Review not found');
  }

  // 2. Prevent rating own review
  if (review.author_id === userId) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'You cannot rate your own review');
  }

  // 3. Validate rating (1-5) - (Already validated by Zod, but good to have)
  if (rating < 1 || rating > 5) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Rating must be between 1 and 5');
  }

  // 4. Save rating
  return await ratingRepository.upsertRating(userId, reviewId, rating);
};

// Remove rating
export const removeRating = async (userId, reviewId) => {
  // 1. Check if rating exists (Optional, delete throws error if not found? No, Prisma delete throws if not found)
  // Let's check first to provide better error message or handle gracefully
  const existingRating = await ratingRepository.getRating(userId, reviewId);
  if (!existingRating) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Rating not found');
  }

  return await ratingRepository.deleteRating(userId, reviewId);
};

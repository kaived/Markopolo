import { ApiError, StatusCodes } from '../../../shared/errors/ApiError.js';
import * as reviewRepository from '../data/review.repository.js';

// Disable Review (Admin & Sub-Admin)
export const disableReview = async (reviewId) => {
  const review = await reviewRepository.findReviewById(reviewId);
  if (!review) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Review not found');
  }
  
  return await reviewRepository.updateReviewStatus(reviewId, { is_disabled: true });
};

// Hide Review (Admin Only)
export const hideReview = async (reviewId) => {
  const review = await reviewRepository.findReviewById(reviewId);
  if (!review) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Review not found');
  }
  
  return await reviewRepository.updateReviewStatus(reviewId, { is_hidden: true });
};

// Delete Review (Admin Only)
export const deleteReview = async (reviewId) => {
  const review = await reviewRepository.findReviewById(reviewId);
  if (!review) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Review not found');
  }
  
  await reviewRepository.deleteReview(reviewId);
  return { message: 'Review deleted successfully' };
};

// --- User Review Functions ---

// Create User Review
export const createUserReview = async (userId, data) => {
  const reviewData = {
    ...data,
    author_id: userId,
  };
  return await reviewRepository.createReview(reviewData);
};

// Update User Review (Ownership Check)
export const updateUserReview = async (userId, reviewId, data) => {
  const review = await reviewRepository.findReviewById(reviewId);
  if (!review) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Review not found');
  }
  
  if (review.author_id !== userId) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'You can only update your own reviews');
  }

  if (review.is_disabled || review.is_hidden) {
      throw new ApiError(StatusCodes.FORBIDDEN, 'Cannot edit a disabled or hidden review');
  }
  
  return await reviewRepository.updateReview(reviewId, data);
};

// Delete User Review (Ownership Check)
export const deleteUserReview = async (userId, reviewId) => {
  const review = await reviewRepository.findReviewById(reviewId);
  if (!review) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Review not found');
  }
  
  if (review.author_id !== userId) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'You can only delete your own reviews');
  }
  
  await reviewRepository.deleteReview(reviewId);
  return { message: 'Review deleted successfully' };
};

// Get Public Reviews
export const getPublicReviews = async (query) => {
  const { page = 1, limit = 10, ...filters } = query;
  const skip = (page - 1) * limit;
  const take = parseInt(limit);
  
  return await reviewRepository.findAllReviews({ skip, take, ...filters });
};

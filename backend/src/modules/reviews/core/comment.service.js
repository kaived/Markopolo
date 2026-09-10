import { ApiError, StatusCodes } from '../../../shared/errors/ApiError.js';
import * as commentRepository from '../data/comment.repository.js';
import * as reviewRepository from '../data/review.repository.js';
import * as userRepository from '../../users/data/user.repository.js'; // To check user role

// Add a comment to a review
export const addComment = async (userId, reviewId, content) => {
  const review = await reviewRepository.findReviewById(reviewId);
  if (!review) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Review not found');
  }

  if (review.is_disabled || review.is_hidden) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'Cannot comment on a disabled or hidden review');
  }

  return await commentRepository.createComment({
    review_id: reviewId,
    author_id: userId,
    content,
  });
};

// Delete a comment
export const deleteComment = async (userId, commentId) => {
  const comment = await commentRepository.findCommentById(commentId);
  if (!comment) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Comment not found');
  }

  // Check permissions:
  // 1. Author of the comment can delete
  if (comment.author_id === userId) {
    await commentRepository.deleteComment(commentId);
    return { message: 'Comment deleted successfully' };
  }

  // 2. Admin can delete
  const user = await userRepository.findUserById(userId);
  if (user && user.role === 'ADMIN') {
    await commentRepository.deleteComment(commentId);
    return { message: 'Comment deleted by Admin' };
  }
  
  // 3. Review Author can delete comments on their review (Optional, implementing for better moderation)
  if (comment.review.author_id === userId) {
      await commentRepository.deleteComment(commentId);
      return { message: 'Comment deleted by Review Author' };
  }

  throw new ApiError(StatusCodes.FORBIDDEN, 'You are not authorized to delete this comment');
};

// Get comments for a review
export const getReviewComments = async (reviewId, query) => {
  const { page = 1, limit = 10 } = query;
  const skip = (page - 1) * limit;
  const take = parseInt(limit);
  
  // Check if review exists (optional, but good for 404)
  const review = await reviewRepository.findReviewById(reviewId);
  if (!review) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Review not found');
  }

  // If review is hidden/disabled, maybe hide comments too? 
  // For now, assuming if you can see the review, you can see comments.
  if (review.is_hidden) {
       throw new ApiError(StatusCodes.NOT_FOUND, 'Review not found'); // Mimic not found
  }

  return await commentRepository.findCommentsByReviewId(reviewId, { skip, take });
};

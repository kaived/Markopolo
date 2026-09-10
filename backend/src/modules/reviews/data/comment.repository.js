import Comment from '../models/Comment.js';

// Create new comment
export const createComment = async (data) => {
  const comment = await Comment.create(data);
  return await comment.populate('author_id', 'username avatar_url');
};

// Delete comment
export const deleteComment = async (id) => {
  return await Comment.findByIdAndDelete(id);
};

// Find comment by ID
export const findCommentById = async (id) => {
  return await Comment.findById(id).populate('review_id', 'author_id');
};

// Find comments for a review
export const findCommentsByReviewId = async (review_id, { skip = 0, take = 10 }) => {
  return await Comment.find({ review_id })
    .sort({ created_at: 1 })
    .skip(skip)
    .limit(take)
    .populate('author_id', 'username avatar_url');
};

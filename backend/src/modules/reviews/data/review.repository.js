import Review from '../models/Review.js';

// Create new review
export const createReview = async (data) => {
  const review = await Review.create(data);
  return await review.populate('author_id', 'username avatar_url');
};

// Update review details
export const updateReview = async (id, data) => {
  return await Review.findByIdAndUpdate(id, data, { new: true })
    .populate('author_id', 'username avatar_url');
};

// Find all public reviews (with filters)
export const findAllReviews = async ({ skip = 0, take = 10, ...filters }) => {
  const query = {
    is_disabled: false,
    is_hidden: false,
    ...filters,
  };

  const reviews = await Review.find(query)
    .sort({ created_at: -1 })
    .skip(skip)
    .limit(take)
    .populate('author_id', 'username avatar_url');
  
  // Return reviews with favoritedCount to match Prisma's _count
  return reviews.map(review => {
    const obj = review.toJSON();
    obj._count = { favoritedBy: review.favoritedBy.length };
    return obj;
  });
};

// Get review by ID (Expanded to include author details)
export const findReviewById = async (id) => {
  return await Review.findById(id).populate('author_id', 'username avatar_url');
};

// Update review status (disable/hide)
export const updateReviewStatus = async (id, data) => {
  return await Review.findByIdAndUpdate(id, data, { new: true })
    .populate('author_id', 'username email');
};

// Delete review
export const deleteReview = async (id) => {
  return await Review.findByIdAndDelete(id);
};

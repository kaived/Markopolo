import Rating from '../models/Rating.js';

// Upsert rating (Create or Update)
export const upsertRating = async (user_id, review_id, rating) => {
  return await Rating.findOneAndUpdate(
    { user_id, review_id },
    { rating },
    { upsert: true, new: true, runValidators: true }
  );
};

// Delete rating
export const deleteRating = async (user_id, review_id) => {
  return await Rating.deleteOne({ user_id, review_id });
};

// Get specific rating
export const getRating = async (user_id, review_id) => {
  return await Rating.findOne({ user_id, review_id });
};

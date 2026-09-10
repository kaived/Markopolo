import User from '../models/User.js';
import Review from '../../reviews/models/Review.js';

export const findAllUsers = async () => {
  return await User.find({}, 'id username email avatar_url role created_at');
};

export const findUserById = async (id) => {
  return await User.findById(id, 'id username email avatar_url role created_at');
};

export const updateUserRole = async (id, role) => {
  return await User.findByIdAndUpdate(
    id,
    { role },
    { new: true, select: 'id username email role' }
  );
};

// Update user profile (username, avatar)
export const updateUserProfile = async (id, data) => {
  return await User.findByIdAndUpdate(
    id,
    data,
    { new: true, select: 'id username email avatar_url role updated_at' }
  );
};

// Update user password
export const updatePassword = async (id, passwordHash) => {
  return await User.findByIdAndUpdate(
    id,
    { password_hash: passwordHash },
    { new: true, select: 'id email' }
  );
};

// Delete user account
export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

// Get user with password (for password verification)
export const findUserByIdWithPassword = async (id) => {
  return await User.findById(id, 'id username email password_hash');
};

// --- Favorites ---

export const getFavoriteReviews = async (userId) => {
  const user = await User.findById(userId).populate('favoriteReviews');
  return user ? user.favoriteReviews : [];
};

export const addFavoriteReview = async (userId, reviewId) => {
  // Update User
  await User.findByIdAndUpdate(userId, { $addToSet: { favoriteReviews: reviewId } });
  // Update Review
  await Review.findByIdAndUpdate(reviewId, { $addToSet: { favoritedBy: userId } });
  return await User.findById(userId).populate('favoriteReviews');
};

export const removeFavoriteReview = async (userId, reviewId) => {
  // Update User
  await User.findByIdAndUpdate(userId, { $pull: { favoriteReviews: reviewId } });
  // Update Review
  await Review.findByIdAndUpdate(reviewId, { $pull: { favoritedBy: userId } });
  return await User.findById(userId).populate('favoriteReviews');
};

// --- Status & Activity ---

export const updateUserStatus = async (id, isActive) => {
  return await User.findByIdAndUpdate(
    id,
    { is_active: isActive },
    { new: true, select: 'id username is_active' }
  );
};

export const getUserActivity = async (userId) => {
  const totalReviewsWritten = await Review.countDocuments({ author_id: userId });
  const user = await User.findById(userId, 'favoriteReviews updated_at');
  
  if (!user) return null;

  return {
    totalReviewsWritten,
    totalFavorites: user.favoriteReviews.length,
    lastActive: user.updated_at,
  };
};

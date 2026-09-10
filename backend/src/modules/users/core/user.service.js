import bcrypt from 'bcrypt';
import { ApiError, StatusCodes } from '../../../shared/errors/ApiError.js';
import * as userRepository from '../data/user.repository.js';

const SALT_ROUNDS = 10;

export const getAllUsers = async () => {
  return await userRepository.findAllUsers();
};

export const getUserById = async (id) => {
  const user = await userRepository.findUserById(id);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }
  return user;
};

export const updateUserRole = async (id, role) => {
  const user = await userRepository.findUserById(id);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }
  
  return await userRepository.updateUserRole(id, role);
};

// Update own profile
export const updateOwnProfile = async (userId, updates) => {
  // Check if username is being updated and if it's already taken
  if (updates.username) {
    const existingUser = await userRepository.findAllUsers();
    const usernameTaken = existingUser.some(
      u => u.username === updates.username && u.id !== userId
    );
    
    if (usernameTaken) {
      throw new ApiError(StatusCodes.CONFLICT, 'Username already taken');
    }
  }
  
  return await userRepository.updateUserProfile(userId, updates);
};

// Change password
export const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await userRepository.findUserByIdWithPassword(userId);
  
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }
  
  // Verify current password
  const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
  if (!isMatch) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Current password is incorrect');
  }
  
  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
  
  await userRepository.updatePassword(userId, hashedPassword);
  
  return { message: 'Password changed successfully' };
};

// Update avatar
export const updateAvatar = async (userId, avatarUrl) => {
  return await userRepository.updateUserProfile(userId, { avatar_url: avatarUrl });
};

// Delete own account
export const deleteOwnAccount = async (userId) => {
  const user = await userRepository.findUserById(userId);
  
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }
  
  await userRepository.deleteUser(userId);
  
  return { message: 'Account deleted successfully' };
};

// Add favorite review (user)
export const addFavoriteReview = async (userId, reviewId) => {
  // Check if already favorited (optional, Prisma handles check but we can be explicit)
  const favorites = await userRepository.getFavoriteReviews(userId);
  const exists = favorites.some(r => r.id === reviewId);
  
  if (exists) {
    throw new ApiError(StatusCodes.CONFLICT, 'Review already in favorites');
  }
  
  return await userRepository.addFavoriteReview(userId, reviewId);
};

// Remove favorite review (user)
export const removeFavoriteReview = async (userId, reviewId) => {
  const favorites = await userRepository.getFavoriteReviews(userId);
  const exists = favorites.some(r => r.id === reviewId);
  
  if (!exists) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Review not found in favorites');
  }
  
  return await userRepository.removeFavoriteReview(userId, reviewId);
};

// Get favorite reviews (user)
export const getFavoriteReviews = async (userId) => {
  return await userRepository.getFavoriteReviews(userId);
};

// Admin: Suspend user
export const suspendUser = async (userId) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }
  
  // Prevent suspending other admins (optional, but good practice)
  if (user.role === 'ADMIN') {
    throw new ApiError(StatusCodes.FORBIDDEN, 'Cannot suspend an admin');
  }
  
  return await userRepository.updateUserStatus(userId, false);
};

// Admin: Reactivate user
export const reactivateUser = async (userId) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }
  
  return await userRepository.updateUserStatus(userId, true);
};

// Admin: Delete any user
export const deleteAnyUser = async (userId) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }
  
  if (user.role === 'ADMIN') {
    throw new ApiError(StatusCodes.FORBIDDEN, 'Cannot delete an admin');
  }
  
  await userRepository.deleteUser(userId);
  return { message: 'User deleted successfully' };
};

// Admin: Get user activity
export const getUserActivity = async (userId) => {
  const activity = await userRepository.getUserActivity(userId);
  if (!activity) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }
  return activity;
};

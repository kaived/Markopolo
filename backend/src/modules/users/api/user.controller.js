import { StatusCodes } from 'http-status-codes';
import { catchAsync, sendResponse } from '../../../shared/utils/response.js';
import * as userService from '../core/user.service.js';

export const getAllUsers = catchAsync(async (req, res) => {
  const users = await userService.getAllUsers();
  sendResponse(res, StatusCodes.OK, true, 'Users retrieved successfully', users);
});

export const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  sendResponse(res, StatusCodes.OK, true, 'User details retrieved', user);
});

export const updateUserRole = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const updatedUser = await userService.updateUserRole(id, role);
  sendResponse(res, StatusCodes.OK, true, 'User role updated successfully', updatedUser);
});

// Update own profile
export const updateProfile = catchAsync(async (req, res) => {
  const updates = {};
  if (req.body.username) updates.username = req.body.username;
  if (req.body.avatar_url) updates.avatar_url = req.body.avatar_url;
  
  const updatedUser = await userService.updateOwnProfile(req.user.id, updates);
  sendResponse(res, StatusCodes.OK, true, 'Profile updated successfully', updatedUser);
});

// Change password
export const changePassword = catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const result = await userService.changePassword(req.user.id, currentPassword, newPassword);
  sendResponse(res, StatusCodes.OK, true, result.message, null);
});

// Update avatar
export const updateAvatar = catchAsync(async (req, res) => {
  const { avatar_url } = req.body;
  const updatedUser = await userService.updateAvatar(req.user.id, avatar_url);
  sendResponse(res, StatusCodes.OK, true, 'Avatar updated successfully', updatedUser);
});

// Delete own account
export const deleteAccount = catchAsync(async (req, res) => {
  const result = await userService.deleteOwnAccount(req.user.id);
  sendResponse(res, StatusCodes.OK, true, result.message, null);
});

// Add favorite review
export const addFavorite = catchAsync(async (req, res) => {
  const { reviewId } = req.body;
  const updatedUser = await userService.addFavoriteReview(req.user.id, reviewId);
  sendResponse(res, StatusCodes.OK, true, 'Review added to favorites', updatedUser);
});

// Remove favorite review
export const removeFavorite = catchAsync(async (req, res) => {
  const { reviewId } = req.params;
  const updatedUser = await userService.removeFavoriteReview(req.user.id, reviewId);
  sendResponse(res, StatusCodes.OK, true, 'Review removed from favorites', updatedUser);
});

// Get favorite reviews
export const getFavorites = catchAsync(async (req, res) => {
  const favorites = await userService.getFavoriteReviews(req.user.id);
  sendResponse(res, StatusCodes.OK, true, 'Favorites retrieved successfully', favorites);
});

// Admin: Suspend user
export const suspendUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await userService.suspendUser(id);
  sendResponse(res, StatusCodes.OK, true, 'User suspended successfully', user);
});

// Admin: Reactivate user
export const reactivateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await userService.reactivateUser(id);
  sendResponse(res, StatusCodes.OK, true, 'User reactivated successfully', user);
});

// Admin: Delete any user
export const deleteAnyUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userService.deleteAnyUser(id);
  sendResponse(res, StatusCodes.OK, true, result.message, null);
});

// Admin: Get user activity
export const getUserActivity = catchAsync(async (req, res) => {
  const { id } = req.params;
  const activity = await userService.getUserActivity(id);
  sendResponse(res, StatusCodes.OK, true, 'User activity retrieved', activity);
});

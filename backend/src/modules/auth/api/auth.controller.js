import { StatusCodes } from 'http-status-codes';
import { catchAsync, sendResponse } from '../../../shared/utils/response.js';
import * as authService from '../core/auth.service.js';
import { env } from '../../../config/env.js';

export const register = catchAsync(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await authService.registerUser(username, email, password);
  sendResponse(res, StatusCodes.CREATED, true, 'User registered successfully', user);
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await authService.loginUser(email, password);
  
  // Set refresh token as httpOnly cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  sendResponse(res, StatusCodes.OK, true, 'Login successful', { 
    user, 
    accessToken 
  });
});

export const refresh = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const { accessToken, refreshToken: newRefreshToken, user } = await authService.refreshAccessToken(refreshToken);
  
  // Set new rotated refresh token as httpOnly cookie
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  sendResponse(res, StatusCodes.OK, true, 'Token refreshed successfully', { 
    accessToken,
    user 
  });
});

export const logout = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  await authService.logoutUser(refreshToken);
  
  // Clear the refresh token cookie
  res.clearCookie('refreshToken');
  
  sendResponse(res, StatusCodes.OK, true, 'Logged out successfully', null);
});

export const getMe = catchAsync(async (req, res) => {
  const user = await authService.getUserById(req.user.id);
  sendResponse(res, StatusCodes.OK, true, 'User profile retrieved', user);
});

export const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await authService.requestPasswordReset(email);
  sendResponse(res, StatusCodes.OK, true, result.message, { 
    resetToken: result.resetToken 
  });
});

export const resetPassword = catchAsync(async (req, res) => {
  const { token, newPassword } = req.body;
  const result = await authService.resetPassword(token, newPassword);
  sendResponse(res, StatusCodes.OK, true, result.message, null);
});
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import { env } from '../../../config/env.js';
import logger from '../../../shared/logger/logger.js';
import { ApiError, StatusCodes } from '../../../shared/errors/ApiError.js';
import * as authRepository from '../data/auth.repository.js';

const SALT_ROUNDS = 10;

export const registerUser = async (username, email, password) => {
  const existingUser = await authRepository.findUserByEmail(email);
  if (existingUser) {
    throw new ApiError(StatusCodes.CONFLICT, 'User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  
  const newUser = await authRepository.createUser({
    username,
    email,
    password_hash: hashedPassword,
  });

  return newUser; // Repository currently doesn't select specific fields, we might need to adjust or map here
};

export const loginUser = async (email, password) => {
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  const accessToken = generateToken(user);
  const refreshToken = await generateRefreshToken(user);

  return { user, accessToken, refreshToken };
};

export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Refresh token required');
  }

  // 1. Verify the refresh token signature
  let decoded;
  try {
    decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
  } catch (error) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid refresh token');
  }

  // 2. Check if token exists in database
  const storedToken = await authRepository.findRefreshToken(refreshToken);
  
  // 3. TOKEN REUSE DETECTION (Breach detection)
  if (!storedToken) {
    // If the token is valid (signed) but NOT in DB, it might have been used-and-deleted, 
    // or it's a rotated token that was stolen. 
    // For maximum security, we treat this as a breach if we can decode the user ID.
    if (decoded && decoded.id) {
      logger.warn(`Potential refresh token reuse detected for user ${decoded.id}! Revoking all tokens.`);
      await authRepository.deleteUserRefreshTokens(decoded.id);
    }
    throw new ApiError(StatusCodes.FORBIDDEN, 'Security breach detected. Please login again.');
  }

  // 4. Check if token was already marked as used (rotated)
  if (storedToken.used) {
    logger.warn(`Stolen/Used refresh token presented by user ${storedToken.user_id.id}! Revoking all sessions.`);
    await authRepository.deleteUserRefreshTokens(storedToken.user_id.id);
    throw new ApiError(StatusCodes.FORBIDDEN, 'Session compromised. All devices logged out.');
  }

  // 5. Check if token is expired
  if (new Date() > storedToken.expires_at) {
    await authRepository.deleteRefreshToken(refreshToken);
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Refresh token expired');
  }

  // 6. SUCCESS: Rotate tokens
  // Mark old token as used
  await authRepository.markTokenAsUsed(refreshToken);

  // Generate new tokens
  const user = storedToken.user_id; // Because of .populate('user_id')
  const newAccessToken = generateToken(user);
  const newRefreshToken = await generateRefreshToken(user);

  return { 
    accessToken: newAccessToken, 
    refreshToken: newRefreshToken,
    user 
  };
};

export const logoutUser = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Refresh token required');
  }

  // Delete refresh token from database
  try {
    await authRepository.deleteRefreshToken(refreshToken);
  } catch (error) {
    // Token might not exist, but that's okay for logout
    console.log('Token already removed or does not exist');
  }

  return { message: 'Logged out successfully' };
};

export const getUserById = async (userId) => {
  const user = await authRepository.findUserById(userId);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }
  return user;
};

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    env.JWT_SECRET,
    { expiresIn: env.ACCESS_TOKEN_EXPIRY } // Strictly use env variable
  );
};

export const generateRefreshToken = async (user) => {
  const expiresIn = env.REFRESH_TOKEN_EXPIRY;
  
  const refreshToken = jwt.sign(
    { id: user.id, type: 'refresh' },
    env.JWT_REFRESH_SECRET,
    { expiresIn: expiresIn } // Use same string for JWT
  );

  // Calculate expiration date using ms package for precision
  const expiresAt = new Date(Date.now() + ms(expiresIn));

  // Store refresh token in database
  await authRepository.createRefreshToken({
    token: refreshToken,
    user_id: user.id,
    expires_at: expiresAt,
  });

  return refreshToken;
};

// Password Reset Functions
export const requestPasswordReset = async (email) => {
  const user = await authRepository.findUserByEmail(email);
  
  // For security, don't reveal if user exists or not
  if (!user) {
    return { message: 'If the email exists, a password reset link has been sent' };
  }

  // Delete any existing reset tokens for this user
  await authRepository.deleteUserPasswordResetTokens(user.id);

  // Generate reset token
  const resetToken = await generatePasswordResetToken(user);

  // TODO: Send email with reset token
  // For now, we'll return the token (in production, this should be sent via email)
  logger.info(`Password reset token for ${email}: ${resetToken}`);
  
  return { 
    message: 'If the email exists, a password reset link has been sent',
    // Remove this in production - only for development/testing
    resetToken: env.NODE_ENV === 'development' ? resetToken : undefined
  };
};

export const resetPassword = async (token, newPassword) => {
  if (!token || !newPassword) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Token and new password are required');
  }

  // Find the reset token
  const resetToken = await authRepository.findPasswordResetToken(token);
  
  if (!resetToken) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid or expired reset token');
  }

  // Check if token is expired
  if (new Date() > resetToken.expires_at) {
    await authRepository.deletePasswordResetToken(token);
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Reset token has expired');
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

  // Update user's password
  await authRepository.updateUserPassword(resetToken.user_id, hashedPassword);

  // Delete the used reset token
  await authRepository.deletePasswordResetToken(token);

  // Optional: Delete all refresh tokens to force re-login
  await authRepository.deleteUserRefreshTokens(resetToken.user_id);

  return { message: 'Password reset successfully' };
};

const generatePasswordResetToken = async (user) => {
  // Generate a 6-digit numeric OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Calculate expiration date (10 minutes from now)
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);

  // Store numeric OTP as the token in database
  await authRepository.createPasswordResetToken({
    token: otp,
    user_id: user.id,
    expires_at: expiresAt,
  });

  return otp;
};

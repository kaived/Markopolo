import User from '../../users/models/User.js';
import RefreshToken from '../models/RefreshToken.js';
import PasswordResetToken from '../models/PasswordResetToken.js';

export const createUser = async (data) => {
  return await User.create(data);
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

// Refresh Token CRUD Operations
export const createRefreshToken = async (data) => {
  return await RefreshToken.create(data);
};

export const findRefreshToken = async (token) => {
  return await RefreshToken.findOne({ token }).populate('user_id');
};

export const deleteRefreshToken = async (token) => {
  return await RefreshToken.deleteOne({ token });
};

export const markTokenAsUsed = async (token) => {
  return await RefreshToken.findOneAndUpdate({ token }, { used: true });
};

export const deleteUserRefreshTokens = async (userId) => {
  return await RefreshToken.deleteMany({ user_id: userId });
};

// Password Reset Token CRUD Operations
export const createPasswordResetToken = async (data) => {
  return await PasswordResetToken.create(data);
};

export const findPasswordResetToken = async (token) => {
  return await PasswordResetToken.findOne({ token }).populate('user_id');
};

export const deletePasswordResetToken = async (token) => {
  return await PasswordResetToken.deleteOne({ token });
};

export const deleteUserPasswordResetTokens = async (userId) => {
  return await PasswordResetToken.deleteMany({ user_id: userId });
};

export const updateUserPassword = async (userId, passwordHash) => {
  return await User.findByIdAndUpdate(
    userId,
    { password_hash: passwordHash },
    { new: true }
  );
};

import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { ApiError, StatusCodes } from '../errors/ApiError.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Access token required'));
  }

  jwt.verify(token, env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(new ApiError(StatusCodes.FORBIDDEN, 'Invalid or expired token'));
    }
    req.user = user;
    next();
  });
};

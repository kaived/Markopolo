import { ApiError, StatusCodes } from '../errors/ApiError.js';
import { ROLE_LEVEL } from '../constants/roles.js';

/**
 * Middleware to check minimum required role level.
 * ADMIN automatically inherits lower permissions.
 */
export const authorize = (minRole) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return next(
        new ApiError(StatusCodes.FORBIDDEN, 'Access denied. No role assigned.')
      );
    }

    const userLevel = ROLE_LEVEL[req.user.role];
    const requiredLevel = ROLE_LEVEL[minRole];

    if (!userLevel || userLevel < requiredLevel) {
      return next(
        new ApiError(StatusCodes.FORBIDDEN, 'Access denied. Insufficient permissions.')
      );
    }

    next();
  };
};

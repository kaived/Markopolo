import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import mongoose from 'mongoose';
import { env } from '../../config/env.js';
import logger from '../logger/logger.js';
import { ApiError } from '../errors/ApiError.js';

export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  // Handle Zod Validation Errors
  if (err instanceof ZodError) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = err.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
  }

  // Handle Mongoose Validation/Duplicate Errors
  if (err.name === 'ValidationError') {
    statusCode = StatusCodes.BAD_REQUEST;
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }
  
  if (err.code === 11000) {
    statusCode = StatusCodes.CONFLICT;
    message = 'Duplicate field value entered';
  }

  if (!statusCode) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    message = err.message || StatusCodes.getStatusText(StatusCodes.INTERNAL_SERVER_ERROR);
  }

  const response = {
    code: statusCode,
    message,
    ...(env.isDevelopment && { stack: err.stack }),
  };

  if (env.isDevelopment) {
    logger.error(err);
  }

  res.status(statusCode).json(response);
};

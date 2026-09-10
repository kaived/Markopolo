import { StatusCodes } from 'http-status-codes';
import { catchAsync, sendResponse } from '../../../shared/utils/response.js';
import * as ratingService from '../core/rating.service.js';

export const rateReview = catchAsync(async (req, res) => {
  const { reviewId } = req.params;
  const { rating } = req.body;
  const userId = req.user.id;

  const result = await ratingService.rateReview(userId, reviewId, rating);
  sendResponse(res, StatusCodes.OK, true, 'Review rated successfully', result);
});

export const removeRating = catchAsync(async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user.id;

  await ratingService.removeRating(userId, reviewId);
  sendResponse(res, StatusCodes.OK, true, 'Rating removed successfully', null);
});

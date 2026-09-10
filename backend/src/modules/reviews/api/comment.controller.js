import { StatusCodes } from 'http-status-codes';
import { catchAsync, sendResponse } from '../../../shared/utils/response.js';
import * as commentService from '../core/comment.service.js';

export const addComment = catchAsync(async (req, res) => {
  const { reviewId } = req.params;
  const { content } = req.body;
  const comment = await commentService.addComment(req.user.id, reviewId, content);
  sendResponse(res, StatusCodes.CREATED, true, 'Comment added successfully', comment);
});

export const deleteComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await commentService.deleteComment(req.user.id, id);
  sendResponse(res, StatusCodes.OK, true, result.message, null);
});

export const getComments = catchAsync(async (req, res) => {
  const { reviewId } = req.params;
  const comments = await commentService.getReviewComments(reviewId, req.query);
  sendResponse(res, StatusCodes.OK, true, 'Comments retrieved successfully', comments);
});

import crypto from 'crypto';
import { StatusCodes } from 'http-status-codes';
import { catchAsync, sendResponse } from '../../../shared/utils/response.js';
import * as reviewService from '../core/review.service.js';
import cloudinary from '../../../config/cloudinary.js';
import { ApiError } from '../../../shared/errors/ApiError.js';

// --- User Endpoints ---

export const createReview = catchAsync(async (req, res) => {
  const review = await reviewService.createUserReview(req.user.id, req.body);
  sendResponse(res, StatusCodes.CREATED, true, 'Review created successfully', review);
});

export const updateReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const review = await reviewService.updateUserReview(req.user.id, id, req.body);
  sendResponse(res, StatusCodes.OK, true, 'Review updated successfully', review);
});

export const deleteOwnReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await reviewService.deleteUserReview(req.user.id, id);
  sendResponse(res, StatusCodes.OK, true, result.message, null);
});

export const getReviews = catchAsync(async (req, res) => {
  const reviews = await reviewService.getPublicReviews(req.query);
  sendResponse(res, StatusCodes.OK, true, 'Reviews retrieved successfully', reviews);
});

export const uploadMedia = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'No file uploaded');
  }

  // 1. Generate unique hash from file buffer to prevent duplicates
  const hash = crypto.createHash('md5').update(req.file.buffer).digest('hex');
  
  // 2. Define user-specific folder and public_id
  const userId = req.user.id;
  const folder = `markopolo/users/${userId}/reviews`;
  const publicId = hash; // Using the hash as public_id avoids duplicates in Cloudinary

  // 3. Upload to Cloudinary using buffer stream
  const uploadFromBuffer = (buffer) => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: publicId,
          resource_type: 'auto', // Automatically handle images, videos, or raw docs
          overwrite: true,       // If same content is uploaded, it overwrites the same public_id
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(buffer);
    });
  };

  try {
    const result = await uploadFromBuffer(req.file.buffer);
    sendResponse(res, StatusCodes.OK, true, 'Media uploaded successfully', { 
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      bytes: result.bytes
    });
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Cloudinary upload failed: ${error.message}`);
  }
});

// --- Admin/Moderation Endpoints ---

export const disableReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const review = await reviewService.disableReview(id);
  sendResponse(res, StatusCodes.OK, true, 'Review disabled successfully', review);
});

export const hideReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const review = await reviewService.hideReview(id);
  sendResponse(res, StatusCodes.OK, true, 'Review hidden successfully', review);
});

export const deleteReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await reviewService.deleteReview(id);
  sendResponse(res, StatusCodes.OK, true, result.message, null);
});

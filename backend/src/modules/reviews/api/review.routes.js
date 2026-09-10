import express from 'express';
import * as reviewController from './review.controller.js';
import * as commentController from './comment.controller.js';
import * as ratingController from './rating.controller.js';
import { authenticateToken } from '../../../shared/middleware/auth.middleware.js';
import { authorize } from '../../../shared/middleware/role.middleware.js';
import { validate } from '../../../shared/middleware/validate.js';
import { createReviewSchema, updateReviewSchema, commentSchema } from './review.validation.js';
import { upload } from '../../../shared/middleware/upload.middleware.js';

const router = express.Router();

router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Review moderation endpoints
 * components:
 *   schemas:
 *     ReviewRating:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         user_id:
 *           type: string
 *           format: uuid
 *         review_id:
 *           type: string
 *           format: uuid
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *         created_at:
 *           type: string
 *           format: date-time
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *         attachments:
 *           type: array
 *           items:
 *             type: string
 *             format: uri
 *         location:
 *           type: string
 *         author_id:
 *           type: string
 *           format: uuid
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         content:
 *           type: string
 *         review_id:
 *           type: string
 *           format: uuid
 *         author_id:
 *           type: string
 *           format: uuid
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */

// --- User Review Routes ---

/**
 * @swagger
 * /reviews/upload:
 *   post:
 *     summary: Upload media
 *     description: Upload an image, video, or document (returns URL)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Media uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       format: uri
 *                     public_id:
 *                       type: string
 *                     format:
 *                       type: string
 *                     bytes:
 *                       type: integer
 *       400:
 *         description: Bad request (Invalid file type or no file)
 *       401:
 *         description: Unauthorized
 */
router.post('/upload', upload.single('file'), reviewController.uploadMedia);

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a review
 *     description: Create a new review with title, content, rating, attachments (images/video/doc), and location
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - rating
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uri
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', validate(createReviewSchema), reviewController.createReview);

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get reviews
 *     description: Get a list of public reviews with pagination and filters
 *     tags: [Reviews]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: author_id
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Reviews retrieved successfully
 */
router.get('/', reviewController.getReviews);

/**
 * @swagger
 * /reviews/{id}:
 *   patch:
 *     summary: Update review
 *     description: Update own review (cannot update if disabled/hidden)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uri
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not owner or review locked
 *       404:
 *         description: Review not found
 */
router.patch('/:id', validate(updateReviewSchema), reviewController.updateReview);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete review (User)
 *     description: Delete own review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not owner
 *       404:
 *         description: Review not found
 */
router.delete('/:id', reviewController.deleteOwnReview);

// --- Comment Routes ---

/**
 * @swagger
 * /reviews/{reviewId}/comments:
 *   post:
 *     summary: Add comment
 *     description: Add a comment to a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Review not found
 */
router.post('/:reviewId/comments', validate(commentSchema), commentController.addComment);

/**
 * @swagger
 * /reviews/{reviewId}/comments:
 *   get:
 *     summary: Get comments
 *     description: Get comments for a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *       404:
 *         description: Review not found
 */
router.get('/:reviewId/comments', commentController.getComments);

/**
 * @swagger
 * /reviews/comments/{id}:
 *   delete:
 *     summary: Delete comment
 *     description: Delete a comment (Author, Admin, or Review Owner)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Comment not found
 */
router.delete('/comments/:id', commentController.deleteComment);

// --- Rating Routes ---

/**
 * @swagger
 * /reviews/{reviewId}/rate:
 *   post:
 *     summary: Rate a review
 *     description: Rate a review (1-5 stars)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       200:
 *         description: Review rated successfully
 *       400:
 *         description: Bad request (Invalid rating)
 *       403:
 *         description: Forbidden (Cannot rate own review)
 *       404:
 *         description: Review not found
 */
router.post('/:reviewId/rate', ratingController.rateReview);

/**
 * @swagger
 * /reviews/{reviewId}/rate:
 *   delete:
 *     summary: Remove rating
 *     description: Remove your rating from a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Rating removed successfully
 *       404:
 *         description: Rating not found
 */
router.delete('/:reviewId/rate', ratingController.removeRating);

// --- Admin/Moderation Routes ---

/**
 * @swagger
 * /reviews/{id}/disable:
 *   patch:
 *     summary: Disable review (Admin)
 *     description: Disable a review so it is not visible to the public (Admin only)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review disabled successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Review not found
 */
router.patch('/:id/disable', authorize('ADMIN'), reviewController.disableReview);

/**
 * @swagger
 * /reviews/{id}/hide:
 *   patch:
 *     summary: Hide review (Admin)
 *     description: Hide a review completely (Admin only)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review hidden successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Review not found
 */
router.patch('/:id/hide', authorize('ADMIN'), reviewController.hideReview);

/**
 * @swagger
 * /reviews/{id}/admin:
 *   delete:
 *     summary: Delete review (Admin)
 *     description: Permanently delete a review (Admin only)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Review not found
 */
router.delete('/:id/admin', authorize('ADMIN'), reviewController.deleteReview);

export default router;

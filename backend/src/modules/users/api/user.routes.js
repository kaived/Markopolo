import express from 'express';
import * as userController from './user.controller.js';
import { validate } from '../../../shared/middleware/validate.js';
import { userIdSchema, roleSchema, updateProfileSchema, changePasswordSchema, updateAvatarSchema } from './user.validation.js';
import { authenticateToken } from '../../../shared/middleware/auth.middleware.js';
import { authorize } from '../../../shared/middleware/role.middleware.js';

const router = express.Router();

router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         avatar_url:
 *           type: string
 *           format: uri
 *         role:
 *           type: string
 *           enum: [USER, ADMIN]
 *         is_active:
 *           type: boolean
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users (requires authentication)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Users retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       username:
 *                         type: string
 *                       email:
 *                         type: string
 *                       role:
 *                         type: string
 *                         enum: [USER, ADMIN]
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a specific user by their ID (requires authentication)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                       enum: [USER, ADMIN]
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get('/:id', validate(userIdSchema), userController.getUserById);

/**
 * @swagger
 * /users/{id}/role:
 *   patch:
 *     summary: Update user role
 *     description: Update a user's role (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN]
 *                 example: ADMIN
 *     responses:
 *       200:
 *         description: User role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User role updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 */
router.patch('/:id/role', authorize('ADMIN'), validate(roleSchema), userController.updateUserRole);

/**
 * @swagger
 * /users/me:
 *   patch:
 *     summary: Update own profile
 *     description: Update authenticated user's username or avatar
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 example: newusername
 *               avatar_url:
 *                 type: string
 *                 format: uri
 *                 example: https://example.com/avatar.jpg
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Profile updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     avatar_url:
 *                       type: string
 *                     role:
 *                       type: string
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Bad request - Invalid data
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Username already taken
 */
router.patch('/me', validate(updateProfileSchema), userController.updateProfile);

/**
 * @swagger
 * /users/me/password:
 *   patch:
 *     summary: Change password
 *     description: Change authenticated user's password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 format: password
 *                 example: OldPass123
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 example: NewSecurePass123
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Password changed successfully
 *                 data:
 *                   type: null
 *       400:
 *         description: Bad request
 *       401:
 *         description: Current password is incorrect
 */
router.patch('/me/password', validate(changePasswordSchema), userController.changePassword);

/**
 * @swagger
 * /users/me/avatar:
 *   put:
 *     summary: Update avatar
 *     description: Update authenticated user's avatar URL
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - avatar_url
 *             properties:
 *               avatar_url:
 *                 type: string
 *                 format: uri
 *                 example: https://example.com/new-avatar.jpg
 *     responses:
 *       200:
 *         description: Avatar updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Avatar updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     avatar_url:
 *                       type: string
 *       400:
 *         description: Bad request - Invalid URL
 *       401:
 *         description: Unauthorized
 */
router.put('/me/avatar', validate(updateAvatarSchema), userController.updateAvatar);

/**
 * @swagger
 * /users/me:
 *   delete:
 *     summary: Delete own account
 *     description: Permanently delete authenticated user's account
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Account deleted successfully
 *                 data:
 *                   type: null
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.delete('/me', userController.deleteAccount);

// --- User Favorites Routes ---

/**
 * @swagger
 * /users/favorites:
 *   get:
 *     summary: Get favorite reviews
 *     description: Get list of authenticated user's favorite reviews
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Favorites retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Favorites retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       content:
 *                         type: string
 *                       rating:
 *                         type: integer
 *                       author_id:
 *                         type: string
 *       401:
 *         description: Unauthorized
 */
router.get('/favorites', userController.getFavorites);

/**
 * @swagger
 * /users/favorites:
 *   post:
 *     summary: Add favorite review
 *     description: Add a review to authenticated user's favorites
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reviewId
 *             properties:
 *               reviewId:
 *                 type: string
 *                 format: uuid
 *                 example: 550e8400-e29b-41d4-a716-446655440000
 *     responses:
 *       200:
 *         description: Review added to favorites
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Review not found
 *       409:
 *         description: Review already in favorites
 */
router.post('/favorites', userController.addFavorite);

/**
 * @swagger
 * /users/favorites/{reviewId}:
 *   delete:
 *     summary: Remove favorite review
 *     description: Remove a review from authenticated user's favorites
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Review ID to remove
 *     responses:
 *       200:
 *         description: Review removed from favorites
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Review not found in favorites
 */
router.delete('/favorites/:reviewId', userController.removeFavorite);

// --- Admin Routes ---

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user (Admin)
 *     description: Permanently delete a user account (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 */
router.delete('/:id', authorize('ADMIN'), validate(userIdSchema), userController.deleteAnyUser);

/**
 * @swagger
 * /users/{id}/suspend:
 *   patch:
 *     summary: Suspend user (Admin)
 *     description: Suspend a user account (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID to suspend
 *     responses:
 *       200:
 *         description: User suspended successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
router.patch('/:id/suspend', authorize('ADMIN'), validate(userIdSchema), userController.suspendUser);

/**
 * @swagger
 * /users/{id}/reactivate:
 *   patch:
 *     summary: Reactivate user (Admin)
 *     description: Reactivate a suspended user account (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID to reactivate
 *     responses:
 *       200:
 *         description: User reactivated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
router.patch('/:id/reactivate', authorize('ADMIN'), validate(userIdSchema), userController.reactivateUser);

/**
 * @swagger
 * /users/{id}/activity:
 *   get:
 *     summary: Get user activity (Admin)
 *     description: Get activity stats for a user (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     responses:
 *       200:
 *         description: User activity retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User activity retrieved
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalReviewsWritten:
 *                       type: integer
 *                     totalFavorites:
 *                       type: integer
 *                     lastActive:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
router.get('/:id/activity', authorize('ADMIN'), validate(userIdSchema), userController.getUserActivity);

export default router;

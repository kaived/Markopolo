import express from 'express';
import * as notificationController from './notification.controller.js';
import { authenticateToken } from '../../../shared/middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: User notification management endpoints
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         user_id:
 *           type: string
 *           format: uuid
 *         type:
 *           type: string
 *         title:
 *           type: string
 *         message:
 *           type: string
 *         is_read:
 *           type: boolean
 *         created_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get my notifications
 *     description: Get all notifications for the authenticated user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully
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
 *                   example: Notifications retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       type:
 *                         type: string
 *                         example: like
 *                       title:
 *                         type: string
 *                         example: Alex liked your review
 *                       message:
 *                         type: string
 *                         example: Alex liked your review on Restaurant XYZ
 *                       is_read:
 *                         type: boolean
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized
 */
router.get('/', notificationController.getNotifications);

/**
 * @swagger
 * /notifications/unread-count:
 *   get:
 *     summary: Get count of unread notifications
 *     description: Get the number of unread notifications for the authenticated user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Unread count retrieved successfully
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
 *                   example: Unread count retrieved
 *                 data:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                       example: 5
 *       401:
 *         description: Unauthorized
 */
router.get('/unread-count', notificationController.getUnreadCount);

/**
 * @swagger
 * /notifications/read-all:
 *   patch:
 *     summary: Mark all notifications as read
 *     description: Mark all notifications as read for the authenticated user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications marked as read
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
 *                   example: All notifications marked as read
 *                 data:
 *                   type: null
 *       401:
 *         description: Unauthorized
 */
router.patch('/read-all', notificationController.markAllRead);

/**
 * @swagger
 * /notifications/all:
 *   delete:
 *     summary: Delete all my notifications
 *     description: Delete all notifications for the authenticated user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications deleted
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
 *                   example: All notifications deleted
 *                 data:
 *                   type: null
 *       401:
 *         description: Unauthorized
 */
router.delete('/all', notificationController.deleteAll);

/**
 * @swagger
 * /notifications/{id}/read:
 *   patch:
 *     summary: Mark a single notification as read
 *     description: Mark a specific notification as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification marked as read
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
 *                   example: Notification marked as read
 *                 data:
 *                   type: null
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Notification not found
 */
router.patch('/:id/read', notificationController.markAsRead);

export default router;

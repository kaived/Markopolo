import { StatusCodes } from 'http-status-codes';
import { catchAsync, sendResponse } from '../../../shared/utils/response.js';
import * as notificationService from '../core/notification.service.js';

export const getNotifications = catchAsync(async (req, res) => {
  const notifications = await notificationService.getUserNotifications(req.user.id);
  sendResponse(res, StatusCodes.OK, true, 'Notifications retrieved successfully', notifications);
});

export const getUnreadCount = catchAsync(async (req, res) => {
  const count = await notificationService.getUnreadNotificationCount(req.user.id);
  sendResponse(res, StatusCodes.OK, true, 'Unread count retrieved', { count });
});

export const markAllRead = catchAsync(async (req, res) => {
  const result = await notificationService.markAllNotificationsAsRead(req.user.id);
  sendResponse(res, StatusCodes.OK, true, result.message, null);
});

export const deleteAll = catchAsync(async (req, res) => {
  const result = await notificationService.deleteAllUserNotifications(req.user.id);
  sendResponse(res, StatusCodes.OK, true, result.message, null);
});

export const markAsRead = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await notificationService.markSingleNotificationAsRead(id, req.user.id);
  sendResponse(res, StatusCodes.OK, true, result.message, null);
});

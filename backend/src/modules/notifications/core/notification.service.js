import { ApiError, StatusCodes } from '../../../shared/errors/ApiError.js';
import * as notificationRepository from '../data/notification.repository.js';

export const getUserNotifications = async (userId) => {
  return await notificationRepository.findNotificationsByUserId(userId);
};

export const getUnreadNotificationCount = async (userId) => {
  return await notificationRepository.getUnreadCount(userId);
};

export const markAllNotificationsAsRead = async (userId) => {
  await notificationRepository.markAllAsRead(userId);
  return { message: 'All notifications marked as read' };
};

export const deleteAllUserNotifications = async (userId) => {
  await notificationRepository.deleteAllNotifications(userId);
  return { message: 'All notifications deleted' };
};

export const markSingleNotificationAsRead = async (notificationId, userId) => {
  const result = await notificationRepository.markNotificationAsRead(notificationId, userId);
  
  if (result.count === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Notification not found or already read');
  }
  
  return { message: 'Notification marked as read' };
};

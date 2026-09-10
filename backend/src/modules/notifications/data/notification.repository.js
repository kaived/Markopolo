import Notification from '../models/Notification.js';

// Get all notifications for a user
export const findNotificationsByUserId = async (user_id) => {
  return await Notification.find({ user_id }).sort({ created_at: -1 });
};

// Get unread notification count
export const getUnreadCount = async (user_id) => {
  return await Notification.countDocuments({
    user_id,
    is_read: false,
  });
};

// Mark all notifications as read
export const markAllAsRead = async (user_id) => {
  return await Notification.updateMany(
    { user_id, is_read: false },
    { is_read: true }
  );
};

// Delete all notifications for a user
export const deleteAllNotifications = async (user_id) => {
  return await Notification.deleteMany({ user_id });
};

// Mark single notification as read
export const markNotificationAsRead = async (notificationId, user_id) => {
  return await Notification.updateOne(
    { _id: notificationId, user_id },
    { is_read: true }
  );
};

// Create a notification
export const createNotification = async (data) => {
  return await Notification.create(data);
};

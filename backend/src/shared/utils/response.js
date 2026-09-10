export const sendResponse = (res, statusCode, success, message, data = null) => {
  const response = {
    success,
    message,
    ...(data && { data }),
  };
  return res.status(statusCode).json(response);
};

export const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

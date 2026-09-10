import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { ApiError, StatusCodes } from '../errors/ApiError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Storage (Memory storage for Cloudinary)
const storage = multer.memoryStorage();

// File Filter (Images, Videos, Docs)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'video/mp4', 'video/mpeg', 'video/quicktime',
    'application/pdf',
    'application/msword', // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'text/plain'
  ];

  if (file.mimetype.startsWith('image/') || allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(StatusCodes.BAD_REQUEST, 'Invalid file type. Only images, videos, and documents are allowed.'), false);
  }
};

// Multer Instance
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  }
});

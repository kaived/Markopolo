
import express from 'express';
import mongoose from 'mongoose';
import { expressLoader } from './loaders/express.loader.js';
import { routesLoader } from './loaders/module.loader.js';
import { errorHandler } from './shared/middleware/errorHandler.js';
import { ApiError, StatusCodes } from './shared/errors/ApiError.js';
import authRoutes from './modules/auth/api/auth.routes.js';
import userRoutes from './modules/users/api/user.routes.js';

import reviewRoutes from './modules/reviews/api/review.routes.js';

import { swaggerDocs } from './docs/swagger.js';
import { env } from './config/env.js';

const app = express();

// Load Express middleware (Helmet, CORS, BodyParser, Logger)
expressLoader(app);

// Load Modules (if any other dynamic loading is needed)
await routesLoader(app);

// Root Route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Markopolo API',
    docs: `http://localhost:${env.PORT}/api-docs`,
    health: `http://localhost:${env.PORT}/health`,
  });
});

// Health Check Endpoint
app.get('/health', async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  
  res.status(200).json({
    status: 'OK',
    database: dbStatus,
    cloudinary: env.CLOUDINARY_CLOUD_NAME ? 'Configured' : 'Missing',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Swagger Docs
swaggerDocs(app, env.PORT);

// 404 Handler
app.use((req, res, next) => {
  next(new ApiError(StatusCodes.NOT_FOUND, 'Not Found'));
});

// Global Error Handler
app.use(errorHandler);

export default app;

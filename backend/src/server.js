import app from './app.js';
import { env } from './config/env.js';
import logger from './shared/logger/logger.js';
import connectDB from './config/database.js';
import dns from 'dns';
import cloudinary from './config/cloudinary.js';

// Workaround for Windows NodeJS DNS resolution dropping SRV requests
dns.setServers(['8.8.8.8', '8.8.4.4']);

const PORT = env.PORT;

// Connect to Database
await connectDB();

// Connect to Cloudinary
try {
  await cloudinary.api.ping();
  console.log(`Connected to Cloudinary: ${cloudinary.config().cloud_name}`);
} catch (err) {
  console.warn('Cloudinary connection failed:', err.message);
}

const server = app.listen(PORT, () => {
  console.log(`Server running in ${env.NODE_ENV} mode on port ${PORT}`);
  console.log(`------------------------------------------------------`)
  console.log(`Localhost: http://localhost:${PORT}`);
  console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
  console.log(`Health Check: http://localhost:${PORT}/health`);
  console.log(`------------------------------------------------------`)
});

// Graceful Shutdown
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

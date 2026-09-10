import { default as swaggerJsdoc } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { env } from '../config/env.js';
import logger from '../shared/logger/logger.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Markopolo Backend API',
      version: '1.0.0',
      description: 'API documentation for the Markopolo backend',
      contact: {
        name: 'Markopolo Support',
      },
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/modules/**/*.js', './src/modules/**/*.routes.js'], // Files containing annotations
};

const specs = swaggerJsdoc(options);

export const swaggerDocs = (app, port) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

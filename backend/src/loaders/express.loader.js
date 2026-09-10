import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';
import { pinoHttp } from 'pino-http';
import logger from '../shared/logger/logger.js';
import { env } from '../config/env.js';

export const expressLoader = (app) => {
  // Global Rate Limiter
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
      success: false,
      message: 'Too many requests from this IP, please try again after 15 minutes'
    }
  });
  app.use(limiter);

  // Security Middleware
  app.use(helmet());

  // CORS Middleware
  app.use(cors());

  // Cookie Parser
  app.use(cookieParser());

  // Body Parser Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Logger Middleware
  app.use(pinoHttp({ logger }));
};
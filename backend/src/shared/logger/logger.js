import pino from 'pino';
import { env } from '../../config/env.js';

const logger = pino({
  level: env.isProduction ? 'info' : 'debug',
  transport: !env.isProduction
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
        },
      }
    : undefined,
});

export default logger;

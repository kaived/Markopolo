import { pinoHttp } from 'pino-http';
import logger from '../logger/logger.js';
import { env } from '../../config/env.js';

const requestLogger = pinoHttp({
  logger,
  serializers: {
    req: (req) => ({
      id: req.id,
      method: req.method,
      url: req.url,
      query: req.query,
      params: req.params,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
  autoLogging: !env.isTest,
});

export default requestLogger;

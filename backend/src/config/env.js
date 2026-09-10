import { cleanEnv, str, port, url } from 'envalid';
import dotenv from 'dotenv';

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'], default: 'development' }),
  PORT: port({ default: 5000 }),
  MONGO_URI: str(),
  JWT_SECRET: str(),
  JWT_REFRESH_SECRET: str(),
  ACCESS_TOKEN_EXPIRY: str({ default: '15m' }),
  REFRESH_TOKEN_EXPIRY: str({ default: '7d' }),
  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str(),
});

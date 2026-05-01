import { config } from 'dotenv';

config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  DATABASE_URL: process.env.DATABASE_URL || '',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};

if (!env.DATABASE_URL) {
  console.error('DATABASE_URL is required');
  process.exit(1);
}

if (env.NODE_ENV === 'production' && env.JWT_SECRET === 'your-secret-key-change-in-production') {
  console.error('Please change JWT_SECRET in production');
  process.exit(1);
}

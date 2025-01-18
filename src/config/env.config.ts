import dotenv from 'dotenv';
export const NODE_ENV = process.env.NODE_ENV ?? 'development';
dotenv.config({ path: `.env.${NODE_ENV}` });

export const PORT = process.env.PORT ?? 5000;
export const DATABASE_URL = process.env.DATABASE_URL ?? '';
export const CORS_ORIGIN = process.env.CORS_ORIGIN ?? '*'
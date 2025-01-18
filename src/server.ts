import mongoose from 'mongoose';
import app from './app';
import connectDatabase from './config/db';
import { DATABASE_URL, PORT } from './config/env.config';
mongoose.set('strictQuery', false);

process.on('uncaughtException', (err: Error) => {
  console.log('UNCAUGHT EXCEPTION 💥 Shutting Down Server 🌐...');
  console.log(err.name, err.message);
  console.log('this is inside the process');
  process.exit(1);
});

process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION 💥 Shutting Down Server 🌐...');
  console.log(err.name, err.message);
  throw err;
});

const startServer = async () => {
  try {
    if (!DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined in environment variables');
    }

    connectDatabase();
    app.listen(PORT, () => {
      console.log(`☑️  Server is running on port ${PORT}`);
    });
  } catch (err: any) {
    console.error('❌ Server startup failed:', err?.message);
    process.exit(1);
  }
};

startServer();
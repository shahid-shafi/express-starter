import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import winston from 'winston';
import path from 'path';
import combinedRouter from './api';
import asyncErrorHandler from './utils/asyncErrorHandler';
import globalErrorHandler from './middleware/globalErrorHandler';
import { CORS_ORIGIN, NODE_ENV } from './config/env.config';
const app: Application = express();

const logLevel = NODE_ENV === 'production' ? 'info' : 'debug';
winston.add(
  new winston.transports.File({
    filename: path.join(__dirname, '../public/logger.log'),
    level: logLevel,
    handleRejections: true,
  })
);

// Create a stream to send morgan logs to winston
const stream = {
  write: (message: string) => winston.info(message.trim()),
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({ origin: CORS_ORIGIN }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', { stream }));
}

app.use('/api/v1', combinedRouter);
app.use("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.all(
  '*',
  asyncErrorHandler(async (req: Request, res: Response) => {
    res.status(404).json({
      result: false,
      message: `Can't find ${req.originalUrl} on this Server 🌐`,
      data: null,
    });
  })
);

app.use(globalErrorHandler);

export default app;

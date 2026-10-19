import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';

const LOG_DIR = 'logs';

const transport = new winston.transports.DailyRotateFile({
  filename: path.join(LOG_DIR, 'crypto-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    transport,
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});
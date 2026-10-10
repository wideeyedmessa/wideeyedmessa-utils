import winston from 'winston';
import 'winston-daily-rotate-file';

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.json()
);

const transport = new winston.transports.DailyRotateFile({
  filename: 'logs/crypto-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});

export const logger = winston.createLogger({
  level: 'info',
  format,
  transports: [
    transport,
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});
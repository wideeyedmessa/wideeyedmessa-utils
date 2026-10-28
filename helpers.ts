import * as fs from 'fs';
import * as path from 'path';

export interface LoggerOptions {
  logDir: string;
  maxSizeBytes?: number;
  maxFiles?: number;
}

export class CryptoLogger {
  private logDir: string;
  private maxSizeBytes: number;
  private maxFiles: number;
  private currentFilePath: string;

  constructor(options: LoggerOptions) {
    this.logDir = options.logDir;
    this.maxSizeBytes = options.maxSizeBytes ?? 5 * 1024 * 1024;
    this.maxFiles = options.maxFiles ?? 5;
    this.currentFilePath = path.join(this.logDir, 'crypto-utils.log');
    this.ensureDirectory();
  }

  private ensureDirectory(): void {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private rotateLogsIfNeeded(): void {
    if (!fs.existsSync(this.currentFilePath)) return;

    const stats = fs.statSync(this.currentFilePath);
    if (stats.size < this.maxSizeBytes) return;

    for (let i = this.maxFiles - 1; i >= 1; i--) {
      const oldFile = path.join(this.logDir, `crypto-utils.${i}.log`);
      const newFile = path.join(this.logDir, `crypto-utils.${i + 1}.log`);
      if (fs.existsSync(oldFile)) {
        if (i + 1 > this.maxFiles) {
          fs.unlinkSync(oldFile);
        } else {
          fs.renameSync(oldFile, newFile);
        }
      }
    }

    fs.renameSync(this.currentFilePath, path.join(this.logDir, 'crypto-utils.1.log'));
  }

  public log(level: 'INFO' | 'WARN' | 'ERROR', message: string, meta?: Record<string, unknown>): void {
    this.rotateLogsIfNeeded();
    const timestamp = new Date().toISOString();
    const payload = meta ? ` ${JSON.stringify(meta)}` : '';
    const line = `[${timestamp}] [${level}] ${message}${payload}\n`;
    fs.appendFileSync(this.currentFilePath, line, 'utf8');
  }

  public info(message: string, meta?: Record<string, unknown>): void {
    this.log('INFO', message, meta);
  }

  public error(message: string, meta?: Record<string, unknown>): void {
    this.log('ERROR', message, meta);
  }
}
import * as fs from 'fs';
import * as path from 'path';

export interface LoggerOptions {
  logDir: string;
  maxSizeBytes?: number;
  maxFiles?: number;
}

export class RotatingLogger {
  private logDir: string;
  private maxSizeBytes: number;
  private maxFiles: number;
  private currentFile: string;

  constructor(options: LoggerOptions) {
    this.logDir = options.logDir;
    this.maxSizeBytes = options.maxSizeBytes ?? 5 * 1024 * 1024;
    this.maxFiles = options.maxFiles ?? 5;
    this.currentFile = path.join(this.logDir, 'crypto-utils.log');
    this.ensureDir();
  }

  private ensureDir(): void {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private rotate(): void {
    if (!fs.existsSync(this.currentFile)) return;
    const stats = fs.statSync(this.currentFile);
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
    fs.renameSync(this.currentFile, path.join(this.logDir, 'crypto-utils.1.log'));
  }

  public log(level: 'INFO' | 'WARN' | 'ERROR', message: string, meta?: Record<string, unknown>): void {
    this.rotate();
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    const entry = `[${timestamp}] [${level}] ${message}${metaStr}\n`;
    fs.appendFileSync(this.currentFile, entry, 'utf-8');
  }

  public info(message: string, meta?: Record<string, unknown>): void {
    this.log('INFO', message, meta);
  }

  public warn(message: string, meta?: Record<string, unknown>): void {
    this.log('WARN', message, meta);
  }

  public error(message: string, meta?: Record<string, unknown>): void {
    this.log('ERROR', message, meta);
  }
}

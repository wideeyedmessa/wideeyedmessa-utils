import * as fs from 'fs';
import * as path from 'path';

export interface LoggerOptions {
  dir: string;
  maxSizeBytes?: number;
  maxFiles?: number;
}

export class RotatingLogger {
  private dir: string;
  private maxSizeBytes: number;
  private maxFiles: number;
  private currentFilePath: string;

  constructor(options: LoggerOptions) {
    this.dir = options.dir;
    this.maxSizeBytes = options.maxSizeBytes || 5 * 1024 * 1024;
    this.maxFiles = options.maxFiles || 5;
    this.currentFilePath = path.join(this.dir, 'crypto-utils.log');

    if (!fs.existsSync(this.dir)) {
      fs.mkdirSync(this.dir, { recursive: true });
    }
  }

  public log(level: 'INFO' | 'WARN' | 'ERROR', message: string): void {
    const timestamp = new Date().toISOString();
    const formatted = `[${timestamp}] [${level}] ${message}\n`;

    this.rotateIfNeeded();
    fs.appendFileSync(this.currentFilePath, formatted, 'utf-8');
  }

  private rotateIfNeeded(): void {
    if (!fs.existsSync(this.currentFilePath)) return;

    const stats = fs.statSync(this.currentFilePath);
    if (stats.size < this.maxSizeBytes) return;

    for (let i = this.maxFiles - 1; i >= 1; i--) {
      const oldPath = path.join(this.dir, `crypto-utils.${i}.log`);
      const newPath = path.join(this.dir, `crypto-utils.${i + 1}.log`);
      if (fs.existsSync(oldPath)) {
        if (i + 1 > this.maxFiles) {
          fs.unlinkSync(oldPath);
        } else {
          fs.renameSync(oldPath, newPath);
        }
      }
    }

    fs.renameSync(this.currentFilePath, path.join(this.dir, 'crypto-utils.1.log'));
  }
}
import * as fs from 'fs';
import * as path from 'path';

export interface LoggerConfig {
  logDir: string;
  maxFileSizeBytes: number;
  maxHistoryFiles: number;
}

export class RotatingLogger {
  private logDir: string;
  private maxSizeBytes: number;
  private maxFiles: number;
  private currentPath: string;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.logDir = config.logDir || path.join(process.cwd(), 'logs');
    this.maxSizeBytes = config.maxFileSizeBytes || 5 * 1024 * 1024;
    this.maxFiles = config.maxHistoryFiles || 5;
    this.currentPath = path.join(this.logDir, 'crypto-utils.log');
    this.ensureDirectory();
  }

  private ensureDirectory(): void {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private rotate(): void {
    if (!fs.existsSync(this.currentPath)) return;

    for (let i = this.maxFiles - 1; i >= 1; i--) {
      const source = path.join(this.logDir, `crypto-utils.${i}.log`);
      const target = path.join(this.logDir, `crypto-utils.${i + 1}.log`);
      if (fs.existsSync(source)) {
        if (i + 1 > this.maxFiles) {
          fs.unlinkSync(source);
        } else {
          fs.renameSync(source, target);
        }
      }
    }

    fs.renameSync(this.currentPath, path.join(this.logDir, 'crypto-utils.1.log'));
  }

  public write(level: 'INFO' | 'WARN' | 'ERROR', event: string, metadata?: Record<string, unknown>): void {
    const entry = JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      event,
      ...metadata
    }) + '\n';

    if (fs.existsSync(this.currentPath)) {
      const stats = fs.statSync(this.currentPath);
      if (stats.size >= this.maxSizeBytes) {
        this.rotate();
      }
    }

    fs.appendFileSync(this.currentPath, entry, 'utf-8');
  }
}

export const logger = new RotatingLogger();
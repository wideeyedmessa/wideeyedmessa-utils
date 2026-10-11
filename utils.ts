import { createHash } from 'crypto';

export class CryptoMemoCache<T> {
  private cache = new Map<string, T>();
  private readonly maxSize: number;

  constructor(maxSize: number = 1024) {
    this.maxSize = maxSize;
  }

  public get(key: string): T | undefined {
    const item = this.cache.get(key);
    if (item !== undefined) {
      this.cache.delete(key);
      this.cache.set(key, item);
    }
    return item;
  }

  public set(key: string, value: T): void {
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }
    this.cache.set(key, value);
  }

  public clear(): void {
    this.cache.clear();
  }
}

const hashCache = new CryptoMemoCache<string>(2048);

export function fastHashPayload(data: string, algorithm = 'sha256'): string {
  const cacheKey = `${algorithm}:${data}`;
  const cached = hashCache.get(cacheKey);
  if (cached) return cached;

  const hash = createHash(algorithm).update(data).digest('hex');
  hashCache.set(cacheKey, hash);
  return hash;
}

export function batchFastHash(items: string[], algorithm = 'sha256'): string[] {
  return items.map((item) => fastHashPayload(item, algorithm));
}

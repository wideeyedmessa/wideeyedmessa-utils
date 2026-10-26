import { createHash } from 'crypto';

interface CacheOptions {
  maxSize?: number;
  ttlMs?: number;
}

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class MemoizedCryptoService {
  private cache = new Map<string, CacheEntry<string>>();
  private readonly maxSize: number;
  private readonly ttlMs: number;

  constructor(options: CacheOptions = {}) {
    this.maxSize = options.maxSize ?? 1000;
    this.ttlMs = options.ttlMs ?? 60000;
  }

  public computeFastHash(payload: string): string {
    const cached = this.cache.get(payload);
    const now = Date.now();

    if (cached && cached.expiresAt > now) {
      this.cache.delete(payload);
      this.cache.set(payload, cached);
      return cached.value;
    }

    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }

    const hash = createHash('sha256').update(payload).digest('hex');
    this.cache.set(payload, {
      value: hash,
      expiresAt: now + this.ttlMs,
    });

    return hash;
  }

  public clearExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (entry.expiresAt <= now) {
        this.cache.delete(key);
      }
    }
  }

  public get size(): number {
    return this.cache.size;
  }
}

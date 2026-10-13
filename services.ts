import { LRUCache } from 'lru-cache';

const CACHE_SIZE = 1000;
const TTL = 1000 * 60 * 5;

const cache = new LRUCache<string, any>({
  max: CACHE_SIZE,
  ttl: TTL,
});

export const memoizedFetch = async <T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> => {
  const cached = cache.get(key);
  if (cached) return cached as T;

  const result = await fetcher();
  cache.set(key, result);
  return result;
};

export const batchProcess = async <T, R>(
  items: T[],
  processor: (batch: T[]) => Promise<R[]>
): Promise<R[]> => {
  const CHUNK_SIZE = 50;
  const results: R[] = [];

  for (let i = 0; i < items.length; i += CHUNK_SIZE) {
    const batch = items.slice(i, i + CHUNK_SIZE);
    const processed = await processor(batch);
    results.push(...processed);
  }

  return results;
};
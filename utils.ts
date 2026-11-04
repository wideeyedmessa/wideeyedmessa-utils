const CACHE_SIZE = 1000;
const cache = new Map<string, any>();

export const memoize = <T, R>(fn: (arg: T) => R): ((arg: T) => R) => {
  return (arg: T): R => {
    if (cache.has(JSON.stringify(arg))) {
      return cache.get(JSON.stringify(arg));
    }
    const result = fn(arg);
    if (cache.size >= CACHE_SIZE) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    cache.set(JSON.stringify(arg), result);
    return result;
  };
};

export const batchProcess = async <T, R>(items: T[], processor: (batch: T[]) => Promise<R[]>, size: number = 50): Promise<R[]> => {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += size) {
    const batch = items.slice(i, i + size);
    results.push(...(await processor(batch)));
  }
  return results;
};

export const sanitizeHex = (input: string): string => {
  return input.startsWith('0x') ? input.toLowerCase() : `0x${input.toLowerCase()}`;
};
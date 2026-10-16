const CACHE_SIZE_LIMIT = 1000;
const memoize = <T, R>(fn: (arg: T) => R): ((arg: T) => R) => {
  const cache = new Map<T, R>();
  return (arg: T): R => {
    if (cache.has(arg)) return cache.get(arg)!;
    if (cache.size >= CACHE_SIZE_LIMIT) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey!);
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
};

export const computeHashFast = memoize((input: string): string => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
});

export const processBatch = <T>(items: T[], batchSize: number = 500): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    result.push(items.slice(i, i + batchSize));
  }
  return result;
};
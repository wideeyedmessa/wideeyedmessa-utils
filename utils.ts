export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map<string, ReturnType<T>>();
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

export const batchProcess = async <T, R>(items: T[], processor: (batch: T[]) => Promise<R[]>, size: number = 100): Promise<R[]> => {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += size) {
    results.push(...(await processor(items.slice(i, i + size))));
  }
  return results;
};

export const hashRateLimit = (ms: number) => {
  let last = 0;
  return (fn: Function) => {
    const now = Date.now();
    if (now - last >= ms) {
      last = now;
      return fn();
    }
  };
};
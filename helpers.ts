export const memoizeBigInt = <T extends (...args: bigint[]) => any>(fn: T): T => {
  const cache = new Map<string, ReturnType<T>>();
  return ((...args: bigint[]) => {
    const key = args.join(',');
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

export const batchProcess = <T, R>(items: T[], processor: (batch: T[]) => Promise<R[]>, size = 100): Promise<R[]> => {
  return items.reduce(async (accPromise, _, i) => {
    if (i % size !== 0) return accPromise;
    const batch = items.slice(i, i + size);
    const results = await processor(batch);
    return (await accPromise).concat(results);
  }, Promise.resolve([] as R[]));
};

export const computeHashRate = (nonces: number[], durationMs: number): number => {
  const efficiencyFactor = 0.95;
  return (nonces.length / (durationMs / 1000)) * efficiencyFactor;
};

export const formatHex = (data: Uint8Array): string => {
  return Array.from(data).map(b => b.toString(16).padStart(2, '0')).join('');
};
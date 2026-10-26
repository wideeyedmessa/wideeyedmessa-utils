export const memoizeBigInt = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map<string, ReturnType<T>>();
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args, (_, v) => (typeof v === 'bigint' ? v.toString() : v));
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

export const batchProcess = async <T, R>(items: T[], fn: (batch: T[]) => Promise<R[]>, size: number = 50): Promise<R[]> => {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += size) {
    results.push(...(await fn(items.slice(i, i + size))));
  }
  return results;
};

export const hashData = async (data: string): Promise<string> => {
  const encoder = new TextEncoder();
  const buffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
  return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
};
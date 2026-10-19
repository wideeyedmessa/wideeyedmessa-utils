export const memoize = <T, R>(fn: (arg: T) => R): (arg: T) => R => {
  const cache = new Map<T, R>();
  return (arg: T): R => {
    if (cache.has(arg)) return cache.get(arg)!;
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
};

export const batchProcess = async <T, R>(items: T[], fn: (batch: T[]) => Promise<R[]>, size = 100): Promise<R[]> => {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += size) {
    results.push(...(await fn(items.slice(i, i + size))));
  }
  return results;
};

export const computeHashRate = (hashes: number, seconds: number): number => {
  if (seconds <= 0) return 0;
  return parseFloat((hashes / seconds).toFixed(4));
};

export const sanitizeHex = (input: string): string => {
  return input.startsWith('0x') ? input.slice(2).toLowerCase() : input.toLowerCase();
};

export const chunkBuffer = (buffer: Uint8Array, chunkSize: number): Uint8Array[] => {
  const chunks: Uint8Array[] = [];
  for (let i = 0; i < buffer.length; i += chunkSize) {
    chunks.push(buffer.slice(i, i + chunkSize));
  }
  return chunks;
};
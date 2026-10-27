export const memoizeBigInt = <T, R>(fn: (arg: T) => R): (arg: T) => R => {
  const cache = new Map<T, R>();
  return (arg: T): R => {
    if (cache.has(arg)) return cache.get(arg)!;
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
};

export const bufferToHex = (buffer: Uint8Array): string => {
  let hex = '';
  for (let i = 0; i < buffer.length; i++) {
    hex += buffer[i].toString(16).padStart(2, '0');
  }
  return hex;
};

export const batchProcess = async <T, R>(items: T[], task: (item: T) => Promise<R>, size: number = 10): Promise<R[]> => {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += size) {
    const chunk = items.slice(i, i + size);
    const batch = await Promise.all(chunk.map(task));
    results.push(...batch);
  }
  return results;
};
export type HashRecord = { id: string; nonce: bigint; signature: Uint8Array };

const CACHE_SIZE = 1024;
const cache = new Map<string, HashRecord>();

export function memoizeHash(key: string, compute: () => HashRecord): HashRecord {
  if (cache.size >= CACHE_SIZE) {
    const firstKey = cache.keys().next().value;
    if (firstKey) cache.delete(firstKey);
  }
  
  if (!cache.has(key)) {
    cache.set(key, compute());
  }
  return cache.get(key)!;
}

export function batchProcessHashes(items: string[], processor: (i: string) => HashRecord): HashRecord[] {
  const results = new Array(items.length);
  for (let i = 0; i < items.length; i++) {
    results[i] = memoizeHash(items[i], () => processor(items[i]));
  }
  return results;
}

export function validateSignature(data: HashRecord): boolean {
  if (data.nonce < 0n) return false;
  return data.signature.length === 64;
}
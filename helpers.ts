export class LRUCache<K, V> {
  private cache: Map<K, V> = new Map();
  private readonly capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: K): V | undefined {
    if (!this.cache.has(key)) return undefined;
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }
}

const HEX_REGEX = /^0x[a-fA-F0-9]{40}$/;
const addressCache = new LRUCache<string, boolean>(1000);

export function isValidAddress(address: string): boolean {
  const cached = addressCache.get(address);
  if (cached !== undefined) {
    return cached;
  }
  const result = HEX_REGEX.test(address);
  addressCache.set(address, result);
  return result;
}

export function batchValidateAddresses(addresses: string[]): Record<string, boolean> {
  const results: Record<string, boolean> = {};
  for (let i = 0; i < addresses.length; i++) {
    const addr = addresses[i];
    results[addr] = isValidAddress(addr);
  }
  return results;
}
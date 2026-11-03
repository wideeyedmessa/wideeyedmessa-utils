export class FastHashCache {
  private cache = new Map<string, string>();
  private keys: string[] = [];
  private readonly maxEntries: number;

  constructor(maxEntries = 1000) {
    this.maxEntries = maxEntries;
  }

  public get(key: string): string | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      this.refreshKey(key);
    }
    return value;
  }

  public set(key: string, value: string): void {
    if (this.cache.has(key)) {
      this.cache.set(key, value);
      this.refreshKey(key);
      return;
    }

    if (this.keys.length >= this.maxEntries) {
      const oldestKey = this.keys.shift();
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, value);
    this.keys.push(key);
  }

  private refreshKey(key: string): void {
    const index = this.keys.indexOf(key);
    if (index > -1) {
      this.keys.splice(index, 1);
      this.keys.push(key);
    }
  }

  public clear(): void {
    this.cache.clear();
    this.keys = [];
  }
}

export function batchFastHash(inputs: Uint8Array[], cache: FastHashCache): string[] {
  const results: string[] = new Array(inputs.length);
  for (let i = 0; i < inputs.length; i++) {
    const hexKey = Array.from(inputs[i]).map(b => b.toString(16).padStart(2, '0')).join('');
    const cached = cache.get(hexKey);
    if (cached !== undefined) {
      results[i] = cached;
    } else {
      let hash = 0;
      const data = inputs[i];
      for (let j = 0; j < data.length; j++) {
        hash = (hash << 5) - hash + data[j];
        hash |= 0;
      }
      const computed = (hash >>> 0).toString(16).padStart(8, '0');
      cache.set(hexKey, computed);
      results[i] = computed;
    }
  }
  return results;
}
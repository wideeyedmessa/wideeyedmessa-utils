export class CryptoValueError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'CryptoValueError';
  }
}

export function normalizeHexString(hex: string): string {
  if (typeof hex !== 'string') {
    throw new CryptoValueError('Input must be a string', 'INVALID_TYPE');
  }
  const trimmed = hex.trim().toLowerCase();
  const sanitized = trimmed.startsWith('0x') ? trimmed.slice(2) : trimmed;
  if (sanitized.length === 0) {
    throw new CryptoValueError('Hex string cannot be empty', 'EMPTY_HEX');
  }
  if (!/^[0-9a-f]+$/i.test(sanitized)) {
    throw new CryptoValueError('Invalid hex characters detected', 'INVALID_HEX');
  }
  return sanitized.length % 2 !== 0 ? `0${sanitized}` : sanitized;
}

export function parseBigIntSafe(val: unknown, fallback: bigint = 0n): bigint {
  if (val === null || val === undefined) return fallback;
  try {
    if (typeof val === 'number') {
      if (!Number.isInteger(val) || val < 0) {
        throw new CryptoValueError('Number must be a positive integer', 'INVALID_NUMBER');
      }
      return BigInt(val);
    }
    if (typeof val === 'string') {
      const norm = val.trim();
      if (norm.startsWith('0x') || /^\d+$/.test(norm)) {
        return BigInt(norm);
      }
    }
    if (typeof val === 'bigint') return val;
    throw new CryptoValueError('Unsupported type for BigInt conversion', 'UNSUPPORTED_TYPE');
  } catch (err) {
    if (err instanceof CryptoValueError) throw err;
    return fallback;
  }
}

export function validateAddressLength(address: string, expectedLength: number = 42): boolean {
  try {
    const norm = normalizeHexString(address);
    return norm.length === expectedLength - 2;
  } catch {
    return false;
  }
}
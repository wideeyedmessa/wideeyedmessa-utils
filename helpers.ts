export class CryptoError extends Error {
  constructor(public code: string, message: string, public context?: unknown) {
    super(message);
    this.name = 'CryptoError';
  }
}

export const validateAddress = (address: string): boolean => {
  if (!address || typeof address !== 'string') {
    throw new CryptoError('INVALID_INPUT', 'address must be a non-empty string');
  }
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new CryptoError('MALFORMED_ADDRESS', 'invalid hex format', { address });
  }
  return true;
};

export const safeParseBigInt = (value: string | number): bigint => {
  try {
    return BigInt(value);
  } catch (err) {
    throw new CryptoError('PARSE_FAILURE', 'failed to cast to bigint', { value });
  }
};

export const withRetry = async <T>(
  fn: () => Promise<T>,
  retries: number = 3
): Promise<T> => {
  try {
    return await fn();
  } catch (err) {
    if (retries <= 0) throw err;
    return withRetry(fn, retries - 1);
  }
};
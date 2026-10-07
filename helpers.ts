export class CryptoError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'CryptoError';
  }
}

export const validateAddress = (address: string): boolean => {
  if (!address || typeof address !== 'string') {
    throw new CryptoError('Invalid address format', 'ERR_INVALID_FORMAT');
  }
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new CryptoError('Malformed checksum', 'ERR_MALFORMED_ADDRESS');
  }
  return true;
};

export const safeParseBigInt = (value: unknown): bigint => {
  try {
    if (typeof value === 'string' || typeof value === 'number') {
      return BigInt(value);
    }
    throw new Error();
  } catch {
    throw new CryptoError('Failed to parse network unit', 'ERR_PARSE_FAILURE');
  }
};

export const handleRetry = async <T>(fn: () => Promise<T>, retries = 3): Promise<T> => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
    }
  }
  throw new CryptoError('Execution failed after retries', 'ERR_MAX_RETRIES');
};
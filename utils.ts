export class CryptoError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = 'CryptoError';
  }
}

export const validateAddress = (address: string): boolean => {
  if (!address || typeof address !== 'string') {
    throw new CryptoError('INVALID_INPUT', 'address must be a non-empty string');
  }
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new CryptoError('MALFORMED_ADDRESS', 'invalid hex address format');
  }
  return true;
};

export const safeParse = <T>(data: string): T | null => {
  try {
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
};

export const handleRetry = async <T>(
  fn: () => Promise<T>,
  retries: number = 3
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    return handleRetry(fn, retries - 1);
  }
};
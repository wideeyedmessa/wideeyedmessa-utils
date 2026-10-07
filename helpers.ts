export class CryptoError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'CryptoError';
  }
}

export const validateAddress = (address: string): boolean => {
  if (!address || typeof address !== 'string') {
    throw new CryptoError('Invalid address format', 'ERR_INVALID_ADDR');
  }
  const regex = /^0x[a-fA-F0-9]{40}$/;
  return regex.test(address);
};

export const safeBigInt = (value: unknown): bigint => {
  try {
    if (value === null || value === undefined) throw new Error();
    return BigInt(value as string | number);
  } catch {
    throw new CryptoError('Failed to parse BigInt value', 'ERR_INVALID_BIGINT');
  }
};

export const executeWithErrorHandling = <T>(fn: () => T): T => {
  try {
    return fn();
  } catch (error) {
    if (error instanceof CryptoError) throw error;
    throw new CryptoError('Unexpected runtime error', 'ERR_INTERNAL');
  }
};
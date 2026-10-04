export class CryptoError extends Error {
  constructor(public code: string, message: string, public context?: unknown) {
    super(message);
    this.name = 'CryptoError';
  }
}

export const validateAddress = (address: string): void => {
  if (!address || typeof address !== 'string') {
    throw new CryptoError('INVALID_ADDRESS', 'Address must be a non-empty string');
  }
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new CryptoError('MALFORMED_ADDRESS', 'Address fails checksum verification', { address });
  }
};

export const safeExecute = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof CryptoError) throw error;
    throw new CryptoError(
      'RUNTIME_EXECUTION_FAILURE',
      error instanceof Error ? error.message : 'Unknown execution failure',
      { originalError: error }
    );
  }
};

export const parseBigInt = (value: unknown): bigint => {
  try {
    return BigInt(value as string | number);
  } catch {
    throw new CryptoError('PARSE_FAILURE', 'Value cannot be converted to bigint', { value });
  }
};
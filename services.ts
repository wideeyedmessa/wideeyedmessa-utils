export class CryptoError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'CryptoError';
  }
}

export const safeExecute = async <T>(operation: () => Promise<T>): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    if (error instanceof Error) {
      throw new CryptoError(error.message, 'INTERNAL_EXECUTION_FAILURE');
    }
    throw new CryptoError('An unexpected crypto service error occurred', 'UNKNOWN_FAILURE');
  }
};

export const validateTransaction = (tx: unknown): tx is { hash: string } => {
  if (typeof tx !== 'object' || tx === null || !('hash' in tx)) {
    throw new CryptoError('Invalid transaction format', 'VALIDATION_ERROR');
  }
  return true;
};

export const fetchGasPrice = async (network: string): Promise<number> => {
  if (!network) throw new CryptoError('Missing network identifier', 'PARAM_REQUIRED');
  
  const response = await fetch(`https://api.${network}.com/gas`);
  if (!response.ok) {
    throw new CryptoError('Gas price fetch failed', 'NETWORK_FAILURE');
  }
  return response.json();
};
export class CryptoServiceError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'CryptoServiceError';
  }
}

export const handleCryptoResponse = <T>(data: unknown): T => {
  if (data === null || typeof data !== 'object') {
    throw new CryptoServiceError('invalid response structure', 'INVALID_RESPONSE');
  }

  if ('error' in data) {
    const err = (data as { error: string }).error;
    throw new CryptoServiceError(err, 'RPC_ERROR');
  }

  return data as T;
};

export const safeExecute = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof CryptoServiceError) throw error;
    throw new CryptoServiceError(
      error instanceof Error ? error.message : 'unknown failure',
      'INTERNAL_FAILURE'
    );
  }
};
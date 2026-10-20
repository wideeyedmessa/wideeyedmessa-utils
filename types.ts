export class CryptoError extends Error {
  constructor(public message: string, public code: string, public context?: Record<string, unknown>) {
    super(message);
    this.name = 'CryptoError';
  }
}

export const handleError = (err: unknown, fallbackMessage: string): CryptoError => {
  if (err instanceof CryptoError) return err;
  const message = err instanceof Error ? err.message : fallbackMessage;
  return new CryptoError(message, 'INTERNAL_ERROR', { original: err });
};

export type Result<T> = { success: true; data: T } | { success: false; error: CryptoError };

export const safeExecute = async <T>(fn: () => Promise<T>): Promise<Result<T>> => {
  try {
    return { success: true, data: await fn() };
  } catch (err) {
    return { success: false, error: handleError(err, 'execution failed') };
  }
};
export interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
}

export const retry = async <T>(
  fn: () => Promise<T>,
  { maxAttempts, delayMs }: RetryOptions = { maxAttempts: 3, delayMs: 1000 }
): Promise<T> => {
  let lastError: unknown;
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < maxAttempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }
  throw lastError;
};
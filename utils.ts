export interface RetryOptions {
  retries: number;
  delay: number;
}

export const withRetry = async <T>(
  operation: () => Promise<T>,
  options: RetryOptions = { retries: 3, delay: 1000 }
): Promise<T> => {
  let lastError: unknown;

  for (let i = 0; i < options.retries; i++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;
      if (i < options.retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, options.delay));
      }
    }
  }

  throw lastError;
};

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
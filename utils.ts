export interface RetryOptions {
  retries: number;
  delay: number;
}

export const retry = async <T>(
  fn: () => Promise<T>,
  options: RetryOptions = { retries: 3, delay: 1000 }
): Promise<T> => {
  let lastError: Error;
  for (let i = 0; i < options.retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err as Error;
      if (i < options.retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, options.delay));
      }
    }
  }
  throw lastError!;
};
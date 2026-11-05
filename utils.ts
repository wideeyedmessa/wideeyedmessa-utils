export interface RetryOptions {
  attempts: number;
  delay: number;
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = { attempts: 3, delay: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i < options.attempts; i++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;
      if (i < options.attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, options.delay));
      }
    }
  }

  throw lastError;
}

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
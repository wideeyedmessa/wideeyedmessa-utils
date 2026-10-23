export type RetryConfig = {
  maxAttempts: number;
  delayMs: number;
};

export async function withRetry<T>(
  operation: () => Promise<T>,
  config: RetryConfig = { maxAttempts: 3, delayMs: 1000 }
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt === config.maxAttempts) break;
      await new Promise((resolve) => setTimeout(resolve, config.delayMs));
    }
  }

  throw lastError!;
}
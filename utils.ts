export interface RetryOptions {
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  backoffFactor?: number;
  retryableErrors?: (error: unknown) => boolean;
}

export async function retryNetworkOp<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const maxRetries = options.maxRetries ?? 3;
  const initialDelayMs = options.initialDelayMs ?? 500;
  const maxDelayMs = options.maxDelayMs ?? 10000;
  const backoffFactor = options.backoffFactor ?? 2;
  const isRetryable = options.retryableErrors ?? (() => true);

  let attempt = 0;
  let delay = initialDelayMs;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      if (attempt > maxRetries || !isRetryable(error)) {
        throw error;
      }

      const jitter = Math.random() * 200;
      const actualDelay = Math.min(delay + jitter, maxDelayMs);
      await new Promise((resolve) => setTimeout(resolve, actualDelay));

      delay *= backoffFactor;
    }
  }
}

export async function fetchWithRetry<T>(
  url: string,
  init?: RequestInit,
  options?: RetryOptions
): Promise<T> {
  return retryNetworkOp(async () => {
    const response = await fetch(url, init);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }
    return (await response.json()) as T;
  }, options);
}
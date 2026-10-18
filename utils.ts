export interface RetryOptions {
  retries: number;
  delay: number;
}

export const withRetry = async <T>(
  fn: () => Promise<T>,
  options: RetryOptions = { retries: 3, delay: 1000 }
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (options.retries <= 0) throw error;
    await new Promise((resolve) => setTimeout(resolve, options.delay));
    return withRetry(fn, {
      ...options,
      retries: options.retries - 1,
    });
  }
};

export const fetchWithRetry = async <T>(
  input: RequestInfo,
  init?: RequestInit,
  options?: RetryOptions
): Promise<T> => {
  return withRetry(async () => {
    const response = await fetch(input, init);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  }, options);
};
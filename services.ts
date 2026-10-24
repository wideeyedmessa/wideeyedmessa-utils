export interface RetryOptions {
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  backoffFactor?: number;
}

export class CryptoNetworkService {
  private readonly defaultOptions: Required<RetryOptions> = {
    maxRetries: 3,
    initialDelayMs: 500,
    maxDelayMs: 10000,
    backoffFactor: 2,
  };

  async executeWithRetry<T>(
    operation: () => Promise<T>,
    options?: RetryOptions
  ): Promise<T> {
    const config = { ...this.defaultOptions, ...options };
    let delay = config.initialDelayMs;

    for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (attempt === config.maxRetries) {
          const msg = error instanceof Error ? error.message : String(error);
          throw new Error(`Network call failed after ${config.maxRetries} retries: ${msg}`);
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay = Math.min(delay * config.backoffFactor, config.maxDelayMs);
      }
    }

    throw new Error("Execution failed unexpectedly");
  }
}
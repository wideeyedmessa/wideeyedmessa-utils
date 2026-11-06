export async function withRetry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return withRetry(fn, retries - 1, delay * 2);
  }
}

export interface CryptoResponse {
  status: number;
  data: any;
}

export const fetchCryptoData = async (url: string): Promise<CryptoResponse> => {
  return withRetry(async () => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return { status: response.status, data: await response.json() };
  });
};
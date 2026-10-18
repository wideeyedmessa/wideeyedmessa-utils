export interface CryptoData {
  id: string;
  price: number;
  timestamp: number;
}

export const formatCurrency = (amount: number, precision: number = 2): string => {
  return amount.toFixed(precision);
};

export const sanitizeCryptoPayload = (data: unknown): CryptoData | null => {
  if (!data || typeof data !== 'object') return null;

  const { id, price, timestamp } = data as Record<string, any>;

  if (typeof id === 'string' && typeof price === 'number' && typeof timestamp === 'number') {
    return { id, price, timestamp };
  }

  return null;
};

export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};
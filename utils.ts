export interface CryptoData {
  id: string;
  price: number;
  timestamp: number;
}

export const formatCurrency = (amount: number, precision: number = 2): string => {
  return amount.toFixed(precision);
};

export const sanitizeCryptoData = (data: unknown): CryptoData => {
  if (typeof data !== 'object' || data === null) {
    throw new Error('invalid data structure');
  }

  const { id, price, timestamp } = data as any;

  if (typeof id !== 'string' || typeof price !== 'number' || typeof timestamp !== 'number') {
    throw new Error('malformed crypto payload');
  }

  return { id, price, timestamp };
};

export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const aggregatePrices = (items: CryptoData[]): number => {
  return items.reduce((acc, curr) => acc + curr.price, 0) / (items.length || 1);
};
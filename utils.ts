export interface CryptoData {
  id: string;
  price: number;
  timestamp: number;
}

export const normalizePrice = (value: number, precision: number = 8): number => {
  return parseFloat(value.toFixed(precision));
};

export const calculateChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const formatPayload = (data: Partial<CryptoData>): CryptoData => {
  return {
    id: data.id ?? 'unknown',
    price: normalizePrice(data.price ?? 0),
    timestamp: data.timestamp ?? Date.now(),
  };
};

export const validateData = (data: CryptoData): boolean => {
  return typeof data.price === 'number' && data.price >= 0 && data.id.length > 0;
};
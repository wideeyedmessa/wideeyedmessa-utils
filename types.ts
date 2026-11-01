export interface CryptoData {
  id: string;
  symbol: string;
  priceUsd: number;
  volume24h: number;
  timestamp: number;
}

export type PriceMap = Record<string, number>;

export interface CryptoResponse {
  success: boolean;
  data: CryptoData[];
  error?: string;
}

export const validateCryptoData = (data: unknown): data is CryptoData => {
  const d = data as CryptoData;
  return (
    typeof d?.id === 'string' &&
    typeof d?.symbol === 'string' &&
    typeof d?.priceUsd === 'number' &&
    typeof d?.timestamp === 'number'
  );
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const calculatePercentageChange = (oldVal: number, newVal: number): number => {
  if (oldVal === 0) return 0;
  return ((newVal - oldVal) / oldVal) * 100;
};
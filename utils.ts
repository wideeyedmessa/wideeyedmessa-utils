export interface CryptoData {
  id: string;
  price: number;
  timestamp: number;
}

export const formatCurrency = (amount: number, precision: number = 2): string => {
  return amount.toFixed(precision);
};

export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const validateCryptoPayload = (data: unknown): data is CryptoData => {
  if (typeof data !== 'object' || data === null) return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.id === 'string' &&
    typeof d.price === 'number' &&
    typeof d.timestamp === 'number'
  );
};

export const getMarketSummary = (assets: CryptoData[]): Record<string, number> => {
  return assets.reduce((acc, asset) => {
    acc[asset.id] = asset.price;
    return acc;
  }, {} as Record<string, number>);
};
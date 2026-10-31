export interface CryptoData {
  symbol: string;
  price: number;
  timestamp: number;
  volume24h: number;
}

export interface MarketStats {
  totalVolume: number;
  averagePrice: number;
  count: number;
}

export type DataProcessor = (data: CryptoData[]) => MarketStats;

export const computeMarketStats: DataProcessor = (data) => {
  const total = data.reduce((acc, curr) => acc + curr.price, 0);
  const volume = data.reduce((acc, curr) => acc + curr.volume24h, 0);
  
  return {
    totalVolume: volume,
    averagePrice: data.length > 0 ? total / data.length : 0,
    count: data.length,
  };
};

export const isValidCryptoEntry = (data: any): data is CryptoData => {
  return (
    typeof data.symbol === 'string' &&
    typeof data.price === 'number' &&
    typeof data.timestamp === 'number' &&
    typeof data.volume24h === 'number'
  );
};
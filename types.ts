export interface CryptoTransaction {
  id: string;
  amount: number;
  currency: string;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
}

export interface CryptoBalance {
  asset: string;
  available: string;
  reserved: string;
}

export type NetworkType = 'mainnet' | 'testnet' | 'devnet';

export interface CryptoConfig {
  network: NetworkType;
  retryAttempts: number;
  timeoutMs: number;
}

export const validateTransaction = (tx: CryptoTransaction): boolean => {
  return tx.amount > 0 && tx.id.length > 0;
};

export const formatBalance = (balance: CryptoBalance): number => {
  return parseFloat(balance.available) + parseFloat(balance.reserved);
};

export const getNetworkEndpoint = (network: NetworkType): string => {
  const endpoints: Record<NetworkType, string> = {
    mainnet: 'https://api.mainnet.wideeyedmessa.io',
    testnet: 'https://api.testnet.wideeyedmessa.io',
    devnet: 'https://api.devnet.wideeyedmessa.io',
  };
  return endpoints[network];
};
export type ChainId = 1 | 137 | 42161;

export interface CryptoTransaction {
  hash: string;
  value: bigint;
  recipient: string;
  timestamp: number;
}

export interface ProviderConfig {
  rpcUrl: string;
  chainId: ChainId;
  timeout: number;
}

/**
 * Represents a standard response from crypto node providers
 */
export interface ProviderResponse<T> {
  jsonrpc: "2.0";
  id: number;
  result?: T;
  error?: {
    code: number;
    message: string;
  };
}

export type AssetMap = Record<string, bigint>;

export interface WalletState {
  address: string;
  balances: AssetMap;
  isSyncing: boolean;
}

export class CryptoError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = "CryptoError";
  }
}
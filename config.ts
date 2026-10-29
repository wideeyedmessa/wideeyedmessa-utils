export interface ChainConfig {
  rpcUrl: string;
  chainId: number;
  wsUrl: string;
}

export const NETWORKS: Record<string, ChainConfig> = {
  mainnet: {
    rpcUrl: 'https://eth.llamarpc.com',
    chainId: 1,
    wsUrl: 'wss://eth.drpc.org'
  },
  arbitrum: {
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    chainId: 42161,
    wsUrl: 'wss://arb1.arbitrum.io/feed'
  }
};

export const DEFAULT_TIMEOUT_MS = 5000;
export const MAX_RETRY_ATTEMPTS = 3;

export const validateConfig = (chain: string): boolean => {
  return Object.keys(NETWORKS).includes(chain);
};
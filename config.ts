export interface ChainConfig {
  chainId: number;
  rpcUrl: string;
  nativeCurrency: string;
  blockExplorer: string;
}

export const SUPPORTED_CHAINS: Record<string, ChainConfig> = {
  mainnet: {
    chainId: 1,
    rpcUrl: 'https://eth.llamarpc.com',
    nativeCurrency: 'ETH',
    blockExplorer: 'https://etherscan.io'
  },
  polygon: {
    chainId: 137,
    rpcUrl: 'https://polygon-rpc.com',
    nativeCurrency: 'MATIC',
    blockExplorer: 'https://polygonscan.com'
  }
};

/**
 * Configuration retrieval for network specific constants
 */
export function getChainConfig(network: string): ChainConfig {
  const config = SUPPORTED_CHAINS[network];
  if (!config) {
    throw new Error(`unsupported network: ${network}`);
  }
  return config;
}
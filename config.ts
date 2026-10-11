export interface Config {
  rpcUrl: string;
  chainId: number;
  retryAttempts: number;
}

const defaults: Config = {
  rpcUrl: 'https://mainnet.infura.io/v3/',
  chainId: 1,
  retryAttempts: 3,
};

export const loadConfig = (overrides: Partial<Config> = {}): Config => {
  return {
    ...defaults,
    ...overrides,
    rpcUrl: process.env.RPC_URL || overrides.rpcUrl || defaults.rpcUrl,
    chainId: Number(process.env.CHAIN_ID) || overrides.chainId || defaults.chainId,
    retryAttempts: Number(process.env.RETRY_ATTEMPTS) || overrides.retryAttempts || defaults.retryAttempts,
  };
};
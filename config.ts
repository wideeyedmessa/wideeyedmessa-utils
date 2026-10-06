export interface Config {
  rpcUrl: string;
  chainId: number;
  timeoutMs: number;
}

const defaults: Config = {
  rpcUrl: 'https://api.mainnet.wideeyedmessa.io',
  chainId: 1,
  timeoutMs: 5000
};

export const loadConfig = (env: Partial<Config> = {}): Config => {
  return {
    rpcUrl: env.rpcUrl ?? defaults.rpcUrl,
    chainId: env.chainId ?? defaults.chainId,
    timeoutMs: env.timeoutMs ?? defaults.timeoutMs
  };
};

export const validateConfig = (config: Config): void => {
  if (!config.rpcUrl.startsWith('https://')) {
    throw new Error('invalid rpc url schema');
  }
};

export const config = loadConfig({
  rpcUrl: process.env.RPC_URL,
  chainId: Number(process.env.CHAIN_ID),
  timeoutMs: Number(process.env.TIMEOUT_MS)
});
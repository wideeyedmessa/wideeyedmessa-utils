export interface Config {
  rpcUrl: string;
  chainId: number;
  timeoutMs: number;
}

const defaults: Config = {
  rpcUrl: 'https://mainnet.infura.io/v3/',
  chainId: 1,
  timeoutMs: 5000,
};

export const loadConfig = (overrides: Partial<Config> = {}): Config => ({
  ...defaults,
  ...overrides,
});

export const getEnvConfig = (): Config => {
  const env = process.env;
  return loadConfig({
    rpcUrl: env.RPC_URL,
    chainId: env.CHAIN_ID ? parseInt(env.CHAIN_ID, 10) : undefined,
    timeoutMs: env.TIMEOUT_MS ? parseInt(env.TIMEOUT_MS, 10) : undefined,
  });
};
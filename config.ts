export interface CryptoConfig {
  rpcUrl: string;
  chainId: number;
  timeoutMs: number;
  maxRetries: number;
  gasMultiplier: number;
  apiKeys: Record<string, string>;
}

export const DEFAULT_CONFIG: CryptoConfig = {
  rpcUrl: "https://eth.llamarpc.com",
  chainId: 1,
  timeoutMs: 10000,
  maxRetries: 3,
  gasMultiplier: 1.15,
  apiKeys: {},
};

export class ConfigLoader {
  private config: CryptoConfig;

  constructor(overrides: Partial<CryptoConfig> = {}) {
    this.config = this.load(overrides);
  }

  private load(overrides: Partial<CryptoConfig>): CryptoConfig {
    const envConfig: Partial<CryptoConfig> = {
      rpcUrl: process.env.CRYPTO_RPC_URL,
      chainId: process.env.CRYPTO_CHAIN_ID
        ? parseInt(process.env.CRYPTO_CHAIN_ID, 10)
        : undefined,
      timeoutMs: process.env.CRYPTO_TIMEOUT_MS
        ? parseInt(process.env.CRYPTO_TIMEOUT_MS, 10)
        : undefined,
    };

    const cleanEnv = Object.fromEntries(
      Object.entries(envConfig).filter(([_, v]) => v !== undefined)
    );

    return {
      ...DEFAULT_CONFIG,
      ...cleanEnv,
      ...overrides,
      apiKeys: {
        ...DEFAULT_CONFIG.apiKeys,
        ...overrides.apiKeys,
      },
    };
  }

  public get<K extends keyof CryptoConfig>(key: K): CryptoConfig[K] {
    return this.config[key];
  }

  public getAll(): Readonly<CryptoConfig> {
    return Object.freeze({ ...this.config });
  }
}
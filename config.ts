export interface CryptoConfig {
  rpcUrl: string;
  chainId: number;
  requestTimeoutMs: number;
  maxRetryAttempts: number;
  gasMultiplier: number;
}

const DEFAULT_CONFIG: CryptoConfig = {
  rpcUrl: "https://cloudflare-eth.com",
  chainId: 1,
  requestTimeoutMs: 10000,
  maxRetryAttempts: 3,
  gasMultiplier: 1.15,
};

export class ConfigLoader {
  private config: CryptoConfig;

  constructor(userConfig?: Partial<CryptoConfig>) {
    this.config = this.mergeConfig(userConfig);
  }

  private mergeConfig(userConfig?: Partial<CryptoConfig>): CryptoConfig {
    if (!userConfig) {
      return { ...DEFAULT_CONFIG };
    }
    return {
      rpcUrl: userConfig.rpcUrl ?? DEFAULT_CONFIG.rpcUrl,
      chainId: userConfig.chainId ?? DEFAULT_CONFIG.chainId,
      requestTimeoutMs: userConfig.requestTimeoutMs ?? DEFAULT_CONFIG.requestTimeoutMs,
      maxRetryAttempts: userConfig.maxRetryAttempts ?? DEFAULT_CONFIG.maxRetryAttempts,
      gasMultiplier: userConfig.gasMultiplier ?? DEFAULT_CONFIG.gasMultiplier,
    };
  }

  public get<K extends keyof CryptoConfig>(key: K): CryptoConfig[K] {
    return this.config[key];
  }

  public getAll(): Readonly<CryptoConfig> {
    return Object.freeze({ ...this.config });
  }

  public update(newConfig: Partial<CryptoConfig>): CryptoConfig {
    this.config = this.mergeConfig({ ...this.config, ...newConfig });
    return this.getAll();
  }
}

export const loadConfig = (override?: Partial<CryptoConfig>): CryptoConfig => {
  return new ConfigLoader(override).getAll();
};

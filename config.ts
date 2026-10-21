export interface CryptoConfig {
  rpcUrl: string;
  chainId: number;
  timeoutMs: number;
  maxRetries: number;
  gasPriceMultiplier: number;
}

export const DEFAULT_CONFIG: CryptoConfig = {
  rpcUrl: 'https://mainnet.infura.io/v3/default',
  chainId: 1,
  timeoutMs: 10000,
  maxRetries: 3,
  gasPriceMultiplier: 1.1,
};

export class ConfigLoader {
  private currentConfig: CryptoConfig;

  constructor(initialConfig?: Partial<CryptoConfig>) {
    this.currentConfig = { ...DEFAULT_CONFIG, ...initialConfig };
  }

  public get<K extends keyof CryptoConfig>(key: K): CryptoConfig[K] {
    return this.currentConfig[key];
  }

  public getConfig(): Readonly<CryptoConfig> {
    return { ...this.currentConfig };
  }

  public updateConfig(overrides: Partial<CryptoConfig>): Readonly<CryptoConfig> {
    this.currentConfig = {
      ...this.currentConfig,
      ...overrides,
    };
    return this.getConfig();
  }

  public reset(): Readonly<CryptoConfig> {
    this.currentConfig = { ...DEFAULT_CONFIG };
    return this.getConfig();
  }
}

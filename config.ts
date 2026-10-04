export interface CryptoConfig {
  network: 'mainnet' | 'testnet' | 'devnet';
  rpcUrl: string;
  timeoutMs: number;
  maxRetries: number;
  gasMultiplier: number;
}

const DEFAULT_CONFIG: CryptoConfig = {
  network: 'mainnet',
  rpcUrl: 'https://cloudflare-eth.com',
  timeoutMs: 15000,
  maxRetries: 3,
  gasMultiplier: 1.1,
};

export class ConfigLoader {
  private config: CryptoConfig;

  constructor(overrides: Partial<CryptoConfig> = {}) {
    this.config = this.load(overrides);
  }

  private load(overrides: Partial<CryptoConfig>): CryptoConfig {
    const envConfig: Partial<CryptoConfig> = {
      network: (process.env.CRYPTO_NETWORK as CryptoConfig['network']) || undefined,
      rpcUrl: process.env.CRYPTO_RPC_URL || undefined,
      timeoutMs: process.env.CRYPTO_TIMEOUT_MS ? parseInt(process.env.CRYPTO_TIMEOUT_MS, 10) : undefined,
      maxRetries: process.env.CRYPTO_MAX_RETRIES ? parseInt(process.env.CRYPTO_MAX_RETRIES, 10) : undefined,
      gasMultiplier: process.env.CRYPTO_GAS_MULTIPLIER ? parseFloat(process.env.CRYPTO_GAS_MULTIPLIER) : undefined,
    };

    const cleanEnvConfig = Object.fromEntries(
      Object.entries(envConfig).filter(([_, v]) => v !== undefined)
    );

    return {
      ...DEFAULT_CONFIG,
      ...cleanEnvConfig,
      ...overrides,
    };
  }

  public get(): CryptoConfig {
    return this.config;
  }
}
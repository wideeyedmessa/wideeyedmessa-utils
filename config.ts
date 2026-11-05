import { readFileSync } from 'fs';

interface Config {
  rpcUrl: string;
  retryLimit: number;
  debug: boolean;
}

const DEFAULT_CONFIG: Config = {
  rpcUrl: 'https://api.mainnet-beta.solana.com',
  retryLimit: 3,
  debug: false,
};

export const loadConfig = (path?: string): Config => {
  try {
    if (!path) return DEFAULT_CONFIG;
    const file = readFileSync(path, 'utf-8');
    const parsed = JSON.parse(file);
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch (err) {
    return DEFAULT_CONFIG;
  }
};

export type { Config };
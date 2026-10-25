import { readFileSync } from 'fs';

interface Config {
  rpcUrl: string;
  chainId: number;
  timeout: number;
}

const defaults: Config = {
  rpcUrl: 'https://mainnet.infura.io/v3/default',
  chainId: 1,
  timeout: 5000,
};

export const loadConfig = (path?: string): Config => {
  if (!path) return defaults;

  try {
    const file = readFileSync(path, 'utf-8');
    const parsed = JSON.parse(file);
    return { ...defaults, ...parsed };
  } catch (error) {
    return defaults;
  }
};

export const config: Config = loadConfig(process.env.CONFIG_PATH);
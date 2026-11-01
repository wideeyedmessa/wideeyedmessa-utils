export function formatTxHash(hash: string): string {
  const cleanHash = hash.startsWith('0x') ? hash.slice(2) : hash;
  return `0x${cleanHash.toLowerCase()}`;
}

export function satoshiToBtc(satoshis: bigint | number): string {
  const sats = BigInt(satoshis);
  const btc = Number(sats) / 1e8;
  return btc.toFixed(8);
}

export function btcToSatoshi(btc: number): bigint {
  if (btc < 0) throw new Error('BTC amount cannot be negative');
  return BigInt(Math.round(btc * 1e8));
}

export function isHex(value: string): boolean {
  return /^0x[0-9a-fA-F]+$/.test(value) || /^[0-9a-fA-F]+$/.test(value);
}

export function truncateAddress(address: string, chars = 4): string {
  if (!address || address.length <= chars * 2 + 2) {
    return address;
  }
  const prefix = address.startsWith('0x') ? address.slice(0, chars + 2) : address.slice(0, chars);
  const suffix = address.slice(-chars);
  return `${prefix}...${suffix}`;
}

export interface CryptoServiceConfig {
  network: 'mainnet' | 'testnet';
  rpcUrl: string;
  timeoutMs: number;
}

export class CryptoService {
  private config: CryptoServiceConfig;

  constructor(config: CryptoServiceConfig) {
    this.config = config;
  }

  public getNetworkInfo(): string {
    return `${this.config.network}:${this.config.rpcUrl}`;
  }
}
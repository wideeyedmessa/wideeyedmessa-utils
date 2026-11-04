import { createHash } from 'crypto';

export interface AddressValidationRule {
  maxLength: number;
  prefix?: string;
}

export function normalizeHex(hexString: string): string {
  const trimmed = hexString.trim().toLowerCase();
  return trimmed.startsWith('0x') ? trimmed : `0x${trimmed}`;
}

export function hashSha256(data: string): string {
  return createHash('sha256').update(data).digest('hex');
}

export function satoshiToBtc(satoshis: bigint): string {
  const btc = Number(satoshis) / 100_000_000;
  return btc.toFixed(8);
}

export function parseEtherToWei(amount: string): bigint {
  const [whole, fraction = ''] = amount.split('.');
  const paddedFraction = fraction.padEnd(18, '0').slice(0, 18);
  return BigInt(`${whole}${paddedFraction}`);
}

export function isValidCryptoAddress(address: string, rule: AddressValidationRule): boolean {
  if (!address || address.length > rule.maxLength) {
    return false;
  }
  if (rule.prefix && !address.startsWith(rule.prefix)) {
    return false;
  }
  return /^[a-fA-F0-9]+$/.test(address.replace(/^0x/, ''));
}
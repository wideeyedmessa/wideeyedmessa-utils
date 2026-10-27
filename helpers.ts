import { createHash } from 'crypto';

export interface FormatAddressOptions {
  leading?: number;
  trailing?: number;
}

export function truncateAddress(address: string, options: FormatAddressOptions = {}): string {
  const leading = options.leading ?? 6;
  const trailing = options.trailing ?? 4;

  if (!address || address.length <= leading + trailing) {
    return address;
  }
  return `${address.slice(0, leading)}...${address.slice(-trailing)}`;
}

export function isValidEthAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function formatUnits(amount: bigint | string | number, decimals: number = 18): string {
  const value = BigInt(amount);
  const divisor = BigInt(10 ** decimals);
  const integerPart = value / divisor;
  const fractionalPart = value % divisor;

  const paddedFraction = fractionalPart.toString().padStart(decimals, '0').replace(/0+$/, '');
  return paddedFraction ? `${integerPart}.${paddedFraction}` : integerPart.toString();
}

export function parseUnits(amount: string, decimals: number = 18): bigint {
  const [integerPart, fractionalPart = ''] = amount.split('.');
  const paddedFraction = fractionalPart.padEnd(decimals, '0').slice(0, decimals);
  return BigInt(integerPart + paddedFraction);
}

export function sha256Hash(data: string): string {
  return createHash('sha256').update(data).digest('hex');
}
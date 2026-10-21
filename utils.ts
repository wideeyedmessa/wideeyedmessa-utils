export interface FormattingOptions {
  decimals?: number;
  symbol?: string;
  displayDecimals?: number;
}

export function isValidEthAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function truncateAddress(
  address: string,
  startChars = 6,
  endChars = 4
): string {
  if (!address) return '';
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

export function formatTokenAmount(
  rawAmount: bigint | string,
  decimals = 18,
  displayDecimals = 4
): string {
  const value = BigInt(rawAmount);
  const base = BigInt(10 ** decimals);
  const integerPart = value / base;
  const remainder = value % base;

  if (remainder === 0n) {
    return integerPart.toString();
  }

  const remainderStr = remainder.toString().padStart(decimals, '0');
  const trimmed = remainderStr.slice(0, displayDecimals).replace(/0+$/, '');

  return trimmed ? `${integerPart}.${trimmed}` : integerPart.toString();
}

export function parseTokenAmount(amount: string, decimals = 18): bigint {
  const [integer, fraction = ''] = amount.split('.');
  const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals);
  return BigInt(integer + paddedFraction);
}
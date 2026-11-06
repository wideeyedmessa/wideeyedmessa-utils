export interface TokenAmount {
  raw: bigint;
  decimals: number;
  symbol: string;
}

export function formatUnits(value: bigint, decimals = 18): string {
  const str = value.toString().padStart(decimals + 1, '0');
  const integerPart = str.slice(0, -decimals) || '0';
  const fractionalPart = str.slice(-decimals).replace(/0+$/, '');
  return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
}

export function parseUnits(value: string, decimals = 18): bigint {
  const [integer, fraction = ''] = value.split('.');
  const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals);
  return BigInt(`${integer}${paddedFraction}`);
}

export function truncateAddress(address: string, digits = 4): string {
  if (!address.startsWith('0x') || address.length < digits * 2 + 2) {
    return address;
  }
  return `${address.slice(0, digits + 2)}...${address.slice(-digits)}`;
}

export function isValidHex(hex: string): boolean {
  return /^0x[0-9a-fA-F]*$/.test(hex) && hex.length % 2 === 0;
}
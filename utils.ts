/**
 * Utility functions for cryptocurrency data formatting and conversion.
 */

export type UnitMap = Record<string, number>;

const ETH_UNITS: UnitMap = {
  wei: 0,
  gwei: 9,
  ether: 18,
};

/**
 * Formats a raw crypto wallet address to a shortened representation.
 */
export function truncateAddress(address: string, digits: number = 4): string {
  if (!address || address.length < digits * 2 + 2) {
    return address;
  }
  return `${address.slice(0, digits + 2)}...${address.slice(-digits)}`;
}

/**
 * Checks if a given string is a valid 0x-prefixed hex string.
 */
export function isHexString(value: string, length?: number): boolean {
  if (typeof value !== 'string' || !value.match(/^0x[0-9a-fA-F]*$/)) {
    return false;
  }
  if (length && value.length !== 2 + length * 2) {
    return false;
  }
  return true;
}

/**
 * Converts an amount from atomic units (e.g. Wei) to standard display units.
 */
export function formatUnits(value: bigint | string | number, decimals: number | string = 18): string {
  const dec = typeof decimals === 'string' ? ETH_UNITS[decimals.toLowerCase()] ?? 18 : decimals;
  const bigintValue = BigInt(value);
  const divisor = BigInt(10 ** dec);
  const integerPart = (bigintValue / divisor).toString();
  const remainder = (bigintValue % divisor).toString().padStart(dec, '0');
  const trimmedRemainder = remainder.replace(/0+$/, '');
  return trimmedRemainder ? `${integerPart}.${trimmedRemainder}` : integerPart;
}

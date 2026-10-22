export type Wei = bigint;
export type Address = string;

export interface Transaction {
  hash: string;
  value: Wei;
  to: Address;
}

/**
 * Format crypto value from Wei to decimal representation
 */
export const formatWei = (value: Wei, decimals: number = 18): string => {
  const divisor = 10n ** BigInt(decimals);
  const integerPart = value / divisor;
  const fractionalPart = (value % divisor).toString().padStart(decimals, '0');
  return `${integerPart}.${fractionalPart.replace(/0+$/, '') || '0'}`;
};

/**
 * Validate Ethereum-style checksum address format
 */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Calculate gas fee estimate based on limit and price
 */
export const calculateGasFee = (gasLimit: bigint, gasPrice: Wei): Wei => {
  return gasLimit * gasPrice;
};

/**
 * Parse hexadecimal string to big integer
 */
export const parseHex = (hex: string): bigint => {
  return BigInt(hex.startsWith('0x') ? hex : `0x${hex}`);
};
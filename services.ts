export interface TokenAmount {
  raw: bigint;
  decimals: number;
  symbol: string;
}

export function formatAddress(address: string, digits = 4): string {
  if (!address || address.length < digits * 2 + 2) {
    return address;
  }
  return `${address.slice(0, digits + 2)}...${address.slice(-digits)}`;
}

export function parseUnits(value: string, decimals: number): bigint {
  const parts = value.split('.');
  const whole = parts[0] || '0';
  const fraction = (parts[1] || '').padEnd(decimals, '0').slice(0, decimals);
  return BigInt(`${whole}${fraction}`);
}

export function formatUnits(value: bigint, decimals: number): string {
  const str = value.toString().padStart(decimals + 1, '0');
  const integerPart = str.slice(0, -decimals) || '0';
  const fractionalPart = str.slice(-decimals).replace(/0+$/, '');
  return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
}

export function calculateGasFee(gasLimit: bigint, gasPriceGwei: number): bigint {
  const weiPerGwei = 1000000000n;
  const gasPriceWei = BigInt(Math.floor(gasPriceGwei)) * weiPerGwei;
  return gasLimit * gasPriceWei;
}

export function isValidTxHash(hash: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(hash);
}
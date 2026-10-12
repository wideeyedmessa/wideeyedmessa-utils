export function truncateAddress(
  address: string,
  startChars: number = 6,
  endChars: number = 4
): string {
  if (!address || address.length <= startChars + endChars) {
    return address;
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

export function isValidEthAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function formatTokenAmount(
  rawAmount: bigint | string,
  decimals: number = 18,
  displayDecimals: number = 4
): string {
  const val = typeof rawAmount === 'string' ? BigInt(rawAmount) : rawAmount;
  const base = BigInt(10 ** decimals);
  const integerPart = val / base;
  const remainder = val % base;

  let fractionStr = remainder.toString().padStart(decimals, '0');
  if (displayDecimals < decimals) {
    fractionStr = fractionStr.slice(0, displayDecimals);
  }

  const trimmedFraction = fractionStr.replace(/0+$/, '');
  return trimmedFraction ? `${integerPart}.${trimmedFraction}` : `${integerPart}`;
}

export function parseTokenAmount(
  amountStr: string,
  decimals: number = 18
): bigint {
  const [integer, fraction = ''] = amountStr.split('.');
  const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals);
  return BigInt(`${integer}${paddedFraction}`);
}

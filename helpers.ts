export function truncateAddress(address: string, startChars = 6, endChars = 4): string {
  if (!address || address.length <= startChars + endChars) {
    return address;
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

export function toWei(amount: number | string, decimals = 18): bigint {
  const [integerPart, fractionalPart = ''] = String(amount).split('.');
  const paddedFraction = fractionalPart.padEnd(decimals, '0').slice(0, decimals);
  return BigInt(`${integerPart}${paddedFraction}`);
}

export function fromWei(wei: bigint | string, decimals = 18): string {
  const weiStr = BigInt(wei).toString().padStart(decimals + 1, '0');
  const integerPart = weiStr.slice(0, -decimals) || '0';
  const fractionalPart = weiStr.slice(-decimals).replace(/0+$/, '');
  return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
}

export function isValidEthAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function calculateGasFee(gasLimit: bigint, gasPriceGwei: number): bigint {
  const gweiInWei = BigInt(Math.floor(gasPriceGwei * 1e9));
  return gasLimit * gweiInWei;
}

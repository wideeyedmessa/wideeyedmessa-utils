export function truncateAddress(address: string, startChars = 6, endChars = 4): string {
  if (!address || address.length <= startChars + endChars) {
    return address;
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

export function isValidHexString(value: string): boolean {
  return /^0x[0-9a-fA-F]+$/.test(value);
}

export function formatUnits(value: bigint, decimals: number = 18): string {
  const valueStr = value.toString().padStart(decimals + 1, '0');
  const integerPart = valueStr.slice(0, valueStr.length - decimals) || '0';
  const fractionalPart = valueStr.slice(valueStr.length - decimals).replace(/0+$/, '');
  return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
}

export function parseUnits(value: string, decimals: number = 18): bigint {
  const [integer, fraction = ''] = value.split('.');
  const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals);
  return BigInt(`${integer}${paddedFraction}`);
}

export function bufferToHex(buffer: Uint8Array): string {
  return '0x' + Array.from(buffer).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function hexToBuffer(hex: string): Uint8Array {
  const cleanHex = hex.replace(/^0x/, '');
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = parseInt(cleanHex.substring(i, i + 2), 16);
  }
  return bytes;
}
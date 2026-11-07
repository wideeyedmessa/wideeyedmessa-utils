export class CryptoError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'CryptoError';
  }
}

export function parseHexString(hex: string): Uint8Array {
  if (typeof hex !== 'string') {
    throw new CryptoError('Input must be a string', 'INVALID_INPUT');
  }

  const cleanHex = hex.startsWith('0x') ? hex.slice(2) : hex;
  if (cleanHex.length === 0) {
    return new Uint8Array(0);
  }

  if (cleanHex.length % 2 !== 0) {
    throw new CryptoError('Hex string must have an even length', 'INVALID_HEX_LENGTH');
  }

  if (!/^[0-9a-fA-F]+$/.test(cleanHex)) {
    throw new CryptoError('Invalid hexadecimal characters detected', 'INVALID_HEX_CHARS');
  }

  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = parseInt(cleanHex.substring(i, i + 2), 16);
  }

  return bytes;
}

export function safeDivideBigInt(numerator: bigint, denominator: bigint): bigint {
  if (denominator === 0n) {
    throw new CryptoError('Division by zero bigint encountered', 'DIVISION_BY_ZERO');
  }
  return numerator / denominator;
}

export function validateAddressFormat(address: string, expectedLength = 42): string {
  if (!address || typeof address !== 'string') {
    throw new CryptoError('Address must be a non-empty string', 'EMPTY_ADDRESS');
  }

  const normalized = address.trim().toLowerCase();
  if (!normalized.startsWith('0x') || normalized.length !== expectedLength) {
    throw new CryptoError('Invalid address format or length', 'MALFORMED_ADDRESS');
  }

  return normalized;
}
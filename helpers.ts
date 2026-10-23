/**
 * Truncates a cryptographic hash or wallet address for display purposes.
 *
 * @param address - The full hex string or wallet address.
 * @param startChars - Number of leading characters to keep.
 * @param endChars - Number of trailing characters to keep.
 * @returns Formatted shortened string representation.
 */
export function formatAddress(
  address: string,
  startChars: number = 6,
  endChars: number = 4
): string {
  if (!address || address.length <= startChars + endChars) {
    return address;
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Validates whether a given string is a valid 0x-prefixed hex string.
 *
 * @param value - The input string to check.
 * @param expectedLength - Optional byte length to strictly check against.
 * @returns True if valid hex string, false otherwise.
 */
export function isValidHexString(
  value: string,
  expectedLength?: number
): boolean {
  if (!/^0x[0-9a-fA-F]*$/.test(value)) {
    return false;
  }
  if (expectedLength !== undefined) {
    const rawHex = value.slice(2);
    return rawHex.length === expectedLength * 2;
  }
  return value.length % 2 === 0;
}

/**
 * Converts a Uint8Array buffer into a 0x-prefixed hexadecimal string.
 *
 * @param buffer - The byte array to encode.
 * @returns 0x-prefixed hex string representation.
 */
export function bytesToHex(buffer: Uint8Array): string {
  const hexParts: string[] = new Array(buffer.length);
  for (let i = 0; i < buffer.length; i++) {
    hexParts[i] = buffer[i].toString(16).padStart(2, '0');
  }
  return `0x${hexParts.join('')}`;
}
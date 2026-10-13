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

export function isValidHex(value: string): boolean {
  return /^0x[0-9a-fA-F]*$/.test(value);
}

export function isValidAddress(address: string): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test(address);
}

export function weiToEther(wei: bigint | string): string {
  const weiBigInt = typeof wei === 'string' ? BigInt(wei) : wei;
  const etherInt = weiBigInt / 10n ** 18n;
  const etherDec = weiBigInt % 10n ** 18n;
  const decStr = etherDec.toString().padStart(18, '0').replace(/0+$/, '');
  return decStr ? `${etherInt}.${decStr}` : `${etherInt}`;
}

export function etherToWei(ether: string): bigint {
  const [integer, decimal = ''] = ether.split('.');
  const paddedDecimal = decimal.padEnd(18, '0').slice(0, 18);
  return BigInt((integer || '0') + paddedDecimal);
}

export async function hashMessage(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return '0x' + hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
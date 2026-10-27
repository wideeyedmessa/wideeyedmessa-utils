export interface Trade {
  price: number;
  amount: number;
  timestamp: number;
}

export interface OrderbookEntry {
  price: number;
  amount: number;
}

export function calculateVwap(trades: Trade[]): number {
  if (trades.length === 0) return 0;
  
  let totalVolume = 0;
  let priceVolumeSum = 0;

  for (const trade of trades) {
    if (trade.amount <= 0 || trade.price <= 0) continue;
    priceVolumeSum += trade.price * trade.amount;
    totalVolume += trade.amount;
  }

  return totalVolume === 0 ? 0 : priceVolumeSum / totalVolume;
}

export function formatSatoshiToBtc(satoshis: bigint | number): string {
  const sats = BigInt(satoshis);
  const integerPart = sats / 100000000n;
  const fractionalPart = (sats % 100000000n).toString().padStart(8, '0');
  const formattedFraction = fractionalPart.replace(/0+$/, '');
  
  return formattedFraction.length > 0 
    ? `${integerPart}.${formattedFraction}`
    : `${integerPart}`;
}

export function hexToBytes(hex: string): Uint8Array {
  const cleanHex = hex.startsWith('0x') ? hex.slice(2) : hex;
  if (cleanHex.length % 2 !== 0) {
    throw new Error('Invalid hex string length');
  }
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = parseInt(cleanHex.substring(i, i + 2), 16);
  }
  return bytes;
}
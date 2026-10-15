export interface Transaction { id: string; amount: bigint; currency: string; }

/**
 * format satoshi values into human-readable bitcoin units
 */
export const formatBtc = (sats: bigint): string => {
  return (Number(sats) / 100_000_000).toFixed(8);
};

/**
 * validate crypto address checksums
 */
export const isValidAddress = (address: string): boolean => {
  const regex = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,59}$/;
  return regex.test(address);
};

/**
 * calculate fee based on satoshis per byte
 */
export const estimateFee = (bytes: number, satPerByte: number): bigint => {
  return BigInt(bytes) * BigInt(satPerByte);
};

/**
 * mask sensitive wallet identifiers
 */
export const maskIdentifier = (id: string): string => {
  if (id.length < 8) return id;
  return `${id.slice(0, 4)}...${id.slice(-4)}`;
};

/**
 * sort transactions by timestamp property
 */
export const sortByTimestamp = <T extends { timestamp: number }>(txs: T[]): T[] => {
  return [...txs].sort((a, b) => b.timestamp - a.timestamp);
};
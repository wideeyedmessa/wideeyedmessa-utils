export type CryptoAmount = { raw: string; decimals: number };

export const formatUnits = (value: string, decimals: number): number => {
  return parseInt(value) / Math.pow(10, decimals);
};

export const toWei = (amount: number, decimals: number): bigint => {
  const factor = BigInt(Math.pow(10, decimals));
  return BigInt(Math.floor(amount * Math.pow(10, decimals)));
};

export const validateAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const calculatePercentage = (
  amount: CryptoAmount,
  percent: number
): bigint => {
  const rawValue = BigInt(amount.raw);
  return (rawValue * BigInt(percent * 100)) / 10000n;
};

export const parseCryptoBalance = (data: CryptoAmount): string => {
  const result = formatUnits(data.raw, data.decimals);
  return result.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: data.decimals
  });
};
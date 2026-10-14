import { ethers } from 'ethers';

export const formatUnits = (value: bigint, decimals: number = 18): string => {
  return ethers.formatUnits(value, decimals);
};

export const parseUnits = (value: string, decimals: number = 18): bigint => {
  return ethers.parseUnits(value, decimals);
};

export const isValidAddress = (address: string): boolean => {
  return ethers.isAddress(address);
};

export const truncateAddress = (address: string): string => {
  if (!isValidAddress(address)) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const calculateSlippage = (amount: bigint, slippageBps: number): bigint => {
  return (amount * BigInt(10000 - slippageBps)) / 10000n;
};

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const retry = async <T>(
  fn: () => Promise<T>,
  retries: number = 3,
  interval: number = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await delay(interval);
    return retry(fn, retries - 1, interval);
  }
};
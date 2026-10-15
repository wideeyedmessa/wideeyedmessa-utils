import { ethers } from 'ethers';

export const formatUnits = (value: bigint, decimals: number = 18): string => {
  return ethers.formatUnits(value, decimals);
};

export const parseUnits = (value: string, decimals: number = 18): bigint => {
  return ethers.parseUnits(value, decimals);
};

export const shortenAddress = (address: string): string => {
  if (!ethers.isAddress(address)) throw new Error('Invalid address');
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const calculateSlippage = (amount: bigint, slippageBps: bigint): bigint => {
  return (amount * slippageBps) / 10000n;
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const retry = async <T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await sleep(delay);
    return retry(fn, retries - 1, delay);
  }
};
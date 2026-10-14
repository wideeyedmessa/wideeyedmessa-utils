import { ethers } from 'ethers';

export const formatUnits = (value: bigint, decimals: number = 18): string => {
  return ethers.formatUnits(value, decimals);
};

export const parseUnits = (value: string, decimals: number = 18): bigint => {
  return ethers.parseUnits(value, decimals);
};

export const calculateSlippage = (amount: bigint, slippageBps: number): bigint => {
  return (amount * BigInt(10000 - slippageBps)) / 10000n;
};

export const validateAddress = (address: string): boolean => {
  return ethers.isAddress(address);
};

export const getGasPrice = async (provider: ethers.Provider): Promise<bigint> => {
  const feeData = await provider.getFeeData();
  return feeData.gasPrice ?? 0n;
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const retryOperation = async <T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await sleep(delay);
    return retryOperation(fn, retries - 1, delay);
  }
};
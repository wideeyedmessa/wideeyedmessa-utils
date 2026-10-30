import { ethers } from 'ethers';

export const formatUnits = (value: bigint, decimals: number = 18): string => {
  return ethers.formatUnits(value, decimals);
};

export const parseUnits = (value: string, decimals: number = 18): bigint => {
  return ethers.parseUnits(value, decimals);
};

export const truncateAddress = (address: string): string => {
  if (!ethers.isAddress(address)) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const calculateSlippage = (amount: bigint, slippageBasisPoints: bigint): bigint => {
  return (amount * slippageBasisPoints) / 10000n;
};

export const isZeroAddress = (address: string): boolean => {
  return address === ethers.ZeroAddress;
};

export const validateSignature = (message: string, signature: string, address: string): boolean => {
  try {
    return ethers.verifyMessage(message, signature).toLowerCase() === address.toLowerCase();
  } catch {
    return false;
  }
};
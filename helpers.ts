import { ethers } from 'ethers';

export const formatUnits = (value: bigint, decimals: number = 18): string => {
  return ethers.formatUnits(value, decimals);
};

export const parseUnits = (value: string, decimals: number = 18): bigint => {
  return ethers.parseUnits(value, decimals);
};

export const truncateAddress = (address: string): string => {
  if (!ethers.isAddress(address)) throw new Error('Invalid address');
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const isZeroAddress = (address: string): boolean => {
  return address === '0x0000000000000000000000000000000000000000';
};

export const calculateSlippage = (amount: bigint, slippageBasisPoints: bigint): bigint => {
  return (amount * slippageBasisPoints) / 10000n;
};

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const hexToNumber = (hex: string): number => {
  return parseInt(hex, 16);
};

export const isValidSignature = (signature: string): boolean => {
  return /^0x([A-Fa-f0-9]{130})$/.test(signature);
};
import { ethers } from 'ethers';

export const formatUnits = (value: bigint, decimals: number): string => {
  return ethers.formatUnits(value, decimals);
};

export const parseUnits = (value: string, decimals: number): bigint => {
  return ethers.parseUnits(value, decimals);
};

export const getProvider = (rpcUrl: string): ethers.JsonRpcProvider => {
  return new ethers.JsonRpcProvider(rpcUrl);
};

export const getContract = (address: string, abi: any, signerOrProvider: ethers.Signer | ethers.Provider) => {
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const sanitizeAddress = (address: string): string => {
  return ethers.getAddress(address);
};

export const estimateGasLimit = async (
  contract: ethers.Contract,
  method: string,
  args: any[]
): Promise<bigint> => {
  const gas = await contract.getFunction(method).estimateGas(...args);
  return (gas * 120n) / 100n;
};
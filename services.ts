import { AddressLike, ethers } from 'ethers';

export interface TransactionReceipt {
  hash: string;
  status: number;
  gasUsed: bigint;
}

export class CryptoService {
  constructor(private provider: ethers.Provider) {}

  async getBalance(address: AddressLike): Promise<bigint> {
    return await this.provider.getBalance(address);
  }

  async validateAddress(address: string): Promise<boolean> {
    return ethers.isAddress(address);
  }

  async formatUnits(amount: bigint, decimals: number = 18): Promise<string> {
    return ethers.formatUnits(amount, decimals);
  }

  async getTransactionDetails(hash: string): Promise<TransactionReceipt | null> {
    const receipt = await this.provider.getTransactionReceipt(hash);
    if (!receipt) return null;

    return {
      hash: receipt.hash,
      status: receipt.status ?? 0,
      gasUsed: receipt.gasUsed
    };
  }
}
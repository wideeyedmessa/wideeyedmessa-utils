export type ChainId = 1 | 56 | 137 | 42161 | 43114;

export type Address = `0x${string}`;

export interface Token {
  address: Address;
  symbol: string;
  decimals: number;
  name: string;
  chainId: ChainId;
}

export interface TokenAmount {
  token: Token;
  amount: bigint;
}

export interface TransactionRequest {
  to: Address;
  from: Address;
  data?: string;
  value?: bigint;
  gasLimit?: bigint;
  maxFeePerGas?: bigint;
  maxPriorityFeePerGas?: bigint;
  chainId: ChainId;
}

export interface TransactionReceipt {
  transactionHash: string;
  blockNumber: number;
  status: 'success' | 'reverted';
  gasUsed: bigint;
  effectiveGasPrice: bigint;
}

export interface SignaturePayload {
  message: string;
  signature: string;
  signer: Address;
}
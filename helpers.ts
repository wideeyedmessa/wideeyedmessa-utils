export interface CryptoInput {
  address: string;
  amount: bigint;
  chainId: number;
}

export const validateInput = (input: unknown): CryptoInput => {
  if (typeof input !== 'object' || input === null) {
    throw new Error('invalid input format');
  }

  const { address, amount, chainId } = input as Record<string, unknown>;

  if (typeof address !== 'string' || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error('invalid address format');
  }

  if (typeof amount !== 'bigint' && typeof amount !== 'number') {
    throw new Error('invalid amount type');
  }

  if (typeof chainId !== 'number' || chainId <= 0) {
    throw new Error('invalid chain id');
  }

  return {
    address,
    amount: BigInt(amount),
    chainId
  };
};

export const processCryptoBatch = (inputs: unknown[]): CryptoInput[] => {
  return inputs.map((item) => validateInput(item));
};
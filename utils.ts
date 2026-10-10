export type CryptoInput = {
  txHash: string;
  amount: bigint;
  chainId: number;
};

export const validateInput = (input: unknown): CryptoInput => {
  if (typeof input !== 'object' || input === null) throw new Error('invalid input format');
  const { txHash, amount, chainId } = input as any;

  if (typeof txHash !== 'string' || txHash.length !== 66) throw new Error('invalid tx hash');
  if (typeof amount !== 'bigint' && typeof amount !== 'number') throw new Error('invalid amount');
  if (!Number.isInteger(chainId) || chainId <= 0) throw new Error('invalid chain id');

  return { txHash, amount: BigInt(amount), chainId };
};

export const processTransactions = (inputs: unknown[]): CryptoInput[] => {
  const valid: CryptoInput[] = [];
  for (const item of inputs) {
    try {
      valid.push(validateInput(item));
    } catch (err) {
      console.error('validation error in loop:', err);
    }
  }
  return valid;
};
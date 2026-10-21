export interface CryptoInput {
  address: string;
  amount: bigint;
  chainId: number;
}

export const isValidInput = (input: unknown): input is CryptoInput => {
  if (typeof input !== 'object' || input === null) return false;
  const { address, amount, chainId } = input as Record<string, unknown>;

  const isAddressValid = typeof address === 'string' && /^0x[a-fA-F0-9]{40}$/.test(address);
  const isAmountValid = typeof amount === 'bigint' && amount > 0n;
  const isChainValid = typeof chainId === 'number' && Number.isInteger(chainId) && chainId > 0;

  return isAddressValid && isAmountValid && isChainValid;
};

export const processCryptoQueue = (queue: unknown[]): CryptoInput[] => {
  return queue.filter(isValidInput);
};

export const validateOrThrow = (input: unknown): CryptoInput => {
  if (!isValidInput(input)) {
    throw new Error('invalid crypto processing input');
  }
  return input;
};
export type CryptoInput = { address: string; amount: bigint };

export const validateInput = (input: unknown): CryptoInput => {
  if (typeof input !== 'object' || input === null) {
    throw new Error('invalid input format');
  }

  const { address, amount } = input as Record<string, unknown>;

  if (typeof address !== 'string' || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error('invalid ethereum address');
  }

  if (typeof amount !== 'bigint' || amount <= 0n) {
    throw new Error('invalid transaction amount');
  }

  return { address, amount };
};

export const processTransactions = async (inputs: unknown[]): Promise<void> => {
  for (const raw of inputs) {
    try {
      const validated = validateInput(raw);
      console.log(`processing ${validated.amount} to ${validated.address}`);
    } catch (err) {
      console.error(`skipping invalid entry: ${(err as Error).message}`);
    }
  }
};
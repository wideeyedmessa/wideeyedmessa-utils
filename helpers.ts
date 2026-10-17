export type CryptoInput = { address: string; amount: bigint };

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateInput = (data: unknown): CryptoInput => {
  if (typeof data !== 'object' || data === null) {
    throw new ValidationError('Invalid input format');
  }

  const { address, amount } = data as Record<string, unknown>;

  if (typeof address !== 'string' || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new ValidationError('Invalid blockchain address');
  }

  if (typeof amount !== 'bigint' || amount <= 0n) {
    throw new ValidationError('Amount must be a positive bigint');
  }

  return { address, amount };
};

export const processInputs = (inputs: unknown[]): CryptoInput[] => {
  const valid: CryptoInput[] = [];
  for (const input of inputs) {
    try {
      valid.push(validateInput(input));
    } catch (err) {
      console.error(`Validation failed: ${(err as Error).message}`);
    }
  }
  return valid;
};
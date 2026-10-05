export type CryptoInput = {
  txHash: string;
  amount: bigint;
  recipient: string;
};

export const isValidInput = (input: unknown): input is CryptoInput => {
  if (typeof input !== 'object' || input === null) return false;
  const { txHash, amount, recipient } = input as Record<string, unknown>;
  return (
    typeof txHash === 'string' && txHash.length === 64 &&
    typeof amount === 'bigint' && amount > 0n &&
    typeof recipient === 'string' && recipient.startsWith('0x')
  );
};

export const processTransactions = (queue: unknown[]): void => {
  for (const item of queue) {
    if (!isValidInput(item)) {
      throw new Error('invalid crypto transaction format');
    }
    console.log(`processing tx: ${item.txHash}`);
  }
};
export interface Transaction {
  hash: string;
  from: string;
  to: string;
  amount: bigint;
  nonce: number;
}

export interface BatchResult {
  processed: number;
  failed: number;
  errors: Array<{ index: number; reason: string }>;
}

const HEX_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
const HEX_HASH_REGEX = /^0x[a-fA-F0-9]{64}$/;

export function validateTransaction(tx: unknown): tx is Transaction {
  if (typeof tx !== 'object' || tx === null) {
    return false;
  }

  const candidate = tx as Record<string, unknown>;

  return (
    typeof candidate.hash === 'string' &&
    HEX_HASH_REGEX.test(candidate.hash) &&
    typeof candidate.from === 'string' &&
    HEX_ADDRESS_REGEX.test(candidate.from) &&
    typeof candidate.to === 'string' &&
    HEX_ADDRESS_REGEX.test(candidate.to) &&
    typeof candidate.amount === 'bigint' &&
    candidate.amount > 0n &&
    typeof candidate.nonce === 'number' &&
    Number.isInteger(candidate.nonce) &&
    candidate.nonce >= 0
  );
}

export function processTransactionBatch(inputs: unknown[]): BatchResult {
  const result: BatchResult = { processed: 0, failed: 0, errors: [] };

  for (let i = 0; i < inputs.length; i++) {
    const item = inputs[i];

    if (!validateTransaction(item)) {
      result.failed++;
      result.errors.push({ index: i, reason: 'Invalid transaction schema or payload fields' });
      continue;
    }

    result.processed++;
  }

  return result;
}
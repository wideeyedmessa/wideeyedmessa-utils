export class CryptoError extends Error {
  constructor(public message: string, public code: string, public context?: Record<string, unknown>) {
    super(message);
    this.name = 'CryptoError';
  }
}

export const handleCryptoOp = <T>(fn: () => T): T => {
  try {
    return fn();
  } catch (err) {
    if (err instanceof Error) {
      throw new CryptoError(err.message, 'EXECUTION_FAILURE', { original: err.stack });
    }
    throw new CryptoError('Unknown crypto operation error', 'UNKNOWN_FAILURE');
  }
};

export type ValidationResult = 
  | { success: true; data: string }
  | { success: false; error: CryptoError };

export const validateHex = (input: string): ValidationResult => {
  if (!/^[0-9a-fA-F]+$/.test(input)) {
    return {
      success: false,
      error: new CryptoError('Invalid hex format', 'INVALID_HEX_ENCODING')
    };
  }
  return { success: true, data: input.toLowerCase() };
};
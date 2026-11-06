/**
 * Represents a cryptographic payload signature result.
 */
export interface SignatureResult {
  readonly signature: string;
  readonly timestamp: number;
}

/**
 * Configuration options for the cryptographic service.
 */
export interface CryptoServiceConfig {
  readonly algorithm: 'SHA-256' | 'SHA-512';
  readonly encoding: 'hex' | 'base64';
}

/**
 * Crypto service providing payload digest generation and signature verification.
 */
export class CryptoService {
  private readonly config: CryptoServiceConfig;

  constructor(config: CryptoServiceConfig = { algorithm: 'SHA-256', encoding: 'hex' }) {
    this.config = config;
  }

  /**
   * Computes a cryptographic digest for a raw string input.
   * @param payload Plaintext message or data string to digest.
   * @returns Promise resolving to encoded hash string.
   */
  public async hashMessage(payload: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(payload);
    const hashBuffer = await crypto.subtle.digest(this.config.algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    if (this.config.encoding === 'base64') {
      return btoa(String.fromCharCode(...hashArray));
    }
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Generates a signed payload object containing the digest and execution timestamp.
   * @param payload Plaintext message to process.
   * @returns Promise resolving to a SignatureResult object.
   */
  public async createSignedPayload(payload: string): Promise<SignatureResult> {
    const signature = await this.hashMessage(payload);
    return {
      signature,
      timestamp: Date.now()
    };
  }
}

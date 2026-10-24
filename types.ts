export type CryptoAlgorithm = 'sha256' | 'sha512' | 'ripemd160' | 'aes-256-gcm';

export type NetworkType = 'mainnet' | 'testnet' | 'devnet';

export interface KeyPair {
  publicKey: string;
  privateKey: string;
  network: NetworkType;
}

export interface HashOptions {
  algorithm: CryptoAlgorithm;
  encoding?: 'hex' | 'base64' | 'utf8';
  salt?: string;
}

export interface TransactionPayload {
  sender: string;
  recipient: string;
  amount: bigint;
  fee: bigint;
  nonce: number;
  signature?: string;
  timestamp: number;
}

export interface SignatureResult {
  signature: string;
  publicKey: string;
  recoveryId?: number;
}

export interface AddressValidationResult {
  isValid: boolean;
  network?: NetworkType;
  addressType?: 'p2pkh' | 'p2sh' | 'bech32' | 'ed25519';
  error?: string;
}

export interface EncryptedData {
  ciphertext: string;
  iv: string;
  tag: string;
  algorithm: CryptoAlgorithm;
}
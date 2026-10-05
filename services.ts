export interface TokenBalance {
  symbol: string;
  decimals: number;
  rawBalance: bigint;
}

export interface FormattedBalance {
  symbol: string;
  formatted: string;
  isZero: boolean;
}

export class CryptoService {
  static formatTokenBalance(balance: TokenBalance): FormattedBalance {
    const divisor = BigInt(10 ** balance.decimals);
    const integerPart = balance.rawBalance / divisor;
    const remainder = balance.rawBalance % divisor;

    const remainderStr = remainder.toString().padStart(balance.decimals, '0');
    const trimmedRemainder = remainderStr.replace(/0+$/, '');

    const formatted = trimmedRemainder.length > 0
      ? `${integerPart}.${trimmedRemainder}`
      : integerPart.toString();

    return {
      symbol: balance.symbol,
      formatted,
      isZero: balance.rawBalance === 0n,
    };
  }

  static isValidEthAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  static calculateSlippage(amount: bigint, slippageBps: number): bigint {
    if (slippageBps < 0 || slippageBps > 10000) {
      throw new Error('Slippage must be between 0 and 10000 bps');
    }
    return (amount * BigInt(10000 - slippageBps)) / 10000n;
  }
}

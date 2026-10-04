# wideeyedmessa-utils

`wideeyedmessa-utils` is a robust TypeScript utility library designed for high-performance cryptocurrency data processing and wallet management. It provides type-safe abstractions for handling blockchain primitives, ensuring consistency across your Web3 stack.

## Features

*   **Wei Conversions:** Precision-first arithmetic utilities for converting between Gwei, Ether, and Wei to prevent common rounding errors.
*   **Address Normalization:** Built-in checksum validation and formatting utilities compliant with EIP-55 standards.
*   **Transaction Hash Helpers:** Optimized regex and buffer validation patterns for verifying transaction integrity across EVM-compatible chains.
*   **Zero-Dependency Core:** Lightweight architecture designed for minimal footprint in edge environments like Cloudflare Workers.

## Installation

Install the package via npm or yarn:

```bash
npm install wideeyedmessa-utils
# or
yarn add wideeyedmessa-utils
```

## Usage

```typescript
import { formatWei, isValidAddress } from 'wideeyedmessa-utils';

// Validate an address
const address = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
console.log(isValidAddress(address)); // true

// Convert BigInt values to Ether string
const balance = BigInt('1500000000000000000');
console.log(formatWei(balance)); // "1.5"
```

## Development

To contribute to this utility suite:

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Use `npm run build` to compile the TypeScript source.
4. Run `npm test` to verify changes against the current test suite.

## License

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
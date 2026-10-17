# wideeyedmessa-utils

`wideeyedmessa-utils` is a robust TypeScript utility library engineered for high-performance cryptocurrency data processing and cryptographic address normalization. It provides developers with a reliable toolkit to handle complex blockchain operations, ensuring type-safe interactions across multiple EVM-compatible networks.

### Features

*   **Address Normalization:** Robust utilities for validating and checksumming EIP-55 addresses to prevent common transaction errors.
*   **Unit Conversion:** Seamless big-integer arithmetic for precise Gwei-to-Wei conversions, mitigating floating-point inaccuracies typical in JavaScript.
*   **Signing Helpers:** Streamlined wrappers for generating and verifying ECDSA signatures compatible with common web3 providers.
*   **Zero-Dependency Core:** Lightweight architecture focused on minimal bundle sizes, ideal for integration into edge computing environments or browser-based dApps.

### Installation

Install the package via npm or yarn:

```bash
npm install wideeyedmessa-utils
# or
yarn add wideeyedmessa-utils
```

### Usage

```typescript
import { formatAddress, toWei } from 'wideeyedmessa-utils';

// Normalize user input
const rawAddress = "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe";
const cleanAddress = formatAddress(rawAddress);

// Convert ETH amounts with big-int precision
const amountInWei = toWei("1.5");

console.log(`Normalized Address: ${cleanAddress}`);
console.log(`Value in Wei: ${amountInWei.toString()}`);
```

### License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
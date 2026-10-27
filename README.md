# wideeyedmessa-utils

`wideeyedmessa-utils` is a high-performance TypeScript toolkit designed for EVM-based blockchain integration and data normalization. It streamlines common cryptographic operations and RPC interactions, providing a type-safe foundation for complex decentralized applications.

### Features

*   **EIP-712 Signing Utilities:** Abstracted methods for standardized typed data signing, ensuring compatibility with MetaMask and WalletConnect.
*   **Precision Math Wrappers:** Specialized `BigInt` arithmetic functions to handle wei-to-ether conversions and fix floating-point rounding errors common in Solidity interactions.
*   **ABI Decoding Helpers:** Lightweight, zero-dependency decoders for parsing custom event logs and error signatures without bloating your bundle with full web3.js/ethers.js stacks.
*   **Retry Logic Middleware:** Configurable exponential backoff patterns for fetching data from unreliable RPC providers or subgraphs.

### Installation

Install the package via npm or yarn:

```bash
npm install wideeyedmessa-utils
# or
yarn add wideeyedmessa-utils
```

### Basic Usage

Import the utility suite to handle chain-specific data transformation or signing requirements:

```typescript
import { formatUnits, signTypedData } from 'wideeyedmessa-utils';

// Format raw BigInt from contract call to readable string
const balance = formatUnits(1250000000000000000n, 18);
console.log(`Balance: ${balance} ETH`);

// Simplified signing flow
const signature = await signTypedData({
  domain: { name: 'DApp', chainId: 1 },
  message: { user: '0xabc...' },
  primaryType: 'Auth'
});
```

### Development
This library is built with strict TypeScript configurations to ensure full type inference when working with Ethers v6 or Viem interfaces.

### License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Distributed under the MIT License. See `LICENSE` for more information.
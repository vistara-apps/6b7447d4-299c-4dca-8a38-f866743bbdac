# x402 Payment Flow Implementation

This document describes the x402 payment protocol implementation for StreamerTipKit.

## Overview

The x402 payment flow has been successfully integrated using:
- **wagmi** for wallet connection and management
- **x402-axios** for automatic 402 payment handling
- **USDC on Base** as the payment token

## Implementation Details

### 1. Wallet Configuration (`app/config/wagmi.ts`)

```typescript
import { http, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: 'StreamerTipKit',
      preference: 'smartWalletOnly',
    }),
  ],
  transports: {
    [base.id]: http(),
  },
});
```

**Key Features:**
- Configured for Base network (where USDC is deployed)
- Uses Coinbase Wallet with Smart Wallet support
- HTTP transport for blockchain interactions

### 2. Payment Hook (`app/hooks/useX402Payment.ts`)

The payment hook provides a clean interface for x402 payments:

```typescript
const { sendPayment, isLoading, error, isConnected, address, paymentClient } = useX402Payment();
```

**Features:**
- Automatically creates x402-enabled axios client
- Handles payment interceptor setup
- Extracts transaction hashes from payment responses
- Provides loading, error, and connection states

**How it works:**
1. Creates an axios instance with x402 payment interceptor
2. When a 402 response is received, automatically:
   - Extracts payment requirements from response
   - Creates payment header using wallet client
   - Retries request with payment header
   - Returns transaction hash in X-PAYMENT-RESPONSE header

### 3. Wallet Connection (`app/components/WalletConnect.tsx`)

```typescript
const { address, isConnected } = useAccount();
const { connect, connectors } = useConnect();
const { disconnect } = useDisconnect();
```

**Features:**
- Shows connection status with visual feedback
- Displays connected wallet address (truncated)
- Toggle connect/disconnect functionality
- Uses Coinbase Wallet connector

### 4. Tip Form Integration (`app/components/TipJarScreen.tsx`)

```typescript
const result = await sendPayment({
  endpoint: '/api/tips',
  data: {
    recipientAddress: STREAMER_ADDRESS,
    amount: amount.toString(),
    message: message || undefined,
  },
});
```

**Features:**
- Form validation (minimum $0.10)
- Loading states during payment
- Success/error feedback with visual indicators
- Transaction hash display with Basescan link
- Automatic form reset after successful payment

## Payment Flow

1. **User connects wallet** using WalletConnect component
2. **User enters tip amount and message**
3. **User clicks "Send Tip"**
4. **Payment hook creates x402-axios client** with wallet client as signer
5. **Request sent to x402-protected endpoint** (`/api/tips`)
6. **If 402 response:**
   - Payment requirements extracted
   - Payment header created and signed
   - Request automatically retried with payment
7. **Transaction confirmed** and hash returned
8. **Success message displayed** with Basescan link

## USDC on Base Integration

**USDC Contract Address:** `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`

The x402 protocol handles USDC transfers using EIP-3009 (Transfer With Authorization), which allows:
- Gasless USDC transfers
- Signed authorizations for transfers
- No need for separate approval transactions

## Error Handling

The implementation includes comprehensive error handling:

1. **Wallet not connected:** Prompt to connect wallet
2. **Invalid amount:** Show validation error
3. **Payment failure:** Display error message with details
4. **Network errors:** Graceful error messages

## Testing the Flow

### Prerequisites
1. Wallet with USDC on Base network
2. Connected to Base network
3. x402-protected API endpoint configured

### Test Steps
1. Open the application
2. Click "Connect your Wallet"
3. Authorize wallet connection
4. Enter tip amount (min $0.10)
5. Optionally add a message
6. Click "Send Tip"
7. Verify loading state appears
8. Verify transaction on Basescan when complete

## Environment Variables

```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key
NEXT_PUBLIC_API_URL=your_api_url  # Optional, for x402 endpoints
```

## Dependencies

```json
{
  "dependencies": {
    "@coinbase/onchainkit": "^0.38.19",
    "@tanstack/react-query": "^5.62.11",
    "wagmi": "^2.14.11",
    "viem": "^2.27.2",
    "x402-axios": "^0.7.0"
  }
}
```

## Transaction Confirmations

Transaction confirmations are handled automatically by:
1. The x402 protocol settling the payment
2. The response including transaction hash
3. Links to Basescan for verification
4. Visual feedback in the UI

## Security Considerations

1. **Wallet signatures:** All payments require wallet signature
2. **Payment verification:** x402 protocol validates all payments
3. **Smart Wallet:** Using Coinbase Smart Wallet for enhanced security
4. **USDC authorization:** EIP-3009 Transfer With Authorization for secure transfers
5. **No private keys stored:** All operations use wallet client

## Future Enhancements

Potential improvements:
1. Add webhook for real-time tip notifications
2. Display tip history from blockchain
3. Multi-token support (ETH, other ERC20s)
4. Tip goals and progress tracking
5. Loyalty badges based on on-chain data

## Troubleshooting

### Build Warnings
The build may show warnings about optional dependencies (@react-native-async-storage, pino-pretty). These are safe to ignore as they're related to unused connector features.

### Payment Failures
If payments fail:
1. Check wallet has sufficient USDC
2. Verify connected to Base network
3. Check API endpoint is responding with 402
4. Verify wallet client is properly initialized

## References

- [x402 Protocol Documentation](https://github.com/coinbase/x402)
- [x402-axios Package](https://github.com/coinbase/x402/tree/main/typescript/packages/x402-axios)
- [Wagmi Documentation](https://wagmi.sh)
- [OnchainKit Documentation](https://onchainkit.xyz)
- [USDC on Base](https://www.circle.com/en/usdc-multichain/base)

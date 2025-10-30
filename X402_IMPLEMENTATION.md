# X402 Payment Flow Implementation

## Overview
This document describes the x402 payment flow implementation for StreamerTipKit using wagmi's `useWalletClient` and `x402-axios`.

## Implementation Details

### 1. Dependencies
- **wagmi**: Wallet connection and client management
- **x402-axios**: Payment processing through x402 protocol
- **viem**: Ethereum utility functions
- **@coinbase/onchainkit**: Base chain integration

### 2. Architecture

#### Configuration (`app/config/`)
- **wagmi.ts**: Wagmi configuration with Coinbase Wallet connector
- **constants.ts**: USDC token address and chain constants for Base

#### Hooks (`app/hooks/`)
- **useX402Payment.ts**: Custom hook for handling x402 payments with:
  - Payment processing logic
  - Transaction status management
  - Error handling
  - Wallet connection validation

#### Components (`app/components/`)
- **WalletConnect.tsx**: Wallet connection UI with wagmi hooks
- **TipJarScreen.tsx**: Main tipping interface with x402 payment integration

### 3. Payment Flow

1. **Wallet Connection**
   - User connects wallet via Coinbase Wallet (Smart Wallet preferred)
   - Connection state managed by wagmi

2. **Payment Initiation**
   - User enters tip amount (minimum 0.10 USDC)
   - Optional message for the streamer
   - Validation of wallet connection and amount

3. **Transaction Processing**
   - Convert amount to USDC units (6 decimals)
   - Create transaction data for USDC transfer
   - Sign message with wallet client
   - Send payment through x402 API with signed header
   - Track transaction status

4. **Confirmation**
   - Display transaction hash
   - Link to Basescan for verification
   - Success/error feedback to user

### 4. USDC on Base Integration

**Token Details:**
- **Address**: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- **Decimals**: 6
- **Chain**: Base (Chain ID: 8453)
- **Explorer**: https://basescan.org

### 5. Error Handling

The implementation includes comprehensive error handling for:
- Wallet not connected
- Insufficient balance
- Transaction failures
- Network errors
- x402 API errors

Each error is displayed to the user with a clear message and actionable feedback.

### 6. Transaction Confirmation

Transaction confirmations are handled through:
- Real-time status updates during processing
- Transaction hash display on success
- Direct link to Basescan for verification
- Dismissible status notifications

## Testing Instructions

### Manual Testing

1. **Wallet Connection**
   ```
   ✓ Click "Connect Wallet on Base"
   ✓ Connect via Coinbase Wallet
   ✓ Verify address displayed correctly
   ✓ Test disconnect functionality
   ```

2. **Payment Flow**
   ```
   ✓ Enter amount < 0.10 USDC (should be disabled)
   ✓ Enter valid amount ≥ 0.10 USDC
   ✓ Add optional message
   ✓ Click "Send Tip"
   ✓ Verify processing state shown
   ✓ Check transaction success message
   ✓ Verify transaction hash link works
   ```

3. **Error Scenarios**
   ```
   ✓ Try sending without wallet connected
   ✓ Try sending with insufficient balance
   ✓ Verify error messages are user-friendly
   ✓ Test error dismissal
   ```

4. **Transaction Verification**
   ```
   ✓ Click transaction hash link
   ✓ Verify transaction on Basescan
   ✓ Confirm USDC transfer to recipient
   ✓ Check transaction status
   ```

### Environment Variables

Add to `.env.local`:
```bash
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
NEXT_PUBLIC_X402_API_URL=https://api.x402.io  # Optional, defaults to this
```

## API Integration

### X402 Payment Header

The implementation adds x402 payment information to request headers:
```typescript
{
  "X-402-Payment": {
    "amount": "100000",  // Amount in USDC units
    "token": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",  // USDC address
    "signature": "0x...",  // Wallet signature
    "message": "Pay 0.1 USDC to 0x..."  // Human-readable message
  }
}
```

### Payment Request

POST to `/v1/payments`:
```typescript
{
  "from": "0x...",  // Sender address
  "to": "0x...",    // Recipient address
  "amount": "100000",  // Amount in USDC units
  "token": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  "chainId": 8453,  // Base chain ID
  "metadata": {
    "message": "Optional tip message"
  }
}
```

## Security Considerations

1. **Signature Verification**: All payments require wallet signature
2. **Amount Validation**: Client-side validation prevents invalid amounts
3. **Network Validation**: Transactions only on Base mainnet
4. **Error Exposure**: Sensitive error details not exposed to users

## Future Enhancements

- [ ] Add transaction confirmation polling
- [ ] Implement transaction history
- [ ] Add support for other tokens
- [ ] Integrate with Farcaster notifications
- [ ] Add gas estimation display
- [ ] Implement transaction speedup options

## Support

For issues or questions:
- Check transaction on [Basescan](https://basescan.org)
- Review error messages in browser console
- Verify wallet connection status
- Ensure sufficient USDC balance on Base

## References

- [Wagmi Documentation](https://wagmi.sh)
- [x402 Protocol](https://x402.io)
- [OnchainKit Docs](https://onchainkit.xyz)
- [Base Network](https://base.org)
- [USDC on Base](https://www.circle.com/en/usdc)

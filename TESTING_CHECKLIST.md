# X402 Payment Flow Testing Checklist

## Pre-Testing Setup

- [ ] Set up `.env.local` with OnchainKit API key
- [ ] Ensure wallet has USDC on Base network
- [ ] Note test wallet address
- [ ] Have Basescan open for transaction verification

## 1. Wallet Connection Tests

### Basic Connection
- [ ] Load the application
- [ ] Click "Connect Wallet on Base" button
- [ ] Successfully connect with Coinbase Wallet
- [ ] Verify wallet address displays correctly (first 6 and last 4 chars)
- [ ] Verify "Connected" status shows with green checkmark
- [ ] Click "Disconnect" and verify wallet disconnects

### Connection States
- [ ] Verify UI updates immediately when wallet connects
- [ ] Test reconnection after disconnect
- [ ] Verify connection persists across page refreshes (if applicable)

## 2. Payment Flow Tests

### Valid Payment (Happy Path)
- [ ] Connect wallet
- [ ] Enter amount: `1.00` USDC
- [ ] Enter message: "Test tip from x402 integration"
- [ ] Click "Send Tip" button
- [ ] Verify button changes to "Processing..." with spinner
- [ ] Verify form fields become disabled during processing
- [ ] Wait for transaction to complete
- [ ] Verify success message displays with green background
- [ ] Verify transaction hash is shown
- [ ] Click transaction hash link
- [ ] Verify Basescan opens with correct transaction
- [ ] Verify USDC transfer on Basescan:
  - Correct amount
  - Correct recipient address
  - Transaction confirmed
- [ ] Verify form clears after successful transaction
- [ ] Verify can dismiss success notification

### Minimum Amount
- [ ] Enter amount: `0.10` USDC (minimum)
- [ ] Verify "Send Tip" button is enabled
- [ ] Successfully send transaction
- [ ] Verify 0.10 USDC transferred

### Below Minimum Amount
- [ ] Enter amount: `0.05` USDC (below minimum)
- [ ] Verify "Send Tip" button is disabled
- [ ] Try to send (should not be possible)
- [ ] Verify helper text shows "Minimum: 0.10 USDC"

### Optional Message
- [ ] Send tip without message
- [ ] Verify transaction succeeds
- [ ] Send tip with short message (< 50 chars)
- [ ] Send tip with longer message (> 100 chars)
- [ ] Verify all scenarios work correctly

### Multiple Sequential Transactions
- [ ] Send first tip (1.00 USDC)
- [ ] Wait for confirmation
- [ ] Dismiss success notification
- [ ] Send second tip (0.50 USDC)
- [ ] Verify both transactions succeed independently

## 3. Error Handling Tests

### Wallet Not Connected
- [ ] Ensure wallet is disconnected
- [ ] Verify form fields are disabled
- [ ] Verify "Send Tip" button is disabled
- [ ] Verify helper text shows "Please connect your wallet to send tips"

### Insufficient Balance
- [ ] Use wallet with < 0.10 USDC balance
- [ ] Try to send 0.10 USDC tip
- [ ] Verify appropriate error message displays
- [ ] Verify error has red background with alert icon
- [ ] Verify can dismiss error notification

### Network/API Errors
- [ ] Test with poor network connection
- [ ] Verify timeout errors are handled gracefully
- [ ] Verify error messages are user-friendly
- [ ] Test API unavailability (if possible)

### User Rejection
- [ ] Start payment flow
- [ ] Reject transaction in wallet
- [ ] Verify error displays: "User rejected transaction" or similar
- [ ] Verify app state returns to ready (not stuck processing)

### Invalid Recipient Address
- [ ] (Developer test) Temporarily set invalid recipient address
- [ ] Try to send tip
- [ ] Verify appropriate validation error

## 4. UI/UX Tests

### Loading States
- [ ] Verify loading spinner appears during processing
- [ ] Verify button text changes to "Processing..."
- [ ] Verify form becomes disabled during processing
- [ ] Verify no double-submission possible

### Status Notifications
- [ ] Verify processing notification (blue background)
- [ ] Verify success notification (green background)
- [ ] Verify error notification (red background)
- [ ] Test dismissing each notification type
- [ ] Verify notifications don't overlap

### Responsive Design
- [ ] Test on mobile viewport (375px)
- [ ] Test on tablet viewport (768px)
- [ ] Test on desktop viewport (1024px+)
- [ ] Verify all text is readable
- [ ] Verify buttons are tappable/clickable
- [ ] Verify forms are usable on all sizes

### Accessibility
- [ ] Tab through all interactive elements
- [ ] Verify focus indicators visible
- [ ] Test form submission with Enter key
- [ ] Verify error messages are announced (if screen reader available)

## 5. Transaction Verification Tests

### Basescan Verification
For each successful transaction:
- [ ] Open transaction on Basescan
- [ ] Verify transaction status: "Success"
- [ ] Verify "From" address matches connected wallet
- [ ] Verify "To" address matches streamer address
- [ ] Verify token: USDC
- [ ] Verify amount matches input amount
- [ ] Verify gas fees are reasonable
- [ ] Check transaction timestamp
- [ ] Verify transaction is on Base network (chain ID 8453)

### Transaction Hash
- [ ] Verify hash format is valid (0x + 64 hex chars)
- [ ] Copy hash and search on Basescan independently
- [ ] Verify matches the transaction

## 6. Edge Cases

### Special Characters in Message
- [ ] Send tip with emoji in message: "Great stream! 🎉"
- [ ] Send tip with special chars: "Thanks & keep going!"
- [ ] Verify messages are handled correctly

### Decimal Amounts
- [ ] Enter `0.1` (one decimal)
- [ ] Enter `0.10` (two decimals)
- [ ] Enter `1.234567` (many decimals)
- [ ] Verify amounts are formatted correctly to 6 decimals

### Browser/Wallet Interactions
- [ ] Close and reopen wallet during transaction
- [ ] Switch to different tab during processing
- [ ] Test with browser back button
- [ ] Verify app remains functional

## 7. Performance Tests

### Transaction Speed
- [ ] Record time from "Send Tip" click to success notification
- [ ] Should complete within 10-30 seconds (network dependent)
- [ ] Verify no UI freezing during processing

### Multiple Users
- [ ] (If possible) Test with multiple wallets simultaneously
- [ ] Verify transactions don't interfere
- [ ] Check Basescan for correct attribution

## 8. Integration Tests

### X402 Protocol
- [ ] Verify X-402-Payment header is sent (check network tab)
- [ ] Verify signature is included in header
- [ ] Verify payment amount matches in header
- [ ] Verify token address is correct

### Wagmi Integration
- [ ] Verify useWalletClient hook provides client
- [ ] Verify useAccount hook provides address
- [ ] Verify wallet state syncs correctly
- [ ] Test connector initialization

### OnchainKit Integration
- [ ] Verify OnchainKitProvider wraps correctly
- [ ] Verify Base chain configuration
- [ ] Test with OnchainKit components (if any)

## Test Environment Details

**Fill in during testing:**
- Date: _______________
- Tester: _______________
- Wallet Address: _______________
- Base Network RPC: _______________
- USDC Balance Before: _______________
- USDC Balance After: _______________

## Test Results Summary

**Passed Tests:** ___ / Total Tests

**Failed Tests:** (list below)
1. _______________
2. _______________

**Blockers:** (if any)
1. _______________
2. _______________

**Notes:**
_______________
_______________
_______________

## Sign-off

- [ ] All critical path tests pass
- [ ] All error scenarios handled appropriately
- [ ] Transaction verification successful on Basescan
- [ ] UI/UX is acceptable
- [ ] Ready for deployment

**Tester Signature:** _______________
**Date:** _______________

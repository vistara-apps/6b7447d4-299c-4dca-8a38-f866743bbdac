import { useState, useCallback } from 'react';
import { useWalletClient, useAccount } from 'wagmi';
import axios from 'axios';
import { USDC_BASE_ADDRESS, USDC_DECIMALS } from '../config/constants';
import { parseUnits, formatUnits } from 'viem';

interface PaymentParams {
  amount: string;
  recipientAddress: string;
  message?: string;
}

interface PaymentResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

export interface PaymentStatus {
  isProcessing: boolean;
  isSuccess: boolean;
  error: string | null;
  txHash: string | null;
}

export function useX402Payment() {
  const { data: walletClient } = useWalletClient();
  const { address, isConnected } = useAccount();
  const [status, setStatus] = useState<PaymentStatus>({
    isProcessing: false,
    isSuccess: false,
    error: null,
    txHash: null,
  });

  const resetStatus = useCallback(() => {
    setStatus({
      isProcessing: false,
      isSuccess: false,
      error: null,
      txHash: null,
    });
  }, []);

  const sendPayment = useCallback(
    async ({ amount, recipientAddress, message }: PaymentParams): Promise<PaymentResult> => {
      // Reset previous status
      resetStatus();

      if (!isConnected || !address) {
        const error = 'Please connect your wallet first';
        setStatus({
          isProcessing: false,
          isSuccess: false,
          error,
          txHash: null,
        });
        return { success: false, error };
      }

      if (!walletClient) {
        const error = 'Wallet client not available';
        setStatus({
          isProcessing: false,
          isSuccess: false,
          error,
          txHash: null,
        });
        return { success: false, error };
      }

      try {
        setStatus({
          isProcessing: true,
          isSuccess: false,
          error: null,
          txHash: null,
        });

        // Convert amount to USDC units (6 decimals)
        const amountInUnits = parseUnits(amount, USDC_DECIMALS);

        // Prepare the transaction data for USDC transfer
        const transferData = {
          from: address,
          to: USDC_BASE_ADDRESS,
          data: encodeFunctionData({
            functionName: 'transfer',
            args: [recipientAddress, amountInUnits],
          }),
        };

        // Create x402-axios instance with wallet client
        const x402Client = axios.create({
          baseURL: process.env.NEXT_PUBLIC_X402_API_URL || 'https://api.x402.io',
        });

        // Add x402 payment header interceptor
        x402Client.interceptors.request.use(
          async (config) => {
            // Sign the payment request
            if (walletClient && address) {
              const message = `Pay ${amount} USDC to ${recipientAddress}`;
              const signature = await walletClient.signMessage({
                account: address,
                message,
              });
              
              config.headers['X-402-Payment'] = JSON.stringify({
                amount: amountInUnits.toString(),
                token: USDC_BASE_ADDRESS,
                signature,
                message,
              });
            }
            return config;
          },
          (error) => Promise.reject(error)
        );

        // Send the transaction through x402
        const response = await x402Client.post('/v1/payments', {
          from: address,
          to: recipientAddress,
          amount: amountInUnits.toString(),
          token: USDC_BASE_ADDRESS,
          chainId: 8453, // Base chain ID
          metadata: {
            message: message || '',
          },
        });

        const txHash = response.data.txHash;

        setStatus({
          isProcessing: false,
          isSuccess: true,
          error: null,
          txHash,
        });

        return { success: true, txHash };
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Payment failed';
        
        setStatus({
          isProcessing: false,
          isSuccess: false,
          error: errorMessage,
          txHash: null,
        });

        return { success: false, error: errorMessage };
      }
    },
    [walletClient, address, isConnected, resetStatus]
  );

  return {
    sendPayment,
    status,
    resetStatus,
    isConnected,
    address,
  };
}

// Helper function to encode USDC transfer function call
function encodeFunctionData({
  functionName,
  args,
}: {
  functionName: string;
  args: any[];
}): `0x${string}` {
  // ERC20 transfer function signature
  const transferSelector = '0xa9059cbb';
  
  // Encode the recipient address (pad to 32 bytes)
  const recipient = args[0].slice(2).padStart(64, '0');
  
  // Encode the amount (pad to 32 bytes)
  const amount = args[1].toString(16).padStart(64, '0');
  
  return `${transferSelector}${recipient}${amount}` as `0x${string}`;
}

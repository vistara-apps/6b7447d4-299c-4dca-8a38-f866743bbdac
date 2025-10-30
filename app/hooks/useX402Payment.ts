import { useState, useCallback, useMemo } from 'react';
import { useWalletClient, useAccount } from 'wagmi';
import { withPaymentInterceptor } from 'x402-axios';
import axios from 'axios';

interface PaymentResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
}

interface PaymentParams {
  endpoint: string;
  data?: any;
}

export function useX402Payment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: walletClient } = useWalletClient();
  const { address, isConnected } = useAccount();

  // Create axios client with x402 payment interceptor
  const paymentClient = useMemo(() => {
    if (!walletClient) return null;

    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || '',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add payment interceptor with wallet client as the signer
    return withPaymentInterceptor(axiosInstance, walletClient as any);
  }, [walletClient]);

  const sendPayment = useCallback(
    async ({ endpoint, data }: PaymentParams): Promise<PaymentResult> => {
      setIsLoading(true);
      setError(null);

      try {
        if (!isConnected || !walletClient) {
          throw new Error('Wallet not connected');
        }

        if (!address) {
          throw new Error('No wallet address found');
        }

        if (!paymentClient) {
          throw new Error('Payment client not initialized');
        }

        // Execute request through x402 - it will automatically handle 402 responses
        const response = await paymentClient.post(endpoint, data);

        // Extract transaction hash from the X-PAYMENT-RESPONSE header if available
        const paymentResponse = response.headers['x-payment-response'];
        let transactionHash: string | undefined;

        if (paymentResponse) {
          try {
            // Payment response is base64 encoded
            const decoded = JSON.parse(atob(paymentResponse));
            transactionHash = decoded.transactionHash || decoded.txHash;
          } catch (e) {
            console.warn('Could not decode payment response:', e);
          }
        }

        return {
          success: true,
          transactionHash: transactionHash || 'Payment processed successfully',
        };
      } catch (err: any) {
        const errorMessage = err?.response?.data?.message || err?.message || 'Payment failed. Please try again.';
        setError(errorMessage);
        
        console.error('Payment error:', err);
        
        return {
          success: false,
          error: errorMessage,
        };
      } finally {
        setIsLoading(false);
      }
    },
    [paymentClient, walletClient, address, isConnected]
  );

  return {
    sendPayment,
    isLoading,
    error,
    isConnected,
    address,
    paymentClient,
  };
}

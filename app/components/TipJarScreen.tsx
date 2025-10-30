'use client';

import { useState } from 'react';
import { Coins, Sparkles, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import WalletConnect from './WalletConnect';
import { useX402Payment } from '../hooks/useX402Payment';

// Example recipient address - in production this would come from the streamer's profile
const STREAMER_ADDRESS = '0x1234567890123456789012345678901234567890';

export default function TipJarScreen() {
  const [tipAmount, setTipAmount] = useState('');
  const [message, setMessage] = useState('');
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { sendPayment, isLoading, error, isConnected } = useX402Payment();

  const handleTip = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    const amount = parseFloat(tipAmount);
    if (isNaN(amount) || amount < 0.1) {
      alert('Minimum tip amount is $0.10');
      return;
    }

    setShowSuccess(false);
    setTransactionHash(null);

    // Send payment to x402-protected endpoint
    const result = await sendPayment({
      endpoint: '/api/tips',
      data: {
        recipientAddress: STREAMER_ADDRESS,
        amount: amount.toString(),
        message: message || undefined,
      },
    });

    if (result.success && result.transactionHash) {
      setTransactionHash(result.transactionHash);
      setShowSuccess(true);
      // Reset form after successful payment
      setTimeout(() => {
        setTipAmount('');
        setMessage('');
        setShowSuccess(false);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">TIP JAR</h1>
          <h2 className="text-3xl font-bold">STREAM</h2>
        </div>

        {/* Hero Card */}
        <div className="card mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20"></div>
          <div className="relative z-10 text-center py-12">
            <div className="flex justify-center gap-4 mb-6">
              <Coins className="text-yellow-400" size={32} />
              <Sparkles className="text-purple-400" size={32} />
              <Coins className="text-yellow-400" size={32} />
            </div>
            <button 
              className="btn-primary"
              onClick={() => document.getElementById('tip-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Tip now
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Send Crypto Tips</h3>
          <p className="text-muted leading-relaxed mb-6">
            Send <span className="text-primary font-semibold">crypto tips</span> starting from $0.10 USD.
            Tips are sent instantly via USDC on Base network.
            Support your favorite streamers with secure, fast blockchain payments.
          </p>
        </div>

        {/* Wallet Connect */}
        <WalletConnect />

        {/* Success Message */}
        {showSuccess && transactionHash && (
          <div className="card mt-6 bg-green-500/10 border border-green-500/30">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-500" size={24} />
              <div className="flex-1">
                <p className="font-semibold text-green-500">Tip Sent Successfully!</p>
                <a
                  href={`https://basescan.org/tx/${transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted hover:text-primary transition-colors"
                >
                  View on Basescan →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && !isLoading && (
          <div className="card mt-6 bg-red-500/10 border border-red-500/30">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-red-500" size={24} />
              <div className="flex-1">
                <p className="font-semibold text-red-500">Payment Failed</p>
                <p className="text-xs text-muted">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tip Form */}
        <div id="tip-form" className="card mt-6">
          <h3 className="text-lg font-semibold mb-4">Send a Tip</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-muted mb-2">Amount (USD)</label>
              <input
                type="number"
                value={tipAmount}
                onChange={(e) => setTipAmount(e.target.value)}
                placeholder="0.10"
                step="0.01"
                min="0.1"
                className="input-field"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm text-muted mb-2">Message (Optional)</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Say something nice..."
                rows={3}
                className="input-field resize-none"
                disabled={isLoading}
              />
            </div>

            <button
              onClick={handleTip}
              disabled={!isConnected || !tipAmount || parseFloat(tipAmount) < 0.1 || isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                'Send Tip'
              )}
            </button>

            {!isConnected && (
              <p className="text-xs text-center text-muted">
                Please connect your wallet to send tips
              </p>
            )}
          </div>
        </div>

        {/* Skip Button */}
        <button className="btn-secondary w-full mt-4">
          Skip now
        </button>
      </div>
    </div>
  );
}

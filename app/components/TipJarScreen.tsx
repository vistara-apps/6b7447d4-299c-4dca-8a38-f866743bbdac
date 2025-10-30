'use client';

import { useState } from 'react';
import { Coins, Sparkles, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import WalletConnect from './WalletConnect';
import { useX402Payment } from '../hooks/useX402Payment';

// Default streamer address - this should be configured per streamer
const STREAMER_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1'; // Example address

export default function TipJarScreen() {
  const [tipAmount, setTipAmount] = useState('');
  const [message, setMessage] = useState('');
  const { sendPayment, status, resetStatus, isConnected } = useX402Payment();

  const handleTip = async () => {
    if (!tipAmount || parseFloat(tipAmount) < 0.1) {
      return;
    }

    const result = await sendPayment({
      amount: tipAmount,
      recipientAddress: STREAMER_ADDRESS,
      message,
    });

    if (result.success) {
      // Clear form on success
      setTipAmount('');
      setMessage('');
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
            <button className="btn-primary">
              Tip now
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Connect 1 Tips</h3>
          <p className="text-muted leading-relaxed mb-6">
            Send <span className="text-primary font-semibold">crypto tips</span> from 0.1 USD eqst.
            Live streamers sends instant to your in-cb. It be
            Gallery your story from live streamer
            connected with the BSC icon in live stream.
          </p>
        </div>

        {/* Wallet Connect */}
        <WalletConnect />

        {/* Transaction Status */}
        {status.isProcessing && (
          <div className="card mt-6 bg-blue-500/10 border-blue-500/20">
            <div className="flex items-center gap-3">
              <Loader2 className="animate-spin text-blue-400" size={20} />
              <div>
                <p className="font-semibold text-blue-400">Processing Payment...</p>
                <p className="text-sm text-muted">Please wait while we process your transaction</p>
              </div>
            </div>
          </div>
        )}

        {status.isSuccess && status.txHash && (
          <div className="card mt-6 bg-green-500/10 border-green-500/20">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-400 flex-shrink-0 mt-1" size={20} />
              <div className="flex-1">
                <p className="font-semibold text-green-400 mb-2">Payment Successful! 🎉</p>
                <p className="text-sm text-muted mb-2">Your tip has been sent to the streamer</p>
                <a
                  href={`https://basescan.org/tx/${status.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:text-accent transition-colors break-all"
                >
                  View on Basescan: {status.txHash.slice(0, 10)}...{status.txHash.slice(-8)}
                </a>
              </div>
              <button
                onClick={resetStatus}
                className="text-xs text-muted hover:text-fg transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {status.error && (
          <div className="card mt-6 bg-red-500/10 border-red-500/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-red-400 flex-shrink-0 mt-1" size={20} />
              <div className="flex-1">
                <p className="font-semibold text-red-400 mb-1">Payment Failed</p>
                <p className="text-sm text-muted">{status.error}</p>
              </div>
              <button
                onClick={resetStatus}
                className="text-xs text-muted hover:text-fg transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Tip Form */}
        <div className="card mt-6">
          <h3 className="text-lg font-semibold mb-4">Send a Tip</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-muted mb-2">Amount (USDC on Base)</label>
              <input
                type="number"
                value={tipAmount}
                onChange={(e) => setTipAmount(e.target.value)}
                placeholder="0.10"
                step="0.01"
                min="0.1"
                className="input-field"
                disabled={!isConnected || status.isProcessing}
              />
              <p className="text-xs text-muted mt-1">Minimum: 0.10 USDC</p>
            </div>

            <div>
              <label className="block text-sm text-muted mb-2">Message (Optional)</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Say something nice..."
                rows={3}
                className="input-field resize-none"
                disabled={!isConnected || status.isProcessing}
              />
            </div>

            <button
              onClick={handleTip}
              disabled={!isConnected || !tipAmount || parseFloat(tipAmount) < 0.1 || status.isProcessing}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {status.isProcessing ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                <>
                  <Coins size={20} />
                  Send Tip
                </>
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

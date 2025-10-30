'use client';

import { useState } from 'react';
import { Coins, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import WalletConnect from './WalletConnect';

export default function TipJarScreen() {
  const [tipAmount, setTipAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleTip = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Transaction logic will be implemented here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      console.log('Sending tip:', { amount: tipAmount, message });
      setSuccess(true);
      setTipAmount('');
      setMessage('');
      
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to send tip. Please try again.');
      console.error('Error sending tip:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center pt-4">
          <h1 className="text-4xl font-bold mb-3">StreamerTipKit</h1>
          <p className="text-base text-muted">Support your favorite streamers onchain</p>
        </div>

        {/* Hero Card */}
        <div className="card relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
          <div className="relative z-10 text-center py-10">
            <div className="flex justify-center gap-4 mb-8 animate-bounce-slow">
              <Coins className="text-yellow-400" size={36} />
              <Sparkles className="text-purple-400" size={36} />
              <Coins className="text-yellow-400" size={36} />
            </div>
            <h2 className="text-xl font-bold mb-2">Start Tipping</h2>
            <p className="text-muted text-sm mb-6">Send crypto tips instantly on Base</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-3">How It Works</h3>
          <div className="space-y-3 text-muted leading-relaxed">
            <p>✨ Send <span className="text-primary font-semibold">crypto tips</span> starting from $0.10</p>
            <p>⚡ Instant transfers to streamers on Base</p>
            <p>💰 Low fees, maximum impact</p>
          </div>
        </div>

        {/* Wallet Connect */}
        <WalletConnect />

        {/* Success Message */}
        {success && (
          <div className="card bg-green-500 bg-opacity-10 border-green-500 border-opacity-30">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-green-400">Tip sent successfully!</p>
                <p className="text-sm text-green-300 text-opacity-80">Your support means everything</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="card bg-red-500 bg-opacity-10 border-red-500 border-opacity-30" role="alert">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
              <div>
                <p className="font-semibold text-red-400">Error</p>
                <p className="text-sm text-red-300 text-opacity-80">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tip Form */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-6">Send a Tip</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="tip-amount" className="block text-sm font-medium text-muted mb-2">
                Amount (USD)
              </label>
              <input
                id="tip-amount"
                type="number"
                value={tipAmount}
                onChange={(e) => setTipAmount(e.target.value)}
                placeholder="0.10"
                step="0.01"
                min="0.1"
                className="input-field"
                aria-required="true"
                aria-describedby="tip-amount-help"
                disabled={isLoading}
              />
              <p id="tip-amount-help" className="text-xs text-muted mt-1">
                Minimum tip amount is $0.10
              </p>
            </div>

            <div>
              <label htmlFor="tip-message" className="block text-sm font-medium text-muted mb-2">
                Message (Optional)
              </label>
              <textarea
                id="tip-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Say something nice..."
                rows={3}
                maxLength={280}
                className="input-field resize-none"
                aria-describedby="tip-message-help"
                disabled={isLoading}
              />
              <p id="tip-message-help" className="text-xs text-muted mt-1">
                {message.length}/280 characters
              </p>
            </div>

            <button
              onClick={handleTip}
              disabled={!tipAmount || parseFloat(tipAmount) < 0.1 || isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2"
              aria-label="Send tip"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Sending...</span>
                </>
              ) : (
                !tipAmount || parseFloat(tipAmount) < 0.1 
                  ? 'Enter amount to continue' 
                  : `Send $${parseFloat(tipAmount).toFixed(2)} Tip`
              )}
            </button>
          </div>
        </div>

        {/* Browse Button */}
        <button className="btn-secondary w-full" aria-label="Browse streamers">
          Browse Streamers
        </button>
      </div>
    </div>
  );
}

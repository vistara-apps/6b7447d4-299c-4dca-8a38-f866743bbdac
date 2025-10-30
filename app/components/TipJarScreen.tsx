'use client';

import { useState } from 'react';
import { Coins, Sparkles } from 'lucide-react';
import WalletConnect from './WalletConnect';

export default function TipJarScreen() {
  const [tipAmount, setTipAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleTip = () => {
    // Transaction logic will be implemented here
    console.log('Sending tip:', { amount: tipAmount, message });
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

        {/* Tip Form */}
        <div className="card mt-6">
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
              />
            </div>

            <button
              onClick={handleTip}
              disabled={!tipAmount || parseFloat(tipAmount) < 0.1}
              className="btn-primary w-full"
            >
              Send Tip
            </button>
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

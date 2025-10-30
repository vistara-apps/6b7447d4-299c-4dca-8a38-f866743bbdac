'use client';

import { DollarSign, Clock, TrendingUp } from 'lucide-react';

interface Tip {
  id: string;
  username: string;
  amount: number;
  timestamp: string;
  type: 'realtime' | 'recent';
}

const mockTips: Tip[] = [
  { id: '1', username: 'DoraKit Donater', amount: 0.10, timestamp: 'Just now', type: 'realtime' },
  { id: '2', username: 'Crypto Ken Klatt', amount: 1.00, timestamp: '2m ago', type: 'recent' },
  { id: '3', username: 'SEC', amount: 6.40, timestamp: '5m ago', type: 'recent' },
  { id: '4', username: 'Fisk', amount: 3.00, timestamp: '12m ago', type: 'recent' },
];

export default function TipsScreen() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">TIP</h1>
          <h2 className="text-3xl font-bold mb-2">HISTORY</h2>
          <p className="text-muted">On Base Chain</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className="card text-center hover:bg-opacity-80 transition-all duration-200">
            <DollarSign className="mx-auto mb-2 text-primary" size={24} />
            <p className="text-2xl font-bold">$10.50</p>
            <p className="text-sm text-muted mt-1">Total Received</p>
          </button>
          
          <button className="card text-center hover:bg-opacity-80 transition-all duration-200">
            <TrendingUp className="mx-auto mb-2 text-primary" size={24} />
            <p className="text-2xl font-bold">Recent Tips</p>
          </button>
        </div>

        {/* Donor Info */}
        <div className="card mb-6">
          <p className="text-center text-muted">DoraKit Donater</p>
        </div>

        {/* Real Time Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock size={20} className="text-primary" />
            Real Time
          </h3>
          <p className="text-sm text-muted mb-4">Live tip updates</p>
          
          {mockTips
            .filter(tip => tip.type === 'realtime')
            .map(tip => (
              <div key={tip.id} className="card mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <p className="font-semibold">{tip.username}</p>
                    <p className="text-sm text-muted">{tip.timestamp}</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-primary">${tip.amount.toFixed(2)}</p>
              </div>
            ))}
        </div>

        {/* Recent Tips Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Recent tips</h3>
          
          {mockTips
            .filter(tip => tip.type === 'recent')
            .map(tip => (
              <div key={tip.id} className="card mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center border border-primary">
                    <span className="text-sm font-bold">{tip.username.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{tip.username}</p>
                    <p className="text-sm text-muted">Base Chain wallet</p>
                  </div>
                </div>
                <p className="text-xl font-bold">${tip.amount.toFixed(3)}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

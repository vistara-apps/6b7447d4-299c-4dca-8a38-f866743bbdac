'use client';

import { DollarSign, Clock, TrendingUp, Inbox } from 'lucide-react';

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
  const hasTips = mockTips.length > 0;
  const recentTips = mockTips.filter(tip => tip.type === 'recent');
  const realtimeTips = mockTips.filter(tip => tip.type === 'realtime');

  // Empty state
  if (!hasTips) {
    return (
      <div className="min-h-screen p-6 pb-24">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center pt-4">
            <h1 className="text-4xl font-bold mb-3">Your Tips</h1>
            <p className="text-base text-muted">All your tips on Base Chain</p>
          </div>
          
          <div className="card text-center py-16">
            <Inbox className="mx-auto mb-4 text-muted" size={64} strokeWidth={1.5} />
            <h3 className="text-xl font-semibold mb-2">No tips yet</h3>
            <p className="text-muted mb-6">
              Your tip history will appear here once you start sending tips to streamers.
            </p>
            <button className="btn-primary mx-auto">
              Send Your First Tip
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center pt-4">
          <h1 className="text-4xl font-bold mb-3">Your Tips</h1>
          <p className="text-base text-muted">All your tips on Base Chain</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card text-center">
            <DollarSign className="mx-auto mb-2 text-primary" size={24} />
            <p className="text-2xl font-bold mb-1">$10.50</p>
            <p className="text-sm text-muted">Total Tipped</p>
          </div>
          
          <div className="card text-center">
            <TrendingUp className="mx-auto mb-2 text-primary" size={24} />
            <p className="text-2xl font-bold mb-1">{mockTips.length}</p>
            <p className="text-sm text-muted">Total Tips</p>
          </div>
        </div>

        {/* Top Supporter */}
        {mockTips.length > 0 && (
          <div className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-md">
                  <span className="text-xl font-bold">D</span>
                </div>
                <div>
                  <p className="text-sm text-muted">Top Supporter</p>
                  <p className="font-semibold">DoraKit Donater</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">$6.40</p>
              </div>
            </div>
          </div>
        )}

        {/* Real Time Section */}
        {realtimeTips.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Clock size={20} className="text-primary" />
                Recent Activity
              </h3>
            </div>
            <p className="text-sm text-muted mb-4">Your latest tips appear here</p>
            
            {realtimeTips.map(tip => (
              <div key={tip.id} className="card mb-3 flex items-center justify-between hover:border-primary hover:border-opacity-30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-md">
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
        )}

        {/* Recent Tips Section */}
        {recentTips.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Recent Tips</h3>
            
            {recentTips.map(tip => (
              <div key={tip.id} className="card mb-3 flex items-center justify-between hover:border-primary hover:border-opacity-30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center border border-primary shadow-sm">
                    <span className="text-sm font-bold">{tip.username.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{tip.username}</p>
                    <p className="text-sm text-muted">Base wallet</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">${tip.amount.toFixed(2)}</p>
                  <p className="text-xs text-muted">{tip.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

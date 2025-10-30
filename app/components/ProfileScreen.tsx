'use client';

import { Award, TrendingUp, Users, Zap } from 'lucide-react';

export default function ProfileScreen() {
  return (
    <div className="min-h-screen p-6 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center pt-4">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
            <Users size={48} />
          </div>
          <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
          <p className="text-base text-muted">@streamer</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card text-center">
            <Zap className="mx-auto mb-2 text-primary" size={24} />
            <p className="text-2xl font-bold">127</p>
            <p className="text-sm text-muted">Total Tips</p>
          </div>
          
          <div className="card text-center">
            <TrendingUp className="mx-auto mb-2 text-primary" size={24} />
            <p className="text-2xl font-bold">$1,234</p>
            <p className="text-sm text-muted">Total Earned</p>
          </div>
        </div>

        {/* Loyalty Badges */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Award className="text-primary" size={20} />
            Loyalty Badges
          </h3>
          
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((badge) => (
              <div key={badge} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Award size={32} />
                </div>
                <p className="text-xs text-muted">Tier {badge}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Settings</h3>
          
          <div className="space-y-3">
            <button 
              className="w-full text-left p-3 rounded-xl hover:bg-bg transition-colors duration-200"
              aria-label="Open tip jar settings"
            >
              <p className="font-semibold">Tip Jar Settings</p>
              <p className="text-sm text-muted">Configure your tip preferences</p>
            </button>
            
            <button 
              className="w-full text-left p-3 rounded-xl hover:bg-bg transition-colors duration-200"
              aria-label="Open loyalty program settings"
            >
              <p className="font-semibold">Loyalty Program</p>
              <p className="text-sm text-muted">Manage badges and tiers</p>
            </button>
            
            <button 
              className="w-full text-left p-3 rounded-xl hover:bg-bg transition-colors duration-200"
              aria-label="Open frame builder"
            >
              <p className="font-semibold">Frame Builder</p>
              <p className="text-sm text-muted">Create custom Farcaster frames</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

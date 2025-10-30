'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { Home, Search, Zap, User } from 'lucide-react';
import TipJarScreen from './components/TipJarScreen';
import TipsScreen from './components/TipsScreen';
import ProfileScreen from './components/ProfileScreen';

type Screen = 'home' | 'tips' | 'profile';

export default function Page() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // CRITICAL: Call sdk.actions.ready() to prevent infinite loading
    sdk.actions.ready();
    setIsReady(true);
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4"></div>
          <p className="text-muted">Loading StreamerTipKit...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pb-20">
      {currentScreen === 'home' && <TipJarScreen />}
      {currentScreen === 'tips' && <TipsScreen />}
      {currentScreen === 'profile' && <ProfileScreen />}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-opacity-10 border-fg">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex justify-around items-center">
            <button
              onClick={() => setCurrentScreen('home')}
              className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
                currentScreen === 'home' ? 'text-primary' : 'text-muted'
              }`}
              aria-label="Home"
            >
              <Home size={24} />
              <span className="text-xs">Home</span>
            </button>
            
            <button
              onClick={() => setCurrentScreen('tips')}
              className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
                currentScreen === 'tips' ? 'text-primary' : 'text-muted'
              }`}
              aria-label="Tips"
            >
              <Zap size={24} />
              <span className="text-xs">Tips</span>
            </button>
            
            <button
              onClick={() => setCurrentScreen('profile')}
              className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
                currentScreen === 'profile' ? 'text-primary' : 'text-muted'
              }`}
              aria-label="Profile"
            >
              <User size={24} />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </nav>
    </main>
  );
}

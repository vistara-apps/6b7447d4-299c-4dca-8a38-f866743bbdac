'use client';

import { Wallet } from 'lucide-react';

export default function WalletConnect() {
  const handleConnect = () => {
    // OnchainKit wallet connection will be implemented here
    console.log('Connecting wallet...');
  };

  return (
    <button
      onClick={handleConnect}
      className="btn-secondary w-full flex items-center justify-center gap-2"
    >
      <Wallet size={20} />
      Connect your BSC Wallet
    </button>
  );
}

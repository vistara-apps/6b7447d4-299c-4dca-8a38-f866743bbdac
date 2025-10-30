'use client';

import { Wallet, CheckCircle } from 'lucide-react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export default function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    const connector = connectors[0];
    if (connector) {
      connect({ connector });
    }
  };

  if (isConnected && address) {
    return (
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-500" size={20} />
            <div>
              <p className="text-sm text-muted">Connected</p>
              <p className="font-mono text-sm">
                {address.slice(0, 6)}...{address.slice(-4)}
              </p>
            </div>
          </div>
          <button
            onClick={() => disconnect()}
            className="text-sm text-muted hover:text-fg transition-colors"
          >
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="btn-secondary w-full flex items-center justify-center gap-2"
    >
      <Wallet size={20} />
      Connect Wallet on Base
    </button>
  );
}

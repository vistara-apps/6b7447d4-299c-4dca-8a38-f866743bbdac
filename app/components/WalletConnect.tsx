'use client';

import { Wallet, CheckCircle } from 'lucide-react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export default function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    if (isConnected) {
      disconnect();
    } else {
      const coinbaseConnector = connectors.find(
        (connector) => connector.id === 'coinbaseWalletSDK'
      );
      if (coinbaseConnector) {
        connect({ connector: coinbaseConnector });
      }
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <button
      onClick={handleConnect}
      className="btn-secondary w-full flex items-center justify-center gap-2"
    >
      {isConnected ? (
        <>
          <CheckCircle size={20} className="text-green-500" />
          <span>Connected: {address && formatAddress(address)}</span>
        </>
      ) : (
        <>
          <Wallet size={20} />
          <span>Connect your Wallet</span>
        </>
      )}
    </button>
  );
}

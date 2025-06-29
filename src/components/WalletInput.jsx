import React, { useState, useEffect } from 'react';
import { fetchMyBagsBalance } from '../services/solanaApi';

export default function WalletInput() {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem('walletAddress') || ''
  );
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (walletAddress) {
      setLoading(true);
      fetchMyBagsBalance(walletAddress)
        .then((amt) => {
          setBalance(amt);
          setError(null);
          localStorage.setItem('walletAddress', walletAddress);
        })
        .catch(() => {
          setError('Failed to fetch balance.');
          setBalance(null);
        })
        .finally(() => setLoading(false));
    }
  }, [walletAddress]);

  return (
    <div>
      <input
        type="text"
        className="wallet-input"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
        placeholder="Enter Solana Wallet Address"
      />
      {walletAddress && <div className="wallet-address">{walletAddress}</div>}
      {loading && <div className="loading">Loading balance...</div>}
      {error && <div className="error">{error}</div>}
      {balance !== null && (
        <div className="balance">
          Your $MYBAGS Balance: <strong>{balance.toLocaleString()}</strong>
        </div>
      )}
    </div>
  );
}

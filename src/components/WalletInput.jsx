import React, { useState, useEffect } from 'react';
import { fetchMyBagsBalance } from '../services/solanaApi';

export default function WalletInput() {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem('walletAddress') || ''
  );
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Basic Solana address validator
  const isValidWallet = (addr) => /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(addr.trim());

  // Fetch balance when wallet address changes
  useEffect(() => {
    const trimmedAddress = walletAddress.trim();
    if (!isValidWallet(trimmedAddress)) {
      setError(walletAddress ? '⚠️ Invalid Solana address format.' : null);
      setBalance(null);
      return;
    }

    setLoading(true);
    setError(null);

    fetchMyBagsBalance(trimmedAddress)
      .then((amt) => {
        setBalance(amt);
        setLastUpdated(new Date().toLocaleTimeString());
        localStorage.setItem('walletAddress', trimmedAddress);
      })
      .catch(() => {
        setError('❌ Failed to fetch balance. Please check the address.');
        setBalance(null);
      })
      .finally(() => setLoading(false));
  }, [walletAddress]);

  // Clipboard paste handler
  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setWalletAddress(text.trim());
    } catch (err) {
      setError('⚠️ Unable to read from clipboard.');
    }
  };

  return (
    <div className="wallet-section">
      <label htmlFor="walletInput" className="wallet-label">
        Enter Solana Wallet Address
      </label>

      <div className="wallet-input-row">
        <input
          id="walletInput"
          type="text"
          className="wallet-input"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="Eg: 3KyEX...34Wrp"
          spellCheck={false}
          autoComplete="off"
        />
        <button className="paste-button" onClick={handlePasteFromClipboard}>
          📋 Paste
        </button>
      </div>

      {walletAddress && (
        <div className="wallet-address">
          <strong>Wallet:</strong> {walletAddress}
        </div>
      )}

      {loading && <div className="loading">⏳ Checking balance...</div>}

      {error && <div className="error-message">{error}</div>}

      {!loading && balance !== null && !error && (
        <div className="balance">
          💰 <strong>{balance.toLocaleString()}</strong> $MYBAGS
          <div className="last-updated">
            ⏱️ Last updated: <em>{lastUpdated}</em>
          </div>
        </div>
      )}
    </div>
  );
}

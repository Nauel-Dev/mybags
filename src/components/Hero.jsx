import React, { useState, useEffect } from 'react';
import WalletInput from './WalletInput';
import MissionsDashboard from './MissionsDashboard';

export default function Hero() {
  const [rank, setRank] = useState('Bronze');
  const [workerName, setWorkerName] = useState(
    localStorage.getItem('workerName') || ''
  );
  const [showForm, setShowForm] = useState(!workerName);
  const [formValue, setFormValue] = useState('');
  const [animatingOut, setAnimatingOut] = useState(false);

  // determine rank based on credits
  useEffect(() => {
    const credits = parseInt(localStorage.getItem('credits') || '0', 10);
    if (credits >= 100) setRank('Diamond');
    else if (credits >= 50) setRank('Gold');
    else if (credits >= 20) setRank('Silver');
    else setRank('Bronze');
  }, []);

  // handle form submission
  const handleRegister = (e) => {
    e.preventDefault();
    if (!formValue.trim()) return;
    localStorage.setItem('workerName', formValue.trim());
    setAnimatingOut(true);
    setTimeout(() => {
      setWorkerName(formValue.trim());
      setShowForm(false);
      setAnimatingOut(false);
    }, 500); // match fade-out duration
  };

  const rankImageSrc = `/ranks/${rank.toLowerCase()}.png`;

  return (
    <section className="hero">
      <img
        src={rankImageSrc}
        alt={`${rank} Rank`}
        className="hero-image"
        onError={(e) => (e.target.style.display = 'none')}
      />

      {/* Registration Form */}
      {showForm && (
        <form
          onSubmit={handleRegister}
          className={`register-form ${animatingOut ? 'fade-out' : 'fade-in'}`}
        >
          <input
            type="text"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Enter Worker Name"
            className="register-input"
          />
          <button type="submit" className="btn btn-primary register-btn">
            Confirm
          </button>
        </form>
      )}

      {/* Display Worker Name and Wallet Address */}
      {!showForm && (
        <div className="worker-info">
          <h2 className="worker-name">{workerName}</h2>
          <div className="glass-card">
            <p className="wallet-display">{localStorage.getItem('walletAddress')}</p>
          </div>
        </div>
      )}

      <div className="rank-container">
        <p>Your Rank:</p>
        <div className="ranks">
          {['Bronze', 'Silver', 'Gold', 'Diamond'].map((r) => (
            <span
              key={r}
              className={`rank ${r.toLowerCase()} ${r === rank ? 'active' : ''}`}
            >
              {r}
            </span>
          ))}
        </div>
      </div>

      <div className="terminal">
      
        <MissionsDashboard />
      </div>
    </section>
  );
}

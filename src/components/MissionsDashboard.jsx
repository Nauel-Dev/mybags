// src/components/MissionsDashboard.jsx
import React, { useState, useEffect, useContext } from 'react';
import { tasks } from './missions';
import { LeaderboardContext } from './LeaderboardContext';
import '../index.css';
import WalletInput from './WalletInput';

export default function MissionsDashboard() {
  const [credits, setCredits] = useState(() => {
    const saved = localStorage.getItem('credits');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem('completedMissions');
    return saved ? JSON.parse(saved) : [];
  });
  const { leaderboard } = useContext(LeaderboardContext);

  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem('walletAddress') || ''
  );
  const [typedText, setTypedText] = useState('');
  const [phase, setPhase] = useState('typing');

  useEffect(() => {
    const handler = () => setWalletAddress(localStorage.getItem('walletAddress') || '');
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  useEffect(() => {
    let fullText;
    if (!walletAddress) {
      fullText = 'Enter your Solana wallet address to proceed...';
    } else {
      const isAllComplete = tasks.every(t => completed.includes(t.id));
      fullText = isAllComplete
        ? 'Missions Complete.'
        : 'Complete all quests to unlock your next rank...';
    }
    let idx = 0;
    setTypedText('');
    setPhase('typing');
    const interval = setInterval(() => {
      setTypedText(prev => prev + (fullText[idx] || ''));
      idx++;
      if (idx >= fullText.length) {
        clearInterval(interval);
        if (!walletAddress) setPhase('wait');
        else if (tasks.every(t => completed.includes(t.id))) setPhase('complete');
        else setPhase('list');
      }
    }, 75);
    return () => clearInterval(interval);
  }, [walletAddress, completed]);

  useEffect(() => {
    localStorage.setItem('credits', credits);
    localStorage.setItem('completedMissions', JSON.stringify(completed));
  }, [credits, completed]);

  const completeTask = (id, pts) => {
    if (!completed.includes(id)) {
      setCredits(credits + pts);
      setCompleted([...completed, id]);
    }
  };

  const getRank = () => {
    if (credits >= 100) return 'Diamond';
    if (credits >= 50) return 'Gold';
    if (credits >= 20) return 'Silver';
    return 'Bronze';
  };

  const refreshMissions = () => {
    // placeholder for fetching new missions
    window.location.reload();
  };

  return (
    <div className="missions-phone-container">
      <div className="missions-dashboard">
        <h3 style={{ textAlign: 'center', fontSize: '24px' }}>
          Missions ({getRank()})
        </h3>
        <p
          style={{ minHeight: '24px', fontFamily: 'monospace', textAlign: 'center' }}
        >
          {typedText}
        </p>

        {phase === 'list' && walletAddress && (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {tasks.map(task => (
              <li key={task.id} style={{ marginBottom: '10px' }}>
                {task.description} - {task.points} pts
                {completed.includes(task.id) ? (
                  <span style={{ marginLeft: '10px', color: 'lightgreen' }}>✓</span>
                ) : (
                  <button
                    onClick={() => completeTask(task.id, task.points)}
                    style={{ marginLeft: '10px', padding: '5px' }}
                  >
                    Complete
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        {phase === 'wait' && !walletAddress && (
          <div>
            <WalletInput />
          </div>
        )}

        {phase === 'complete' && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
              Missions Complete
            </p>
            <p className="blink" style={{ color: 'lightgreen', fontWeight: 'bold' }}>
              AWAIT NEW MISSIONS
            </p>
          </div>
        )}

        <h3 style={{ marginTop: '40px', textAlign: 'center' }}>
          Global Leaderboard
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, color: '#fff' }}>
          {leaderboard.map((user, index) => (
            <li key={index}>{user.name}: {user.points}</li>
          ))}
        </ul>

        {/* Strategic Buttons */}
        <div className="missions-actions">
          <button onClick={() => window.location.href = '/'} className="btn btn-primary">
            Home
          </button>
          <button onClick={() => window.open('https://x.com/i/communities/1933583099096625391', '_blank')} className="btn btn-secondary">
            Community
          </button>
          <button onClick={refreshMissions} className="btn btn-accent">
            Refresh Missions
          </button>
        </div>
      </div>
    </div>
  );
}

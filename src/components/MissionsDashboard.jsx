import React, { useState, useEffect, useContext, useRef } from 'react';
import gsap from 'gsap';
import { tasks } from './missions';
import { LeaderboardContext } from './LeaderboardContext';
import '../index.css';
import WalletInput from './WalletInput';

export default function MissionsDashboard() {
  const [credits, setCredits] = useState(() => parseInt(localStorage.getItem('credits') || '0', 10));
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem('completedMissions');
    return saved ? JSON.parse(saved) : [];
  });
  const { leaderboard } = useContext(LeaderboardContext);

  const [walletAddress, setWalletAddress] = useState(localStorage.getItem('walletAddress') || '');
  const [phase, setPhase] = useState('typing');

  const textRef = useRef(null);

  useEffect(() => {
    const handler = () => setWalletAddress(localStorage.getItem('walletAddress') || '');
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  useEffect(() => {
    if (!walletAddress) {
      setPhase('wait');
      return;
    }

    const allDone = tasks.every(t => completed.includes(t.id));
    const newText = allDone
      ? 'Missions Complete.'
      : 'Complete all quests to unlock your next rank...';

    if (textRef.current) {
      gsap.to(textRef.current, {
        duration: 0.3,
        opacity: 0,
        onComplete: () => {
          textRef.current.textContent = newText;
          gsap.to(textRef.current, { duration: 0.5, opacity: 1 });
        }
      });
    }

    setPhase(allDone ? 'complete' : 'list');
  }, [walletAddress, completed]);

  useEffect(() => {
    localStorage.setItem('credits', credits);
    localStorage.setItem('completedMissions', JSON.stringify(completed));
  }, [credits, completed]);

  const completeTask = (id, pts) => {
    if (!completed.includes(id)) {
      setCredits(prev => prev + pts);
      setCompleted(prev => [...prev, id]);
    }
  };

  const getRank = () => {
    if (credits >= 100) return 'Diamond';
    if (credits >= 50) return 'Gold';
    if (credits >= 20) return 'Silver';
    return 'Bronze';
  };

  const refreshMissions = () => window.location.reload();

  return (
    <div className="missions-phone-container">
      <div className="missions-dashboard">
        <h3 style={{ textAlign: 'center', fontSize: '24px' }}>
          Missions ({getRank()})
        </h3>

        {walletAddress && (
          <p
            ref={textRef}
            style={{
              minHeight: '24px',
              fontFamily: 'monospace',
              textAlign: 'center',
              opacity: 1,
              transition: 'opacity 0.5s ease'
            }}
          >
            {/* Initial text will be replaced by GSAP */}
            Complete all quests to unlock your next rank...
          </p>
        )}

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

        {phase === 'wait' && <WalletInput />}

        {phase === 'complete' && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Missions Complete</p>
            <p className="blink" style={{ color: 'lightgreen', fontWeight: 'bold' }}>
              AWAIT NEW MISSIONS
            </p>
          </div>
        )}

        <h3 style={{ marginTop: '40px', textAlign: 'center' }}></h3>
        <ul style={{ listStyle: 'none', padding: 0, color: '#fff' }}>
          {leaderboard.map((user, index) => (
            <li key={index}>{user.name}: {user.points}</li>
          ))}
        </ul>

        <div className="missions-actions">
          <button onClick={() => window.location.href = '/'} className="btn btn-primary">
            Home
          </button>
          <button
            onClick={() => window.open('https://x.com/i/communities/1933583099096625391', '_blank')}
            className="btn btn-secondary"
          >
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

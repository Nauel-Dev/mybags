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
  const [mybagsHeld, setMybagsHeld] = useState(() => parseInt(localStorage.getItem('mybags') || '0', 10));
  const { leaderboard } = useContext(LeaderboardContext);

  const [walletAddress, setWalletAddress] = useState(localStorage.getItem('walletAddress') || '');
  const [inputWallet, setInputWallet] = useState(walletAddress);
  const [phase, setPhase] = useState('typing');
  const [popupImage, setPopupImage] = useState(null);
  const textRef = useRef(null);

  useEffect(() => {
    const handler = () => {
      setWalletAddress(localStorage.getItem('walletAddress') || '');
      setMybagsHeld(parseInt(localStorage.getItem('mybags') || '0', 10));
    };
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

  const completeTask = (id, basePts) => {
    if (!completed.includes(id)) {
      const bonus = Math.floor(basePts * (mybagsHeld * 0.02));
      const total = basePts + bonus;
      setCredits(prev => prev + total);
      setCompleted(prev => [...prev, id]);
    }
  };

  const getRank = () => {
    if (credits >= 250) return 'Diamond';
    if (credits >= 150) return 'Gold';
    if (credits >= 60) return 'Silver';
    return 'Bronze';
  };

  const handleWalletSearch = () => {
    localStorage.setItem('walletAddress', inputWallet);
    setWalletAddress(inputWallet);
  };

  const refreshMissions = () => window.location.reload();

  return (
    <div className="missions-phone-container">
      <div className="missions-dashboard">
        <h3 style={{ textAlign: 'center', fontSize: '24px' }}>
          Missions ({getRank()})
        </h3>

        {!walletAddress && (
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <input
              type="text"
              value={inputWallet}
              onChange={(e) => setInputWallet(e.target.value)}
              placeholder="Enter Wallet Address"
              style={{
                padding: '8px',
                borderRadius: '10px',
                width: '80%',
                maxWidth: '300px',
                marginBottom: '10px'
              }}
            />
            <br />
            <button
              onClick={handleWalletSearch}
              style={{
                backgroundColor: '#16a085',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Search Wallet
            </button>
          </div>
        )}

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
            Complete all quests to unlock your next rank...
          </p>
        )}

        {phase === 'list' && walletAddress && (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {tasks.map(task => (
              <li key={task.id} style={{ marginBottom: '32px' }}>
                <div style={{ fontWeight: 'bold' }}>{task.description} - {task.points} pts</div>

                <a
                  href={task.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    color: '#00acee',
                    marginTop: '4px',
                    wordBreak: 'break-word'
                  }}
                >
                  {task.linkText}
                </a>

                {task.image && (
                  <img
                    src={task.image}
                    alt="Task Visual"
                    onClick={() => setPopupImage(task.image)}
                    style={{
                      marginTop: '10px',
                      borderRadius: '10px',
                      width: '100%',
                      maxWidth: '300px',
                      height: 'auto',
                      aspectRatio: '3 / 2',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease'
                    }}
                  />
                )}

                {completed.includes(task.id) ? (
                  <span style={{ marginLeft: '10px', color: 'lightgreen' }}>✓</span>
                ) : (
                  <button
                    onClick={() => completeTask(task.id, task.points)}
                    style={{
                      marginTop: '8px',
                      padding: '6px 14px',
                      borderRadius: '12px',
                      backgroundColor: '#d35400',
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Complete
                  </button>
                )}

                {/* Divider */}
                <hr style={{ marginTop: '16px', borderColor: '#ccc' }} />
              </li>
            ))}
          </ul>
        )}

        {phase === 'complete' && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Missions Complete</p>
            <p className="blink" style={{ color: 'lightgreen', fontWeight: 'bold' }}>
              AWAIT NEW MISSIONS
            </p>
          </div>
        )}

        <ul style={{ listStyle: 'none', padding: 0, color: '#fff', marginTop: '30px' }}>
          {leaderboard.map((user, index) => (
            <li key={index}>{user.name}: {user.points}</li>
          ))}
        </ul>

        <div className="missions-actions" style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              borderRadius: '12px',
              margin: '5px',
              padding: '8px 16px',
              backgroundColor: '#2980b9',
              color: '#fff',
              border: 'none'
            }}
          >
            Home
          </button>
          <button
            onClick={() => window.open('https://x.com/i/communities/1933583099096625391', '_blank')}
            style={{
              borderRadius: '12px',
              margin: '5px',
              padding: '8px 16px',
              backgroundColor: '#8e44ad',
              color: '#fff',
              border: 'none'
            }}
          >
            Community
          </button>
          <button
            onClick={refreshMissions}
            style={{
              borderRadius: '12px',
              margin: '5px',
              padding: '8px 16px',
              backgroundColor: '#27ae60',
              color: '#fff',
              border: 'none'
            }}
          >
            Refresh Missions
          </button>
        </div>
      </div>

      {/* Image Popup Modal */}
      {popupImage && (
        <div
          onClick={() => setPopupImage(null)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'zoom-out'
          }}
        >
          <img
            src={popupImage}
            alt="Zoomed Task"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              borderRadius: '10px',
              boxShadow: '0 0 20px rgba(255,255,255,0.2)'
            }}
          />
        </div>
      )}
    </div>
  );
}

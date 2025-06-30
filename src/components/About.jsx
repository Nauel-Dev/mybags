import React from 'react';


export default function About() {
  return (
    <section id="about" className="section about text-center">
      <div className="container">
        <h2 className="about-title">How To Work For $MYBAGS</h2>
        <p className="about-subtitle">Earn credits, climb ranks, rule the board.</p>

        <div className="about-steps">
          <div className="step colored-accent">
            <h3>1. Paste Your Wallet Address</h3>
            <p>Paste your Solana address to start tracking your progress.</p>
          </div>
          <div className="step colored-primary">
            <h3>2. Complete Missions</h3>
            <p>Simple tasks. Instant credits. Zero fluff.</p>
          </div>
          <div className="step colored-secondary">
            <h3>3. Climb the Leaderboard</h3>
            <p>Rank up from Bronze to Diamond. Prove you bag best.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

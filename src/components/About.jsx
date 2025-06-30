import React from 'react';
import './About.css'; // 👈 make sure this exists or put the CSS inline

export default function About() {
  return (
    <section id="about" className="section about text-center">
      <div className="container">
        <h2 className="about-title">How To Work For $MYBAGS</h2>
        <p className="about-subtitle">It’s simple: complete quests, rise through the ranks.</p>

        <div className="about-steps">
          <div className="step glow">
            <h3>1. Connect Your Wallet</h3>
            <p>Paste your Solana wallet to get started — we’ll save your progress.</p>
          </div>
          <div className="step glow">
            <h3>2. Complete Missions</h3>
            <p>Knock out simple quests. Each one earns you Bags Credits.</p>
          </div>
          <div className="step glow">
            <h3>3. Climb Ranks & Compete</h3>
            <p>Level up from Bronze to Diamond and see your name on the leaderboard.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

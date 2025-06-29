import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { LeaderboardProvider } from './components/LeaderboardContext';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <LeaderboardProvider>
    <App />
  </LeaderboardProvider>
);

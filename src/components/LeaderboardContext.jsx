import { createContext, useState } from 'react';
export const LeaderboardContext = createContext();
export const LeaderboardProvider = ({ children }) => {
  const [leaderboard] = useState([
  
  ]);
  return (
    <LeaderboardContext.Provider value={{ leaderboard }}>
      {children}
    </LeaderboardContext.Provider>
  );
};

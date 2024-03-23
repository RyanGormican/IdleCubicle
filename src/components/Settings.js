import React from 'react';
import { upgrades } from './Upgrades'; 
const Settings = ({ stats, setStats }) => {
  const handleResetStats = () => {
    const resetStats = Object.keys(stats).reduce((acc, key) => {
      acc[key] = key === 'achievementMultiplier' ? 1 : 0;
      return acc;
    }, {});

    resetStats.upgrades = upgrades.map(upgrade => ({
      ...upgrade,
      purchased: false 
    }));

    setStats(resetStats);
  };

  return (
    <div className="resources">
      <button onClick={handleResetStats}>Reset Stats</button>
    </div>
  );
};

export default Settings;

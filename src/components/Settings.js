import React from 'react';
import { upgrades } from './Upgrades';  
const Settings = ({ stats, setStats }) => {
  const handleResetStats = () => {
    const resetStats = Object.keys(stats).reduce((acc, key) => {
      acc[key] = key === 'achievementMultiplier' ? 1 : 0;
      return acc;
    }, {});
     resetStats.settings = settings.map(setting => ({
      ...setting,
      status: false 
    }));
    resetStats.upgrades = upgrades.map(upgrade => ({
      ...upgrade,
      purchased: false 
    }));

    setStats(resetStats);
  };
  const toggleSetting = (settingName) => {
    setStats(prevStats => ({
      ...prevStats,
      settings: prevStats.settings.map(setting => {
        if (setting.name === settingName) {
          return { ...setting, status: !setting.status };
        }
        return setting;
      })
    }));
  };
 const handleResetResources = () => {
    setStats(prevStats => ({
      ...prevStats,
      inspiration: 0,
      creative: 0,
      motivation: 0,
      knowledge: 0,
      money: 0,
      social: 0,
    }));
  };
return (
    <div className="resources">
     <button onClick={handleResetResources}>Reset Resources</button>
      <button onClick={handleResetStats}>Reset All</button>
      <div>
        {stats &&
          settings.map((setting, index) => (
            <div key={index}>
              <span>{setting.name}</span>
              <button onClick={() => toggleSetting(setting.name)}>
            {stats.settings[0].status ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Settings;
export const settings = [
  { name: "Hide Purchased Upgrades",  status: false},
];

import React from 'react';
import { MotivationPerSecond, InspirationPerSecond, CreativityPerSecond, KnowledgePerSecond, SocialPerSecond, WritingPerSecond, MoneyPerSecond } from './Calculations';

const Resources = ({ stats, setStats }) => {
  const statsToRender = ['motivation', 'inspiration', 'creativity', 'knowledge', 'social', 'writing', 'money'];

  return (
    <div className="resources">
      <div>
        {statsToRender.map(statName => (
          <p key={statName}>
            {statName.charAt(0).toUpperCase() + statName.slice(1)}: {typeof stats[statName] === 'number' ? stats[statName].toFixed(2) : stats[statName]} 
            {statName === 'motivation' && ` (${MotivationPerSecond(stats)} /sec)`}
            {statName === 'inspiration' && ` (${InspirationPerSecond(stats)} /sec)`}
            {statName === 'creativity' && ` (${CreativityPerSecond(stats)} /sec)`}
            {statName === 'knowledge' && ` (${KnowledgePerSecond(stats)} /sec)`}
            {statName === 'social' && ` (${SocialPerSecond(stats)} /sec)`}
            {statName === 'writing' && ` (${WritingPerSecond(stats)} /sec)`}
            {statName === 'money' && ` (${MoneyPerSecond(stats)} /sec)`}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Resources;

import React, { useState, useEffect} from 'react';
import { MotivationPerSecond, InspirationPerSecond, CreativityPerSecond, KnowledgePerSecond, SocialPerSecond, WritingPerSecond,MoneyPerSecond } from './Calculations';

const Resources = ({ stats, setStats }) => {
  return (
    <div className="resources">
      <div>
        {Object.entries(stats).map(([statName, statValue]) => (
          <p key={statName}>
            {statName.charAt(0).toUpperCase() + statName.slice(1)}: {typeof statValue === 'number' ? statValue.toFixed(2) : statValue} 
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

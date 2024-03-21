import React from 'react';
import { MotivationPerSecond, InspirationPerSecond, CreativityPerSecond, KnowledgePerSecond, SocialPerSecond,WritingPerSecond } from './Calculations';

const Skills = ({ stats, setStats }) => {
  const increaseQuantity = (item) => {
    setStats(prevStats => ({
      ...prevStats,
      [item]: prevStats[item] + 1
    }));
  };

  const decreaseQuantity = (item) => {
    if (stats[item] > 0) {
      setStats(prevStats => ({
        ...prevStats,
        [item]: prevStats[item] - 1
      }));
    }
  };

  return (
    <div className="resources">
      <div> Motivation - {stats.motivation.toFixed(2)} ( {MotivationPerSecond(stats)} /sec ) </div>
      <div>Inspiration - {(stats.inspiration).toFixed(2)} ( {InspirationPerSecond(stats)} /sec )</div>
      <div>Creativity - {stats.creativity.toFixed(2)}  ( {CreativityPerSecond(stats)} /sec )</div>   
      <div>Knowledge - {stats.knowledge.toFixed(2)}  ( {KnowledgePerSecond(stats)} /sec )</div>

      <div> Writing - {stats.writing.toFixed(2)}  ( {WritingPerSecond(stats)} /sec )</div>
      <div>Pencil - {stats.pencil}</div>
      <button onClick={() => increaseQuantity('pencil')}>Increase Pencil</button>
      <button onClick={() => decreaseQuantity('pencil')}>Decrease Pencil</button>
    </div>
  );
};

export default Skills;

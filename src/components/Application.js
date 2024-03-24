import React from 'react';
import { MotivationPerSecond, InspirationPerSecond, CreativityPerSecond, KnowledgePerSecond, SocialPerSecond,WritingPerSecond } from './Calculations';

const Application = ({ stats, setStats, purchaseQuantity }) => {
  const increaseQuantity = (item) => {
    setStats(prevStats => ({
      ...prevStats,
      [item]:  prevStats[item] + purchaseQuantity
    }));
  };

    const decreaseQuantity = (item) => {
    if (stats[item] > 0 && stats[item] - purchaseQuantity >= 0 && purchaseQuantity!== 'MAX') {
      setStats(prevStats => ({
        ...prevStats,
        [item]: prevStats[item] - purchaseQuantity
      }));
    }else {
     setStats(prevStats => ({
        ...prevStats,
        [item]: 0
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
      <div>
      Motivation Points - {stats.motivationPoints}
      <button onClick={() => increaseQuantity('motivationPoints')}>Increase Motivation Points</button>
      <button onClick={() => decreaseQuantity('motivationPoints')}>Decrease Motivation Points</button>
      </div>
        <div>
      Social Points - {stats.socialPoints}
      <button onClick={() => increaseQuantity('socialPoints')}>Increase Social Points</button>
      <button onClick={() => decreaseQuantity('socialPoints')}>Decrease Social Points</button>
      </div>
      <div>
      Writing Points - {stats.writingPoints}
      <button onClick={() => increaseQuantity('writingPoints')}>Increase Writing Points</button>
      <button onClick={() => decreaseQuantity('writingPoints')}>Decrease Writing Points</button>
      </div>
      Application Quality -{((stats.motivationPoints * 0.01 + stats.writingPoints * 0.05) * 100.0)}
    </div>
  );
};

export default Application;

import React from 'react';
import { MotivationPerSecond, InspirationPerSecond, CreativityPerSecond, KnowledgePerSecond, SocialPerSecond } from './Calculations';

const Educate = ({ stats, setStats , purchaseQuantity}) => {
  const increaseQuantity = (item) => {
    setStats(prevStats => ({
      ...prevStats,
      [item]: prevStats[item] + purchaseQuantity
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
      <div>Inspiration - {stats.inspiration.toFixed(2)} ( {InspirationPerSecond(stats)} /sec )</div>
      <div>Explore - {stats.explore}</div>
      <button onClick={() => increaseQuantity('explore')}>Increase Explore</button>
      <button onClick={() => decreaseQuantity('explore')}>Decrease Explore</button>
      
      <div>Creativity - {stats.creativity.toFixed(2)}  ( {CreativityPerSecond(stats)} /sec )</div>
      <div>Draw - {stats.draw}</div>
      <button onClick={() => increaseQuantity('draw')}>Increase Draw</button>
      <button onClick={() => decreaseQuantity('draw')}>Decrease Draw</button>
      
      <div>Knowledge - {stats.knowledge.toFixed(2)}  ( {KnowledgePerSecond(stats)} /sec )</div>
      <div>Books - {stats.books}</div>
      <button onClick={() => increaseQuantity('books')}>Increase Books</button>
      <button onClick={() => decreaseQuantity('books')}>Decrease Books</button>
      
      <div>Social - {stats.social.toFixed(2)} ( {SocialPerSecond(stats)} /sec )</div>
      <div>Talking - {stats.talking}</div>
      <button onClick={() => increaseQuantity('talking')}>Increase Talking</button>
      <button onClick={() => decreaseQuantity('talking')}>Decrease Talking</button>
    </div>
  );
};

export default Educate;

import React from 'react';

const Energize = ({ stats, setStats }) => {
  const buyItem = (itemType) => {
    const currentPrice = calculatePrice(itemType);
    if (stats.motivation >= currentPrice) {
      setStats(prevStats => ({
        ...prevStats,
        motivation: prevStats.motivation - currentPrice,
        [itemType]: prevStats[itemType] + 1,
      }));
    } else {
      alert("Not enough motivation to buy!");
    }
  };

  const hypeUp = () => {
    setStats(prevStats => ({
      ...prevStats,
      motivation: prevStats.motivation + 1,
    }));
  };

  const calculatePrice = (itemType) => {
    const basePrice = itemType === 'motivationPoster' ? 30 : 500;
    const increaseRate = itemType === 'motivationPoster' ? 1.07 : 1.06;
    const itemQuantity = stats[itemType];
    if (itemQuantity > 0) {
      const price = basePrice * Math.pow(increaseRate, itemQuantity);
      return Math.round(price);
    } else {
      return basePrice;
    }
  };

  return (
    <div className="resources">
      <p>Motivation: {stats.motivation.toFixed(2)} <button onClick={hypeUp}>Hype up</button></p>
      <div>
        <p>
          Motivation Poster(+{(stats.motivationPoster * 1 * stats.achievementMultiplier).toFixed(2)}/sec):
          {stats.motivationPoster} --- {calculatePrice('motivationPoster')}
          <button onClick={() => buyItem('motivationPoster')}>Buy Motivation Poster</button>
        </p>
      </div>
      <div>
        <p>
          Self Help Book(+{(stats.selfHelpBook * 10 * stats.achievementMultiplier).toFixed(2)}/sec):
          {stats.selfHelpBook} --- {calculatePrice('selfHelpBook')}
          <button onClick={() => buyItem('selfHelpBook')}>Buy Self Help Book</button>
        </p>
      </div>
    </div>
  );
};

export default Energize;
